import { FIT_TYPES, FIT_NORMALIZATION, FIT_COMPATIBILITY } from "./data.js";

// -----------------------------------------------------------------------------
// Returns true if the fit is one of the supported canonical fit types.
// -----------------------------------------------------------------------------

export const isValidFit = (fit) => {
  return FIT_TYPES.includes(fit);
};

// -----------------------------------------------------------------------------
// Normalizes any clothing fit to one of the canonical fit types.
//
// Examples:
// Skinny -> Slim Fit
// Straight -> Regular Fit
// Wide Leg -> Relaxed Fit
// -----------------------------------------------------------------------------

export const normalizeFit = (fit) => {
  if (!fit) {
    return null;
  }

  return FIT_NORMALIZATION[fit] ?? null;
};

// -----------------------------------------------------------------------------
// Returns the normalized fit of an item.
//
// Priority:
// 1. User selected fit
// 2. null
// -----------------------------------------------------------------------------

export const getItemFit = (item) => {
  return normalizeFit(item?.fit);
};

// -----------------------------------------------------------------------------
// Returns the compatibility score between two fit types.
//
// Score:
// 10 = Perfect
// 0 = No compatibility
// -----------------------------------------------------------------------------

export const getFitCompatibility = (fitA, fitB) => {
  const first = normalizeFit(fitA);
  const second = normalizeFit(fitB);

  if (!first || !second) {
    return 0;
  }

  return FIT_COMPATIBILITY[first]?.[second] ?? 0;
};

// -----------------------------------------------------------------------------
// Calculates compatibility between two clothing items.
// -----------------------------------------------------------------------------

export const calculateFitCompatibility = (firstItem, secondItem) => {
  return getFitCompatibility(getItemFit(firstItem), getItemFit(secondItem));
};

// -----------------------------------------------------------------------------
// Returns the user's preferred fit.
//
// Always normalized.
// -----------------------------------------------------------------------------

export const getUserPreferredFit = (user) => {
  return normalizeFit(user?.fitPreference);
};

// -----------------------------------------------------------------------------
// Returns true if the item's fit exactly matches the user's preference.
// -----------------------------------------------------------------------------

export const matchesUserFitPreference = (item, user) => {
  return getItemFit(item) === getUserPreferredFit(user);
};

// -----------------------------------------------------------------------------
// Returns the relationship between the user's preferred fit
// and an item's fit.
// -----------------------------------------------------------------------------

export const getPreferredFitMatch = (preferredFit, item) => {
  const itemFit = normalizeFit(item?.fit);

  if (!preferredFit || !itemFit) {
    return {
      preferredFit,
      itemFit,
      relationship: "unknown",
      compatibility: 0,
    };
  }

  const compatibility = getFitCompatibility(preferredFit, itemFit);

  let relationship = "poor";

  if (compatibility === 10) {
    relationship = "same";
  } else if (compatibility >= 8) {
    relationship = "good";
  } else if (compatibility >= 5) {
    relationship = "acceptable";
  }

  return {
    preferredFit,
    itemFit,
    relationship,
    compatibility,
  };
};
