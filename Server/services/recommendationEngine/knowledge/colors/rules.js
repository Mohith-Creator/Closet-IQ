// -----------------------------------------------------------------------------
// Color Rules
//
// Provides color relationship knowledge used by the recommendation engine.
// -----------------------------------------------------------------------------

import {
  COLOR_TYPES,
  NEUTRAL_COLORS,
  COLOR_FAMILIES,
  COMPLEMENTARY_COLORS,
} from "./data.js";

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

export const isValidColor = (color) => COLOR_TYPES.includes(color);

// -----------------------------------------------------------------------------
// Neutral Colors
// -----------------------------------------------------------------------------

export const isNeutralColor = (color) => NEUTRAL_COLORS.includes(color);

// -----------------------------------------------------------------------------
// Color Family
// -----------------------------------------------------------------------------

export const getColorFamily = (color) => COLOR_FAMILIES[color] ?? null;

// -----------------------------------------------------------------------------
// Returns the color assigned to an item.
// -----------------------------------------------------------------------------

export const getItemColor = (item) => {
  return item?.color ?? null;
};

// -----------------------------------------------------------------------------
// Returns the best favorite color match.
// -----------------------------------------------------------------------------

export const getFavoriteColorMatch = (favoriteColors = [], item) => {
  const itemColor = getItemColor(item);

  if (!itemColor) {
    return {
      favoriteColor: null,
      itemColor: null,
      relationship: "unknown",
      matched: false,
    };
  }

  if (favoriteColors.includes(itemColor)) {
    return {
      favoriteColor: itemColor,
      itemColor,
      relationship: "favorite",
      matched: true,
    };
  }

  return {
    favoriteColor: null,
    itemColor,
    relationship: "not-favorite",
    matched: false,
  };
};

// -----------------------------------------------------------------------------
// Returns true if the item color matches one of the user's favorites.
// -----------------------------------------------------------------------------

export const isFavoriteColor = (item, favoriteColors = []) => {
  return favoriteColors.includes(getItemColor(item));
};

// -----------------------------------------------------------------------------
// Relationship
// -----------------------------------------------------------------------------

export const getColorRelationship = (first, second) => {
  if (!isValidColor(first) || !isValidColor(second)) {
    return {
      relationship: "unknown",
    };
  }

  // Same color
  if (first === second) {
    return {
      relationship: "same",
    };
  }

  // Neutral pair
  if (isNeutralColor(first) || isNeutralColor(second)) {
    return {
      relationship: "neutral",
    };
  }

  // Same family
  if (getColorFamily(first) === getColorFamily(second)) {
    return {
      relationship: "family",
    };
  }

  // Complementary
  if (
    COMPLEMENTARY_COLORS[first]?.includes(second) ||
    COMPLEMENTARY_COLORS[second]?.includes(first)
  ) {
    return {
      relationship: "complementary",
    };
  }

  return {
    relationship: "contrast",
  };
};
