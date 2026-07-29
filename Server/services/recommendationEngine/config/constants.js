export const CANDIDATE_FILTER = Object.freeze({
  OCCASION_THRESHOLD: 6,
  SEASON_THRESHOLD: 8,
  MAX_TOPS: 10,
  MAX_BOTTOMS: 8,
  MAX_SHOES: 6,
});

export const COLOR_SCORING = Object.freeze({
  SAME: 10,
  NEUTRAL: 9,
  FAMILY: 8,
  COMPLEMENTARY: 7,
  CONTRAST: 4,
  UNKNOWN: 0,
  MAX_SCORE: 40,
});

export const STYLE_SCORING = Object.freeze({
  SAME: 10,
  PERFECT: 9,
  GOOD: 7,
  ACCEPTABLE: 5,
  POOR: 2,
  UNKNOWN: 0,
  MAX_SCORE: 25,
});

export const OCCASION_SCORING = Object.freeze({
  SAME: 10,
  PERFECT: 9,
  GOOD: 7,
  ACCEPTABLE: 5,
  POOR: 2,
  UNKNOWN: 0,
  MAX_SCORE: 10,
});

export const SEASON_SCORING = Object.freeze({
  SAME: 10,
  PERFECT: 9,
  GOOD: 7,
  ACCEPTABLE: 5,
  POOR: 2,
  UNKNOWN: 0,
  MAX_SCORE: 10,
});

export const MATERIAL_SCORING = Object.freeze({
  SAME: 10,
  PERFECT: 9,
  GOOD: 7,
  ACCEPTABLE: 5,
  POOR: 2,
  UNKNOWN: 0,
  MAX_SCORE: 15,
});

export const PREFERRED_STYLE_SCORING = Object.freeze({
  MATCH: 10,
  PARTIAL: 7,
  NONE: 0,
  MAX_SCORE: 40,
});

export const FAVORITE_COLOR_SCORING = Object.freeze({
  MATCH: 10,
  NONE: 0,
  MAX_SCORE: 35,
});

export const PREFERRED_FIT_SCORING = Object.freeze({
  SAME: 10,
  GOOD: 8,
  ACCEPTABLE: 5,
  POOR: 0,
  UNKNOWN: 0,
  MAX_SCORE: 25,
});

export const SCORE_WEIGHTS = {
  compatibility: {
    colors: 40,
    styles: 25,
    occasion: 10,
    season: 10,
    material: 15,
  },

  personalization: {
    preferredStyle: 40,
    favoriteColors: 35,
    preferredFit: 25,
  },
};

export const RANKING_WEIGHTS = Object.freeze({
  compatibility: 0.7,
  personalization: 0.3,
});

export const DIVERSITY = Object.freeze({
  THRESHOLD: 7,
  WEIGHTS: {
    top: 4,
    bottom: 3,
    shoes: 2,
    accessory: 1,
  },
});
