
const express = require("express");
const mongoose = require("mongoose");
const Favorite = require("../models/Favorite");
const Template = require("../models/Template");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All favorite routes require login.
router.use(authMiddleware);

// GET /api/favorites
// Get the logged-in user's favorites.
router.get("/", async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.user.id,
    })
      .populate("template")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      favorites: favorites
        .filter((favorite) => favorite.template)
        .map((favorite) => ({
          id: favorite._id,
          template: favorite.template,
          createdAt: favorite.createdAt,
        })),
    });
  } catch (error) {
    console.error("Fetch favorites error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch favorites.",
    });
  }
});

// POST /api/favorites/:templateId
// Add a template to favorites.
router.post("/:templateId", async (req, res) => {
  try {
    const { templateId } = req.params;

    if (!mongoose.isValidObjectId(templateId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid template ID.",
      });
    }

    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found.",
      });
    }

    const favorite = await Favorite.findOneAndUpdate(
      {
        user: req.user.id,
        template: templateId,
      },
      {
        $setOnInsert: {
          user: req.user.id,
          template: templateId,
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Template added to favorites.",
      favorite,
    });
  } catch (error) {
    console.error("Add favorite error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to add favorite.",
    });
  }
});

// DELETE /api/favorites/:templateId
// Remove a template from the logged-in user's favorites.
router.delete("/:templateId", async (req, res) => {
  try {
    const { templateId } = req.params;

    if (!mongoose.isValidObjectId(templateId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid template ID.",
      });
    }

    const favorite = await Favorite.findOneAndDelete({
      user: req.user.id,
      template: templateId,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found.",
      });
    }

    return res.json({
      success: true,
      message: "Template removed from favorites.",
    });
  } catch (error) {
    console.error("Remove favorite error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to remove favorite.",
    });
  }
});

module.exports = router;
