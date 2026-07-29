// -----------------------------------------------------------------------------
// Material Knowledge Base
// Canonical materials used throughout ClosetIQ.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Supported Materials
// -----------------------------------------------------------------------------

export const MATERIAL_TYPES = Object.freeze([
  "Cotton",
  "Linen",
  "Denim",
  "Leather",
  "Polyester",
  "Wool",
  "Silk",
  "Rayon",
  "Canvas",
  "Synthetic",
]);

// -----------------------------------------------------------------------------
// Material Families
//
// Used to identify similar materials.
// -----------------------------------------------------------------------------

export const MATERIAL_FAMILIES = Object.freeze({
  Cotton: "Natural",
  Linen: "Natural",
  Wool: "Natural",
  Silk: "Natural",

  Denim: "Heavy",
  Leather: "Heavy",
  Canvas: "Heavy",

  Polyester: "Synthetic",
  Rayon: "Synthetic",
  Synthetic: "Synthetic",
});

// -----------------------------------------------------------------------------
// Season Suitability
//
// Indicates which seasons each material performs best in.
// -----------------------------------------------------------------------------

export const MATERIAL_SEASONS = Object.freeze({
  Cotton: ["Summer", "All Season"],

  Linen: ["Summer"],

  Denim: ["Winter", "Monsoon", "All Season"],

  Leather: ["Winter", "Monsoon"],

  Polyester: ["All Season"],

  Wool: ["Winter"],

  Silk: ["Summer", "Winter"],

  Rayon: ["Summer", "All Season"],

  Canvas: ["Winter", "Monsoon"],

  Synthetic: ["All Season"],
});

// -----------------------------------------------------------------------------
// Material Compatibility
//
// Score:
// 10 = Perfect
// 8  = Excellent
// 6  = Good
// 4  = Fair
// 2  = Poor
// -----------------------------------------------------------------------------

export const MATERIAL_COMPATIBILITY = Object.freeze({
  Natural: {
    Natural: 10,
    Heavy: 7,
    Synthetic: 8,
  },

  Heavy: {
    Natural: 7,
    Heavy: 10,
    Synthetic: 6,
  },

  Synthetic: {
    Natural: 8,
    Heavy: 6,
    Synthetic: 10,
  },
});

