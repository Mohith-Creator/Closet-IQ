import { STYLE_TYPES, STYLE_COMPATIBILITY } from "./data.js";

// -----------------------------------------------------------------------------
// Returns true if the given style is one of the supported ClosetIQ styles.
// -----------------------------------------------------------------------------

export const isValidStyle = (style) => {
  return STYLE_TYPES.includes(style);
};

// -----------------------------------------------------------------------------
// Removes invalid, duplicate or empty styles.
// -----------------------------------------------------------------------------

export const normalizeStyles = (styles = []) => {
  if (!Array.isArray(styles)) {
    return [];
  }

  return [...new Set(styles.filter(isValidStyle))];
};

// -----------------------------------------------------------------------------
// Returns all valid styles assigned to an item.
//
// Priority:
// 1. User selected styles (tags.styles)
// 2. Empty array
// -----------------------------------------------------------------------------

export const getItemStyles = (item) => {
  return normalizeStyles(item?.tags?.styles);
};

// -----------------------------------------------------------------------------
// Returns true if the item has the specified style.
// -----------------------------------------------------------------------------

export const hasStyle = (item, style) => {
  return getItemStyles(item).includes(style);
};

// -----------------------------------------------------------------------------
// Returns the compatibility score between two styles.
//
// Score:
// 10 = Perfect
// 0 = No compatibility
// -----------------------------------------------------------------------------

export const getStyleCompatibility = (styleA, styleB) => {
  if (!isValidStyle(styleA) || !isValidStyle(styleB)) {
    return 0;
  }

  return STYLE_COMPATIBILITY[styleA]?.[styleB] ?? 0;
};

// -----------------------------------------------------------------------------
// Returns the best compatibility score between two style collections.
//
// Example:
//
// ["Casual","Streetwear"]
//
// vs
//
// ["Casual"]
//
// => 10
// -----------------------------------------------------------------------------

export const getBestStyleCompatibility = (stylesA = [], stylesB = []) => {
  let best = 0;

  for (const styleA of normalizeStyles(stylesA)) {
    for (const styleB of normalizeStyles(stylesB)) {
      best = Math.max(best, getStyleRelationship(styleA, styleB).compatibility);
    }
  }

  return best;
};

// -----------------------------------------------------------------------------
// Returns the best style match between two style collections.
// -----------------------------------------------------------------------------

export const getBestStyleMatch = (stylesA = [], stylesB = []) => {
  const first = normalizeStyles(stylesA);
  const second = normalizeStyles(stylesB);

  let best = {
    userStyle: null,
    itemStyle: null,
    compatibility: 0,
  };

  for (const userStyle of first) {
    for (const itemStyle of second) {
      const compatibility = getStyleCompatibility(userStyle, itemStyle);

      if (compatibility > best.compatibility) {
        best = {
          userStyle,
          itemStyle,
          compatibility,
        };
      }
    }
  }

  return best;
};

// -----------------------------------------------------------------------------
// Returns true if two items share at least one style.
// -----------------------------------------------------------------------------

export const haveMatchingStyle = (firstItem, secondItem) => {
  const firstStyles = getItemStyles(firstItem);
  const secondStyles = getItemStyles(secondItem);

  return firstStyles.some((style) => secondStyles.includes(style));
};

// -----------------------------------------------------------------------------
// Returns the user's preferred styles.
//
// Always normalized.
// -----------------------------------------------------------------------------

export const getUserPreferredStyles = (user) => {
  return normalizeStyles(user?.stylePreferences);
};

// -----------------------------------------------------------------------------
// Returns the best relationship between two items.
// -----------------------------------------------------------------------------

export const getItemStyleRelationship = (firstItem, secondItem) => {
  const firstStyles = getItemStyles(firstItem);
  const secondStyles = getItemStyles(secondItem);

  let bestRelationship = {
    relationship: "unknown",
    compatibility: 0,
  };

  for (const firstStyle of firstStyles) {
    for (const secondStyle of secondStyles) {
      const relationship = getStyleRelationship(firstStyle, secondStyle);

      if (relationship.compatibility > bestRelationship.compatibility) {
        bestRelationship = relationship;
      }
    }
  }

  return bestRelationship;
};

// -----------------------------------------------------------------------------
// Returns the relationship between two styles.
//
// The knowledge layer classifies relationships.
// The scoring layer decides how valuable each relationship is.
// -----------------------------------------------------------------------------

export const getStyleRelationship = (styleA, styleB) => {
  const compatibility = getStyleCompatibility(styleA, styleB);

  if (compatibility === 10) {
    return {
      relationship: "same",
      compatibility,
    };
  }

  if (compatibility >= 9) {
    return {
      relationship: "perfect",
      compatibility,
    };
  }

  if (compatibility >= 7) {
    return {
      relationship: "good",
      compatibility,
    };
  }

  if (compatibility >= 5) {
    return {
      relationship: "acceptable",
      compatibility,
    };
  }

  if (compatibility > 0) {
    return {
      relationship: "poor",
      compatibility,
    };
  }

  return {
    relationship: "unknown",
    compatibility: 0,
  };
};
