import mongoose from "mongoose";

const outfitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],

    occasion: {
      type: String,
      trim: true,
    },

    season: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    wearCount: {
      type: Number,
      default: 0,
    },

    lastWorn: {
      type: Date,
      default: null,
    },
    isDuplicate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Outfit", outfitSchema);
