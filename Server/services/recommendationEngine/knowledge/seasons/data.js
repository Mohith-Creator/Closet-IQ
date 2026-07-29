// -----------------------------------------------------------------------------
// Season Knowledge Base
// Canonical seasons used throughout ClosetIQ.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Supported Seasons
// -----------------------------------------------------------------------------

export const SEASON_TYPES = Object.freeze([
  "Summer",
  "Winter",
  "Monsoon",
  "All Season",
]);

// -----------------------------------------------------------------------------
// Season Compatibility
//
// Score:
// 10 = Perfect
// 8-9 = Excellent
// 6-7 = Good
// 4-5 = Fair
// 1-3 = Poor
// 0 = Avoid
// -----------------------------------------------------------------------------

export const SEASON_COMPATIBILITY = Object.freeze({
  Summer: {
    Summer: 10,
    Winter: 2,
    Monsoon: 5,
    "All Season": 9,
  },

  Winter: {
    Summer: 2,
    Winter: 10,
    Monsoon: 8,
    "All Season": 9,
  },

  Monsoon: {
    Summer: 5,
    Winter: 8,
    Monsoon: 10,
    "All Season": 9,
  },

  "All Season": {
    Summer: 9,
    Winter: 9,
    Monsoon: 9,
    "All Season": 10,
  },
});
