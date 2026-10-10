const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");

const favoriteRoutes = require("./routes/favorites");
require("dotenv").config();
const templateRoutes = require("./routes/templates");
const authRoutes = require("./routes/auth");
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());
app.use("/api/favorites", favoriteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Mini SaaS backend is running",
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
