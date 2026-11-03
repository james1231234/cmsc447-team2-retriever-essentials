import express from "express";
import { randomUUID } from "node:crypto";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { parse } from "csv-parse/sync";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.get("/", (req, res) => {
  res.send("Impact Dashboard Backend is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Impact Dashboard API is running",
  });
});

// Synthetic demo values for the initial dashboard; not real student records.
app.get("/api/overview", (_req, res) => {
  res.json({
    academicYear: "2024–25",
    semesterLabel: "This semester",
    totalStudents: 13991,
    undergraduate: 10490,
    graduate: 3501,
    eventsThisWeek: 48,
    topEvents: [
      { id: 1, name: "Welcome Week Social", department: "Campus Life", date: "Sep 12", attendance: 245, percentage: 92 },
      { id: 2, name: "Career Connections", department: "Career Center", date: "Sep 11", attendance: 213, percentage: 90 },
      { id: 3, name: "Retriever Pantry Pop-up", department: "Retriever Essentials", date: "Sep 10", attendance: 186, percentage: 88 },
      { id: 4, name: "Graduate Coffee Hour", department: "Graduate Student Life", date: "Sep 09", attendance: 127, percentage: 76 },
    ],
    source: "demo",
  });
});

app.get("/api/db-health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      status: "ok",
      message: "MySQL database connected successfully",
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

app.get("/api/requests/count", async (_req, res) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(      "SELECT COUNT(*) AS total_requests FROM service_requests"
    );

    res.json(rows);
  } catch (error) {
    console.error("Error reading requests:", error);

    res.status(500).json({
      message: "Unable to read service requests",
    });
  }
});


