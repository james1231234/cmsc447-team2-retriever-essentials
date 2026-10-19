import dotenv from "dotenv";
import mysql from "mysql2/promise";

// Resolve the backend configuration from both src/ and compiled dist/.
dotenv.config({ path: new URL("../.env", import.meta.url), quiet: true });

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "impact_dashboard",
  waitForConnections: true,
  connectionLimit: 10,
});
