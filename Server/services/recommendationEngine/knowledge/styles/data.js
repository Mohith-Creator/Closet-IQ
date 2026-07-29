// -----------------------------------------------------------------------------
// Style Knowledge Base
// -----------------------------------------------------------------------------

// These are the only supported styles in ClosetIQ.
// They are used in:
// - Onboarding
// - Add/Edit Item
// - Recommendation Engine
// - AI Personalization

export const STYLE_TYPES = Object.freeze([
  "Casual",
  "Formal",
  "Streetwear",
  "Vintage",
  "Sporty",
]);

// -----------------------------------------------------------------------------
// Style Compatibility Matrix
//
// Score:
// 10 = Perfect
// 8-9 = Excellent
// 6-7 = Good
// 4-5 = Acceptable
// 1-3 = Poor
// 0 = Never recommend
// -----------------------------------------------------------------------------

export const STYLE_COMPATIBILITY = Object.freeze({
  Casual: {
    Casual: 10,
    Formal: 4,
    Streetwear: 9,
    Vintage: 7,
    Sporty: 8,
  },

  Formal: {
    Casual: 4,
    Formal: 10,
    Streetwear: 2,
    Vintage: 8,
    Sporty: 1,
  },

  Streetwear: {
    Casual: 9,
    Formal: 2,
    Streetwear: 10,
    Vintage: 5,
    Sporty: 8,
  },

  Vintage: {
    Casual: 7,
    Formal: 8,
    Streetwear: 5,
    Vintage: 10,
    Sporty: 3,
  },

  Sporty: {
    Casual: 8,
    Formal: 1,
    Streetwear: 8,
    Vintage: 3,
    Sporty: 10,
  },
});
