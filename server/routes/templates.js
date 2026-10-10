
const express = require("express");
const Template = require("../models/Template");

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const templates = await Template.find().sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: templates.length,
      templates,
    });
  } catch (error) {
    console.error("Failed to fetch templates:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch templates",
    });
  }
});

module.exports = router;
