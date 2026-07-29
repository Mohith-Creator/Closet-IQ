import Item from "../models/Item.js";

import { getCurrentUser } from "./helpers/authHelper.js";
import { serverError } from "./helpers/responseHelper.js";

import {
  recommendOutfits,
  recommendHomeOutfits,
} from "../services/recommendationEngine/index.js";

import { recommendationCache } from "../services/recommendationEngine/cache/index.js";

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const CACHE_DURATION = 10 * 60 * 1000;

// -----------------------------------------------------------------------------
// Load User Wardrobe
// -----------------------------------------------------------------------------

const getWardrobeItems = async (userId) => {
  return Item.find({
    user: userId,
  })
    .select(
      `
      _id
      image
      name
      category
      subCategory
      color
      material
      season
      occasion
      fit
      sleeveType
      tags
      favorite
      wearCount
      lastWorn
      timesUsedInOutfits
      status
    `,
    )
    .lean();
};

// -----------------------------------------------------------------------------
// GET /api/outfits/recommendations/:occasion
//
// Returns AI outfit recommendations for a single occasion.
// -----------------------------------------------------------------------------

export const suggestOutfit = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const occasion = req.params.occasion;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const cacheKey = `${user._id}-${occasion}`;

    let cached = recommendationCache.get(cacheKey);

    if (cached && Date.now() - cached.createdAt > CACHE_DURATION) {
      recommendationCache.delete(cacheKey);
      cached = null;
    }

    if (!cached) {
      const items = await getWardrobeItems(user._id);
      console.log(
        items.map((item) => ({
          name: item.name,
          category: item.category,
          occasion: item.occasion,
          season: item.season,
          status: item.status,
        })),
      );
      const recommendations = recommendOutfits({
        user,
        items,
        occasion,
      });

      cached = {
        recommendations,
        total: recommendations.length,
        createdAt: Date.now(),
      };

      recommendationCache.set(cacheKey, cached);
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    res.json({
      success: true,
      occasion,
      page,
      limit,
      totalRecommendations: cached.total,
      hasMore: end < cached.total,
      recommendations: cached.recommendations.slice(start, end),
    });
  } catch (error) {
    serverError(res, error);
  }
};

// -----------------------------------------------------------------------------
// POST /api/outfits/recommendations/home
//
// Generates one recommendation per requested occasion.
// -----------------------------------------------------------------------------

export const suggestHomeOutfits = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const occasions = req.body.occasions ?? [];

    const cacheKey = `${user._id}-home-${occasions.join("-")}`;

    let cached = recommendationCache.get(cacheKey);

    if (cached && Date.now() - cached.createdAt > CACHE_DURATION) {
      recommendationCache.delete(cacheKey);
      cached = null;
    }

    if (!cached) {
      const items = await getWardrobeItems(user._id);

      const recommendations = recommendHomeOutfits({
        user,
        items,
        occasions,
      });

      cached = {
        recommendations,
        createdAt: Date.now(),
      };

      recommendationCache.set(cacheKey, cached);
    }

    res.json({
      success: true,
      recommendations: cached.recommendations,
    });
  } catch (error) {
    serverError(res, error);
  }
};
