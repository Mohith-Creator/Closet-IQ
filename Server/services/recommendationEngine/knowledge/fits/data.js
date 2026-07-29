// -----------------------------------------------------------------------------
// Fit Knowledge Base
// Canonical fit types used throughout the recommendation engine.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Supported Fit Types
//
// These are the only fit preferences a user can select during onboarding.
// -----------------------------------------------------------------------------

export const FIT_TYPES = Object.freeze([
  "Slim Fit",
  "Regular Fit",
  "Relaxed Fit",
  "Oversized",
]);

// -----------------------------------------------------------------------------
// Fit Normalization
//
// Maps clothing-specific fits to the canonical fit types.
//
// Example:
//
// Skinny      -> Slim Fit
// Straight    -> Regular Fit
// Loose Fit   -> Relaxed Fit
// Wide Leg    -> Relaxed Fit
// -----------------------------------------------------------------------------

export const FIT_NORMALIZATION = Object.freeze({
  "Slim Fit": "Slim Fit",
  Skinny: "Slim Fit",
  "Tailored Fit": "Slim Fit",

  "Regular Fit": "Regular Fit",
  Straight: "Regular Fit",

  "Relaxed Fit": "Relaxed Fit",
  "Loose Fit": "Relaxed Fit",
  "Wide Leg": "Relaxed Fit",

  Oversized: "Oversized",
});

// -----------------------------------------------------------------------------
// Fit Compatibility Matrix
//
// Score:
// 10 = Perfect
// 8-9 = Excellent
// 6-7 = Good
// 4-5 = Acceptable
// 1-3 = Poor
// 0 = Avoid
// -----------------------------------------------------------------------------

export const FIT_COMPATIBILITY = Object.freeze({
  "Slim Fit": {
    "Slim Fit": 10,
    "Regular Fit": 8,
    "Relaxed Fit": 3,
    Oversized: 1,
  },

  "Regular Fit": {
    "Slim Fit": 8,
    "Regular Fit": 10,
    "Relaxed Fit": 8,
    Oversized: 5,
  },

  "Relaxed Fit": {
    "Slim Fit": 3,
    "Regular Fit": 8,
    "Relaxed Fit": 10,
    Oversized: 9,
  },

  Oversized: {
    "Slim Fit": 1,
    "Regular Fit": 5,
    "Relaxed Fit": 9,
    Oversized: 10,
  },
});
