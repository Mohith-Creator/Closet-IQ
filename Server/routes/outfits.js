import express from "express";
import {
  createOutfit,
  getOutfits,
  updateOutfit,
  deleteOutfit,
  getOutfitDeleteInfo,
  wearOutfit,
  toggleFavoriteOutfit,
  duplicateOutfit,
} from "../controllers/outfitController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create outfit
router.post("/", authMiddleware, createOutfit);

// Get all outfits
router.get("/", authMiddleware, getOutfits);

// Update outfit by Id
router.put("/:id", authMiddleware, updateOutfit);

// Delete outfit by Id
router.delete("/:id", authMiddleware, deleteOutfit);

// Duplicate outfit
router.post("/:id/duplicate", authMiddleware, duplicateOutfit);

// Get delete outfit info for outfit planner
router.get("/:id/delete-info", authMiddleware, getOutfitDeleteInfo);

// Wear outfit
router.patch("/:id/wear", authMiddleware, wearOutfit);

// Favorite outfit
router.patch("/:id/favorite", authMiddleware, toggleFavoriteOutfit);

export default router;
