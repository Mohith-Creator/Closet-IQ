import express from "express";
import {
  suggestOutfit,
  suggestHomeOutfits,
} from "../controllers/recommendationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Single Occasion Recommendation
router.get("/:occasion", authMiddleware, suggestOutfit);

// Home Recommendations Multiple Occasion's
router.post("/home", authMiddleware, suggestHomeOutfits);

export default router;
