// -----------------------------------------------------------------------------
// Occasion Knowledge Base
// Canonical occasions used throughout ClosetIQ.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Supported Occasions
// -----------------------------------------------------------------------------

export const OCCASION_TYPES = Object.freeze([
  "Casual",
  "Office",
  "Party",
  "Date",
  "Travel",
  "Gym",
  "Wedding",
  "Traditional",
]);

// -----------------------------------------------------------------------------
// Occasion Compatibility
//
// Score:
// 10 = Perfect
// 8-9 = Excellent
// 6-7 = Good
// 4-5 = Fair
// 1-3 = Poor
// 0 = Never Recommend
// -----------------------------------------------------------------------------

export const OCCASION_COMPATIBILITY = Object.freeze({
  Casual: {
    Casual: 10,
    Office: 6,
    Party: 5,
    Date: 8,
    Travel: 9,
    Gym: 4,
    Wedding: 2,
    Traditional: 3,
  },

  Office: {
    Casual: 6,
    Office: 10,
    Party: 5,
    Date: 7,
    Travel: 5,
    Gym: 2,
    Wedding: 7,
    Traditional: 6,
  },

  Party: {
    Casual: 5,
    Office: 5,
    Party: 10,
    Date: 8,
    Travel: 4,
    Gym: 2,
    Wedding: 8,
    Traditional: 6,
  },

  Date: {
    Casual: 8,
    Office: 7,
    Party: 8,
    Date: 10,
    Travel: 6,
    Gym: 2,
    Wedding: 7,
    Traditional: 5,
  },

  Travel: {
    Casual: 9,
    Office: 5,
    Party: 4,
    Date: 6,
    Travel: 10,
    Gym: 7,
    Wedding: 1,
    Traditional: 2,
  },

  Gym: {
    Casual: 4,
    Office: 2,
    Party: 2,
    Date: 2,
    Travel: 7,
    Gym: 10,
    Wedding: 0,
    Traditional: 0,
  },

  Wedding: {
    Casual: 2,
    Office: 7,
    Party: 8,
    Date: 7,
    Travel: 1,
    Gym: 0,
    Wedding: 10,
    Traditional: 9,
  },

  Traditional: {
    Casual: 3,
    Office: 6,
    Party: 6,
    Date: 5,
    Travel: 2,
    Gym: 0,
    Wedding: 9,
    Traditional: 10,
  },
});
