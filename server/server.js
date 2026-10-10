require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const favoriteRoutes = require("./routes/favorites");
const templateRoutes = require("./routes/templates");
const authRoutes = require("./routes/auth");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://fullstack-intern-task-gamma.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());

// Ensure the database is connected before any API route runs.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

app.use("/api/favorites", favoriteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Mini SaaS backend is running",
  });
});

module.exports = app;