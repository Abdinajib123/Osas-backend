import express from "express";
import dotenv from "dotenv";
import allRoutes from "./src/routes/allRoutes.js";
import connectDB from "./dbconfig/dbconfig.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

/* ---- Body parsers (must be BEFORE routes) ---- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---- Optional: simple logger helps a ton ---- */
app.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

/* ---- Mount your API ---- */
app.use("/api", allRoutes);

/* ---- Static serving for uploaded files ---- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// /* ---- Health check & JSON 404 ---- */
// app.get("/health", (_req, res) => res.json({ ok: true }));
// app.use((req, res) => res.status(404).json({ error: "Not Found", path: req.originalUrl }));

/* ---- Start after DB connects ---- */
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error("DB connection failed:", err);
  process.exit(1);
});
