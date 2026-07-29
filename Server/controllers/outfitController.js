import Plan from "../models/Planner.js";
import Outfit from "../models/Outfit.js";
import Item from "../models/Item.js";

import { getCurrentUser } from "./helpers/authHelper.js";
import { serverError, notFound } from "./helpers/responseHelper.js";
import { findUserOutfit } from "./helpers/outfitHelper.js";

const findDuplicateOutfit = async ({
  userId,
  items,
  occasion,
  excludeOutfitId = null,
}) => {
  const outfits = await Outfit.find({
    user: userId,
    occasion,
    ...(excludeOutfitId && { _id: { $ne: excludeOutfitId } }),
  }).select("name items");

  const incomingItems = [...items].map(String).sort();

  return outfits.find((outfit) => {
    const savedItems = outfit.items.map(String).sort();

    return (
      savedItems.length === incomingItems.length &&
      savedItems.every((id, index) => id === incomingItems[index])
    );
  });
};

// -----------------------------------------------------------------------------
// Create Outfit
// -----------------------------------------------------------------------------

export const createOutfit = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const duplicate = await findDuplicateOutfit({
      userId: user._id,
      items: req.body.items,
      occasion: req.body.occasion,
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        duplicate: true,
        existingName: duplicate.name,
        message: "Outfit already exists",
      });
    }

    const outfit = await Outfit.create({
      user: user._id,
      name: req.body.name,
      items: req.body.items,
      occasion: req.body.occasion,
      season: req.body.season,
      notes: req.body.notes,
    });

    res.status(201).json(outfit);
  } catch (error) {
    serverError(res, error);
  }
};

// -----------------------------------------------------------------------------
// Get Outfits
// -----------------------------------------------------------------------------

export const getOutfits = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const outfits = await Outfit.find({
      user: user._id,
    })
      .populate("items")
      .sort({
        isFavorite: -1,
        createdAt: -1,
      });

    res.json(outfits);
  } catch (error) {
    serverError(res, error);
  }
};

// -----------------------------------------------------------------------------
// Update Outfit
// -----------------------------------------------------------------------------

export const updateOutfit = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const duplicate = await findDuplicateOutfit({
      userId: user._id,
      items: req.body.items,
      occasion: req.body.occasion,
      excludeOutfitId: req.params.id,
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        duplicate: true,
        existingName: duplicate.name,
        message: "Outfit already exists",
      });
    }

    const outfit = await Outfit.findOneAndUpdate(
      {
        _id: req.params.id,
        user: user._id,
      },
      {
        name: req.body.name,
        items: req.body.items,
        occasion: req.body.occasion,
        season: req.body.season,
        notes: req.body.notes,
      },
      {
        new: true,
      },
    );

    res.json(outfit);
  } catch (error) {
    serverError(res, error);
  }
};

// -----------------------------------------------------------------------------
// Delete Outfit
// -----------------------------------------------------------------------------

export const deleteOutfit = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const outfit = await Outfit.findOne({
      _id: req.params.id,
      user: user._id,
    });

    if (!outfit) {
      return notFound(res, "Outfit not found");
    }

    const plansUsingOutfit = await Plan.countDocuments({
      user: user._id,
      outfit: outfit._id,
    });

    if (plansUsingOutfit > 0) {
      await Plan.updateMany(
        {
          user: user._id,
          outfit: outfit._id,
        },
        {
          $set: {
            outfit: null,
          },
        },
      );
    }

    await outfit.deleteOne();

    res.json({
      success: true,
      plansAffected: plansUsingOutfit,
      message:
        plansUsingOutfit > 0
          ? "Outfit deleted. Existing plans have been preserved."
          : "Outfit deleted successfully.",
    });
  } catch (error) {
    serverError(res, error);
  }
};

// -----------------------------------------------------------------------------
// Outfit Delete Info
// -----------------------------------------------------------------------------

export const getOutfitDeleteInfo = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const outfit = await Outfit.findOne({
      _id: req.params.id,
      user: user._id,
    });

    if (!outfit) {
      return notFound(res, "Outfit not found");
    }

    const plansAffected = await Plan.countDocuments({
      user: user._id,
      outfit: outfit._id,
    });

    res.json({
      success: true,
      plansAffected,
    });
  } catch (error) {
    serverError(res, error);
  }
};

// -----------------------------------------------------------------------------
// Wear Outfit
// -----------------------------------------------------------------------------

export const wearOutfit = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const outfit = await findUserOutfit(user._id, req.params.id, true);

    if (!outfit) {
      return notFound(res, "Outfit not found");
    }

    for (const item of outfit.items) {
      await Item.findByIdAndUpdate(item._id, {
        $inc: {
          wearCount: 1,
          timesUsedInOutfits: 1,
        },
        lastWorn: new Date(),
      });
    }

    await Outfit.findByIdAndUpdate(outfit._id, {
      $inc: {
        wearCount: 1,
      },
      lastWorn: new Date(),
    });

    res.json({
      success: true,
      message: "Outfit worn successfully",
    });
  } catch (error) {
    serverError(res, error);
  }
};

// -----------------------------------------------------------------------------
// Favorite Outfit
// -----------------------------------------------------------------------------

export const toggleFavoriteOutfit = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const outfit = await findUserOutfit(user._id, req.params.id);

    if (!outfit) {
      return notFound(res, "Outfit not found");
    }

    outfit.isFavorite = !outfit.isFavorite;

    await outfit.save();

    res.json(outfit);
  } catch (error) {
    serverError(res, error);
  }
};

// -----------------------------------------------------------------------------
// Duplicate Outfit
// -----------------------------------------------------------------------------

export const duplicateOutfit = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const original = await findUserOutfit(user._id, req.params.id);

    if (!original) {
      return notFound(res, "Outfit not found");
    }

    const duplicate = await Outfit.create({
      user: user._id,
      name: `${original.name} Copy`,
      items: original.items,
      occasion: original.occasion,
      season: original.season,
      notes: original.notes,
      isFavorite: false,
      wearCount: 0,
      lastWorn: null,
      isDuplicate: true,
    });

    res.status(201).json(duplicate);
  } catch (error) {
    serverError(res, error);
  }
};
