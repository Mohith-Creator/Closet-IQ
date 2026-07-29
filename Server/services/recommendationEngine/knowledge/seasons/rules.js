import { SEASON_TYPES, SEASON_COMPATIBILITY } from "./data.js";

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

export const isValidSeason = (season) => SEASON_TYPES.includes(season);

// -----------------------------------------------------------------------------
// Normalize
// -----------------------------------------------------------------------------

export const normalizeSeasons = (seasons = []) => {
  if (!Array.isArray(seasons)) {
    return [];
  }

  return [...new Set(seasons.filter(isValidSeason))];
};

// -----------------------------------------------------------------------------
// Item Seasons
// -----------------------------------------------------------------------------

export const getItemSeasons = (item) => normalizeSeasons(item?.season);

// -----------------------------------------------------------------------------
// Has Season
// -----------------------------------------------------------------------------

export const hasSeason = (item, season) =>
  getItemSeasons(item).includes(season);

// -----------------------------------------------------------------------------
// Compatibility
// -----------------------------------------------------------------------------

export const getSeasonCompatibility = (first, second) => {
  if (!isValidSeason(first) || !isValidSeason(second)) {
    return 0;
  }

  return SEASON_COMPATIBILITY[first]?.[second] ?? 0;
};

// -----------------------------------------------------------------------------
// Best Compatibility
// -----------------------------------------------------------------------------

export const getBestSeasonCompatibility = (seasonsA = [], seasonsB = []) => {
  const first = normalizeSeasons(seasonsA);
  const second = normalizeSeasons(seasonsB);

  let best = 0;

  for (const a of first) {
    for (const b of second) {
      best = Math.max(best, getSeasonCompatibility(a, b));
    }
  }

  return best;
};

// -----------------------------------------------------------------------------
// Relationship
// -----------------------------------------------------------------------------

export const getSeasonRelationship = (first, second) => {
  const compatibility = getSeasonCompatibility(first, second);

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
// Item Relationship
// -----------------------------------------------------------------------------

export const getItemSeasonRelationship = (firstItem, secondItem) => {
  const first = getItemSeasons(firstItem);
  const second = getItemSeasons(secondItem);

  let best = {
    relationship: "unknown",
    compatibility: 0,
  };

  for (const a of first) {
    for (const b of second) {
      const result = getSeasonRelationship(a, b);

      if (result.compatibility > best.compatibility) {
        best = result;
      }
    }
  }

  return best;
};
