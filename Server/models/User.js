import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema(
  {
    // Onboarding
    height: {
      type: Number,
      default: null,
    },

    bodyType: {
      type: String,
      enum: ["Lean", "Athletic", "Average", "Broad"],
      default: null,
    },

    shoeSize: {
      type: Number,
      default: null,
    },

    // Optional (Profile)
    chest: {
      type: Number,
      default: null,
    },

    waist: {
      type: Number,
      default: null,
    },

    hips: {
      type: Number,
      default: null,
    },

    shoulder: {
      type: Number,
      default: null,
    },

    inseam: {
      type: Number,
      default: null,
    },
  },
  { _id: false },
);

const preferenceSchema = new mongoose.Schema(
  {
    styles: {
      type: [String],
      default: [],
    },

    fitPreference: {
      type: String,
      enum: ["Slim Fit", "Regular Fit", "Relaxed Fit", "Oversized", ""],
      default: "",
    },

    favoriteColors: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    // Authentication
    uid: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Profile
    name: {
      type: String,
      default: "",
    },

    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },

    dob: {
      type: String,
      default: "",
    },

    // Preferences
    preferences: {
      type: preferenceSchema,
      default: () => ({}),
    },

    // Measurements
    measurements: {
      type: measurementSchema,
      default: () => ({}),
    },

    // Onboarding
    isOnboarded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);