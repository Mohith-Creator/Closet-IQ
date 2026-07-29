import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    imagePublicId: {
      type: String,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    subCategory: {
      type: String,
      trim: true,
    },

    color: {
      type: String,
      trim: true,
    },

    material: {
      type: String,
      trim: true,
    },

    occasion: {
      type: [String],
      default: [],
    },

    notes: {
      type: String,
      trim: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    size: {
      type: String,
      trim: true,
    },

    season: {
      type: [
        {
          type: String,
          enum: ["Summer", "Winter", "Rainy", "All Season"],
        },
      ],
      default: [],
    },

    tags: {
      styles: {
        type: [String],
        default: [],
      },

      colors: {
        type: [String],
        default: [],
      },

      features: {
        type: [String],
        default: [],
      },
    },

    aiDescription: {
      type: String,
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },

    wearCount: {
      type: Number,
      default: 0,
    },

    lastWorn: {
      type: Date,
      default: null,
    },

    timesUsedInOutfits: {
      type: Number,
      default: 0,
    },

    aiDetected: {
      type: Boolean,
      default: false,
    },

    fit: {
      type: String,
      trim: true,
    },

    sleeveType: {
      type: String,
      trim: true,
    },

    confidence: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("Item", itemSchema);
