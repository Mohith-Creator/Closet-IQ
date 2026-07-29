import express from "express";
import {
  getProfile,
  updateProfile,
  updatePreferences,
  updateMeasurements,
  finishOnboarding,
  updateAvatar,
} from "../controllers/userController.js";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get current user's profile
router.get("/me", authMiddleware, getProfile);

// Update personal information
router.put("/profile", authMiddleware, updateProfile);

// Update Avatar
router.put("/avatar", authMiddleware, upload.single("avatar"), updateAvatar);

// Update Style Preferences
router.put("/preferences", authMiddleware, updatePreferences);

// Update Measurements
router.put("/measurements", authMiddleware, updateMeasurements);

// Onboarding
router.patch("/onboarding", authMiddleware, finishOnboarding);

export default router;