app.post("/api/requests", async (req, res) => {
  try {
    const {
      synthetic_student_id,
      service_date,
      service_category,
      service_type,
      urgency,
      status,
    } = req.body ?? {};

    const requiredFields = [
      synthetic_student_id,
      service_date,
      service_category,
      service_type,
      urgency,
      status,
    ];

    if (
      requiredFields.some(
        (value) => typeof value !== "string" || !value.trim()
      )
    ) {
      return res.status(400).json({
        message: "Please provide all required fields.",
      });
    }

    if (
      synthetic_student_id.length > 40 ||
      service_category.length > 100 ||
      service_type.length > 100 ||
      urgency.length > 30 ||
      status.length > 30 ||
      !/^\d{4}-\d{2}-\d{2}$/.test(service_date) ||
      !Number.isFinite(Date.parse(service_date)) ||
      new Date(service_date).toISOString().slice(0, 10) !== service_date
    ) {
      return res.status(400).json({
        message: "Invalid field length or service date.",
      });
    }

    const request_id = `REQ-${randomUUID()}`;

    await pool.execute(
      `INSERT INTO service_requests
       (request_id, synthetic_student_id, service_date,
        service_category, service_type, urgency, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        request_id,
        synthetic_student_id,
        service_date,
        service_category,
        service_type,
        urgency,
        status,
      ]
    );

    res.status(201).json({
      message: "Service request created successfully",
      request_id,
    });

  } catch (error) {
    console.error("Error creating service request:", error);

    res.status(500).json({
      message: "Unable to create service request",
    });
  }
});

app.get("/api/requests", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM service_requests ORDER BY service_date DESC"
    );

    res.json(rows);
  } catch (error) {
    console.error("Error retrieving service requests:", error);

    res.status(500).json({
      message: "Unable to retrieve service requests",
    });
  }
});


app.get("/api/requests/export", async (_req, res) => {
  try {
const [rows] = await pool.query<RowDataPacket[]>(      `SELECT
        request_id,
        synthetic_student_id,
        DATE_FORMAT(service_date, '%Y-%m-%d') AS service_date,
        service_category,
        service_type,
        request_channel,
        referral_source,
        urgency,
        status,
        outcome,
        repeat_user,
        days_to_resolution,
        follow_up_required
       FROM service_requests
       ORDER BY service_date DESC`
    );

    if (!Array.isArray(rows)) {
      throw new Error("Unexpected database response");
    }

    const columns = [
      "request_id",
      "synthetic_student_id",
      "service_date",
      "service_category",
      "service_type",
      "request_channel",
      "referral_source",
      "urgency",
      "status",
      "outcome",
      "repeat_user",
      "days_to_resolution",
      "follow_up_required",
    ];

    function escapeCsv(value: unknown): string {
      let text = value == null ? "" : String(value);

      // Prevent spreadsheet formulas from running.
      if (/^\s*[=+\-@\t\r]/.test(text)) {
        text = "'" + text;
      }

      return '"' + text.replaceAll('"', '""') + '"';
    }

    const csvRows = rows.map((row) =>
      columns.map((column) => escapeCsv(row[column])).join(",")
    );

    const csv = [
      columns.join(","),
      ...csvRows,
    ].join("\r\n");

    res.attachment("service_requests.csv");
    res.type("text/csv");
    res.send("\uFEFF" + csv);

  } catch (error) {
    console.error("CSV export error:", error);

    res.status(500).json({
      message: "Unable to export service requests",
    });
  }
});


app.post("/api/requests/import", async (req, res) => {
  const csv = req.body?.csv;

  if (typeof csv !== "string" || !csv.trim()) {
    return res.status(400).json({
      message: "Please provide CSV data."
    });
  }

  const columns = [
    "request_id",
    "synthetic_student_id",
    "service_date",
    "service_category",
    "service_type",
    "request_channel",
    "referral_source",
    "urgency",
    "status",
    "outcome",
    "repeat_user",
    "days_to_resolution",
    "follow_up_required"
  ];

  let records: Record<string, string>[];

  try {
    records = parse(csv, {
      columns: (headers: string[]) => {
        const normalized = headers.map(header =>
          header.trim().toLowerCase()
        );

        if (new Set(normalized).size !== normalized.length) {
          throw new Error("Duplicate CSV column names.");
        }

        return normalized;
      },
      skip_empty_lines: true,
      bom: true,
      trim: true
    }) as Record<string, string>[];
  } catch {
    return res.status(400).json({
      message: "Invalid CSV format."
    });
  }

  if (records.length === 0 || records.length > 500) {
    return res.status(400).json({
      message: "CSV must contain between 1 and 500 records."
    });
  }

  const required = [
    "request_id",
    "synthetic_student_id",
    "service_date",
    "service_category",
    "service_type",
    "urgency",
    "status"
  ];

  const maxLengths: Record<string, number> = {
    request_id: 40,
    synthetic_student_id: 40,
    service_category: 100,
    service_type: 100,
    request_channel: 50,
    referral_source: 100,
    urgency: 30,
    status: 30,
    outcome: 100
  };

  for (const record of records) {
    if (
      columns.some(column => !(column in record)) ||
      required.some(column => !record[column]?.trim())
    ) {
      return res.status(400).json({
        message: "Missing required CSV fields."
      });
    }

    for (const [column, maxLength] of Object.entries(maxLengths)) {
      if ((record[column] ?? "").length > maxLength) {
        return res.status(400).json({
          message: `Invalid length for ${column}.`
        });
      }
    }

    const date = record.service_date;

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(Date.parse(date)) ||
      new Date(date).toISOString().slice(0, 10) !== date
    ) {
      return res.status(400).json({
        message: "Invalid service date."
      });
    }

    for (const field of ["repeat_user", "follow_up_required"]) {
      if (!["", "0", "1"].includes(record[field] ?? "")) {
        return res.status(400).json({
          message: `${field} must be 0 or 1.`
        });
      }
    }

    const days = record.days_to_resolution ?? "";

    if (
      days !== "" &&
      (!/^\d+$/.test(days) || Number(days) > 2147483647)
    ) {
      return res.status(400).json({
        message: "Invalid days_to_resolution."
      });
    }
  }

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    let added = 0;
    let skipped = 0;

    for (const record of records) {
      const [existing] = await connection.execute<RowDataPacket[]>(
        "SELECT request_id FROM service_requests WHERE request_id = ?",
        [record.request_id]
      );

      if (existing.length > 0) {
        skipped++;
        continue;
      }

      const values = columns.map(column =>
        record[column] === "" ? null : record[column]
      );

      await connection.execute<ResultSetHeader>(
        `INSERT INTO service_requests
         (${columns.join(", ")})
         VALUES (${columns.map(() => "?").join(", ")})`,
        values
      );

      added++;
    }

    await connection.commit();

    res.json({
      message: "CSV import completed",
      added,
      skipped
    });

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("CSV import error:", error);

    res.status(500).json({
      message: "Unable to import CSV records."
    });

  } finally {
    connection?.release();
  }
});



app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
