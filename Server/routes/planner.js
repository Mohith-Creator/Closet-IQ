import express from "express";
import {
  createPlan,
  getPlans,
  getPlan,
  updatePlan,
  replacePlanOutfit,
  deletePlan,
} from "../controllers/plannerController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create plan
router.post("/", authMiddleware, createPlan);

// Get all plan
router.get("/", authMiddleware, getPlans);

// Get plan by Id
router.get("/:id", authMiddleware, getPlan);

// Update plan by Id
router.put("/:id", authMiddleware, updatePlan);

// Replace plan outfit
router.patch("/:id/replace-outfit", authMiddleware, replacePlanOutfit);

// Delete plan by Id
router.delete("/:id", authMiddleware, deletePlan);

export default router;
