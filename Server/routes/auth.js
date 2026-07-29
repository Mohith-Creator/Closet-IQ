import express from "express";
import { body } from "express-validator";
import validate from "../middleware/validate.js";

import { signup, login, googleLogin } from "../controllers/authController.js";

const router = express.Router();

// Signup
router.post(
  "/signup",
  [
    body("uid").notEmpty().withMessage("UID is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("name")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters"),
  ],
  validate,
  signup,
);

// Login
router.post("/login", login);

// Google Authentication
router.post("/google", googleLogin);

export default router;
