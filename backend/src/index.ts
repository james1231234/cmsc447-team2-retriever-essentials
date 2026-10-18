import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
