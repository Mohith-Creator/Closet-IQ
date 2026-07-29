import { OCCASION_TYPES, OCCASION_COMPATIBILITY } from "./data.js";

// -----------------------------------------------------------------------------
// Returns true if the occasion is supported.
// -----------------------------------------------------------------------------

export const isValidOccasion = (occasion) => {
  return OCCASION_TYPES.includes(occasion);
};

// -----------------------------------------------------------------------------
// Removes invalid, duplicate or empty occasions.
// -----------------------------------------------------------------------------

export const normalizeOccasions = (occasions = []) => {
  if (!Array.isArray(occasions)) {
    return [];
  }

  return [...new Set(occasions.filter(isValidOccasion))];
};

// -----------------------------------------------------------------------------
// Returns all valid occasions assigned to an item.
// -----------------------------------------------------------------------------

export const getItemOccasions = (item) => {
  return normalizeOccasions(item?.occasion);
};

// -----------------------------------------------------------------------------
// Returns true if the item supports the specified occasion.
// -----------------------------------------------------------------------------

export const hasOccasion = (item, occasion) => {
  return getItemOccasions(item).includes(occasion);
};

// -----------------------------------------------------------------------------
// Returns the compatibility score between two occasions.
//
// Score:
// 10 = Perfect
// 0 = No compatibility
// -----------------------------------------------------------------------------

export const getOccasionCompatibility = (first, second) => {
  if (!isValidOccasion(first) || !isValidOccasion(second)) {
    return 0;
  }

  return OCCASION_COMPATIBILITY[first]?.[second] ?? 0;
};

// -----------------------------------------------------------------------------
// Returns the best compatibility score between two occasion collections.
// -----------------------------------------------------------------------------

export const getBestOccasionCompatibility = (
  occasionsA = [],
  occasionsB = [],
) => {
  const first = normalizeOccasions(occasionsA);
  const second = normalizeOccasions(occasionsB);

  if (!first.length || !second.length) {
    return 0;
  }

  let best = 0;

  for (const occasionA of first) {
    for (const occasionB of second) {
      best = Math.max(best, getOccasionCompatibility(occasionA, occasionB));
    }
  }

  return best;
};

// -----------------------------------------------------------------------------
// Returns true if two items share at least one occasion.
// -----------------------------------------------------------------------------

export const haveMatchingOccasion = (firstItem, secondItem) => {
  const first = getItemOccasions(firstItem);
  const second = getItemOccasions(secondItem);

  return first.some((occasion) => second.includes(occasion));
};

// -----------------------------------------------------------------------------
// Returns the relationship between two occasions.
// -----------------------------------------------------------------------------

export const getOccasionRelationship = (first, second) => {
  const compatibility = getOccasionCompatibility(first, second);

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

// -----------------------------------------------------------------------------
// Returns the best relationship between two items.
// -----------------------------------------------------------------------------

export const getItemOccasionRelationship = (firstItem, secondItem) => {
  const firstOccasions = getItemOccasions(firstItem);
  const secondOccasions = getItemOccasions(secondItem);

  let best = {
    relationship: "unknown",
    compatibility: 0,
  };

  for (const first of firstOccasions) {
    for (const second of secondOccasions) {
      const result = getOccasionRelationship(first, second);

      if (result.compatibility > best.compatibility) {
        best = result;
      }
    }
  }

  return best;
};
