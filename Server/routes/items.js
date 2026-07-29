import express from "express";
import {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  searchItems,
  toggleFavorite,
  analyzeItem,
} from "../controllers/itemController.js";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Item
router.post("/", authMiddleware, upload.single("image"), createItem);

// Get Items
router.get("/", authMiddleware, getItems);

// Update Item by Id
router.put("/:id", authMiddleware, upload.single("image"), updateItem);

// Delete Item by Id
router.delete("/:id", authMiddleware, deleteItem);

// Search Items by filter
router.get("/search/filter", authMiddleware, searchItems);

// Add Favorite Items
router.patch("/:id/favorite", authMiddleware, toggleFavorite);

// Analyze Item by Gemini AI
router.post("/analyze", authMiddleware, upload.single("image"), analyzeItem);

export default router;
