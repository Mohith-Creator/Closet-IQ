import Item from "../models/Item.js";
import cloudinary from "../config/cloudinary.js";
import { getCurrentUser } from "./helpers/authHelper.js";
import {
  processImage,
  uploadOriginalImage,
} from "../services/image/imageProcessor.js";
import { analyzeClothingSafe } from "../services/ai/aiService.js";
import { serverError, notFound } from "./helpers/responseHelper.js";
import { clearRecommendationCache } from "../services/recommendationEngine/cache/index.js";

export const createItem = async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    if (!req.file?.buffer) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded.",
      });
    }
    const images = await processImage(req.file.buffer);
    const item = await Item.create({
      user: user._id,
      image: images.originalImage,
      imagePublicId: images.originalPublicId,
      name: req.body.name,
      category: req.body.category,
      subCategory: req.body.subCategory,
      color: req.body.color,
      material: req.body.material,
      occasion: req.body.occasion ? JSON.parse(req.body.occasion) : [],
      season: req.body.season ? JSON.parse(req.body.season) : [],
      tags: req.body.tags
        ? JSON.parse(req.body.tags)
        : {
            styles: [],
            colors: [],
            features: [],
          },
      fit: req.body.fit || undefined,
      sleeveType: req.body.sleeveType || undefined,
      notes: req.body.notes || "",
      brand: req.body.brand,
      size: req.body.size,
      aiDescription: req.body.aiDescription,
      processedImage: images.processedImage,
      processedImagePublicId: images.processedPublicId,
      originalImage: images.originalImage,
    });
    clearRecommendationCache(user._id);
    res.status(201).json(item);
  } catch (err) {
    serverError(res, err);
  }
};

// -----------------------------------------------------------------------------
// Get All Items
// API: GET /api/items
// Used by:
// - ClosetScreen
// - OutfitBuilderScreen
// - AI Suggestion Screen
// Returns every wardrobe item belonging to the user.
// -----------------------------------------------------------------------------

export const getItems = async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    console.log("Firebase UID:", req.user.uid);
    console.log("Mongo User:", user);
    const items = await Item.find({
      user: user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(items);
  } catch (err) {
    serverError(res, err);
  }
};

// -----------------------------------------------------------------------------
// Update Item
// API: PUT /api/items/:id
// Used by:
// - EditItemScreen
// Updates wardrobe information.
// -----------------------------------------------------------------------------

export const updateItem = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const updateData = {
      ...req.body,
    };

    if (req.body.occasion) {
      updateData.occasion = JSON.parse(req.body.occasion);
    }

    if (req.body.tags) {
      updateData.tags = JSON.parse(req.body.tags);
    }

    if (req.body.season) {
      updateData.season = JSON.parse(req.body.season);
    }

    if ("fit" in req.body) {
      updateData.fit = req.body.fit || undefined;
    }

    if ("sleeveType" in req.body) {
      updateData.sleeveType = req.body.sleeveType || undefined;
    }

    if (req.file?.buffer) {
      const images = await processImage(req.file.buffer);

      updateData.image = images.originalImage;
      updateData.imagePublicId = images.originalPublicId;
      updateData.processedImage = images.processedImage;
      updateData.processedImagePublicId = images.processedPublicId;
      updateData.originalImage = images.originalImage;
    }

    const item = await Item.findOneAndUpdate(
      {
        _id: req.params.id,
        user: user._id,
      },
      updateData,
      {
        new: true,
      },
    );
    clearRecommendationCache(user._id);
    res.json(item);
  } catch (err) {
    serverError(res, err);
  }
};

// -----------------------------------------------------------------------------
// Delete Item
// API: DELETE /api/items/:id
// Used by:
// - ClosetScreen
// Removes the item and its Cloudinary image.
// -----------------------------------------------------------------------------

export const deleteItem = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const item = await Item.findOne({
      _id: req.params.id,
      user: user._id,
    });

    if (!item) {
      return notFound(res, "Item not found");
    }

    const destroyPromises = [];

    if (item.imagePublicId) {
      destroyPromises.push(cloudinary.uploader.destroy(item.imagePublicId));
    }

    if (item.processedImagePublicId) {
      destroyPromises.push(
        cloudinary.uploader.destroy(item.processedImagePublicId),
      );
    }

    await Promise.all(destroyPromises);
    await item.deleteOne();
    clearRecommendationCache(user._id);
    res.json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (err) {
    serverError(res, err);
  }
};

// -----------------------------------------------------------------------------
// Search & Filter Items
// API: GET /api/items/search
// Used by:
// - ClosetScreen Search
// - Filter Modal
// Returns filtered wardrobe items.
// -----------------------------------------------------------------------------

export const searchItems = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const query = {
      user: user._id,
    };

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.search) {
      query.$or = [
        {
          name: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          subCategory: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          color: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          material: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          occasion: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          "tags.styles": {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          "tags.features": {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          "tags.colors": {
            $regex: req.query.search,
            $options: "i",
          },
        },
      ];
    }

    const items = await Item.find(query).sort({
      createdAt: -1,
    });

    res.json(items);
  } catch (err) {
    serverError(res, err);
  }
};

// -----------------------------------------------------------------------------
// Toggle Favorite
// API: PATCH /api/items/:id/favorite
// Used by:
// - Closet Item Card
// Adds or removes an item from Favorites.
// -----------------------------------------------------------------------------

export const toggleFavorite = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const item = await Item.findOne({
      _id: req.params.id,
      user: user._id,
    });

    if (!item) {
      return notFound(res, "Item not found");
    }

    item.favorite = !item.favorite;

    await item.save();
    clearRecommendationCache(user._id);
    res.json(item);
  } catch (err) {
    serverError(res, err);
  }
};

// -----------------------------------------------------------------------------
// AI Clothing Analysis
// API: POST /api/items/analyze
// Used by:
// - AddItemScreen
// Sends an uploaded image to Gemini for clothing analysis.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// AI Clothing Analysis
// API: POST /api/items/analyze
// Used by:
// - AddItemScreen
//
// Flow:
// 1. Upload image to Cloudinary (Multer)
// 2. Analyze with Gemini Vision
// 3. Validate AI response
// 4. Return structured data
// -----------------------------------------------------------------------------
export const analyzeItem = async (req, res) => {
  try {
    console.log("🤖 Analyze API Hit");

    if (!req.file?.buffer) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded.",
      });
    }

    console.log("☁️ Uploading image...");

    const original = await uploadOriginalImage(req.file.buffer);

    console.log("🤖 Running AI analysis...");

    const analysis = await analyzeClothingSafe(original.originalImage);

    console.log("====================================");
    console.log("🤖 AI ANALYSIS");
    console.log(JSON.stringify(analysis, null, 2));
    console.log("====================================");

    res.json({
      success: true,
      originalImage: original.originalImage,

      // Return the same image because
      // background removal has been removed.
      processedImage: original.originalImage,

      analysis,
    });

    console.log("Response sent.");
  } catch (err) {
    console.error("Analyze Item Error:", err);
    return serverError(res, err);
  }
};