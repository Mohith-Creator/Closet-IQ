// -----------------------------------------------------------------------------
// Wardrobe Analysis
//
// Creates a normalized wardrobe context from the user's wardrobe.
// -----------------------------------------------------------------------------

import { OUTFIT_CATEGORIES } from "../config/categories.js";

export const analyzeWardrobe = (items = []) => {
  // Active wardrobe items
  const activeItems = items.filter(
    (item) => item && item.status !== "archived",
  );

  // Categorize wardrobe
  const categories = {
    tops: [],
    bottoms: [],
    shoes: [],
    accessories: [],
  };

  activeItems.forEach((item) => {
    switch (item.category) {
      case OUTFIT_CATEGORIES.TOP:
        categories.tops.push(item);
        break;

      case OUTFIT_CATEGORIES.BOTTOM:
        categories.bottoms.push(item);
        break;

      case OUTFIT_CATEGORIES.SHOES:
        categories.shoes.push(item);
        break;

      case OUTFIT_CATEGORIES.ACCESSORY:
        categories.accessories.push(item);
        break;

      default:
        break;
    }
  });

  return {
    items: activeItems,

    categories,

    summary: {
      totalItems: activeItems.length,
      tops: categories.tops.length,
      bottoms: categories.bottoms.length,
      shoes: categories.shoes.length,
      accessories: categories.accessories.length,
    },

    favorites: {
      items: [],
    },

    usage: {
      recentlyWorn: [],
      leastWorn: [],
      mostWorn: [],
    },

    metadata: {
      dominantColor: null,
      dominantStyle: null,
      dominantSeason: null,
      dominantOccasion: null,
    },
  };
};
