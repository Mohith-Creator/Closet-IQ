import mongoose from "mongoose";

const plannerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    outfit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outfit",
      required: true,
    },

    // Planned Date
    date: {
      type: Date,
      required: true,
    },

    // Selected filters
    occasion: {
      type: String,
      default: "",
    },

    weather: {
      type: String,
      enum: ["sunny", "cloudy", "rain", "cold"],
      default: "",
    },

    timeOfDay: {
      type: String,
      enum: ["morning", "afternoon", "evening", "night"],
      default: "",
    },

    // User Notes
    notes: {
      type: String,
      default: "",
    },

    // Reminder
    reminder: {
      enabled: {
        type: Boolean,
        default: false,
      },
      minutesBefore: {
        type: Number,
        default: 30,
      },
    },

    // Optional status
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Planner", plannerSchema);
