// -----------------------------------------------------------------------------
// Color Knowledge Base
// -----------------------------------------------------------------------------

// Supported colors
export const COLOR_TYPES = Object.freeze([
  "Black",
  "White",
  "Grey",
  "Blue",
  "Navy",
  "Brown",
  "Beige",
  "Cream",
  "Green",
  "Olive",
  "Khaki",
  "Red",
  "Maroon",
  "Pink",
  "Yellow",
  "Orange",
  "Purple",
]);

// -----------------------------------------------------------------------------
// Neutral colors
// -----------------------------------------------------------------------------

export const NEUTRAL_COLORS = Object.freeze([
  "Black",
  "White",
  "Grey",
  "Brown",
  "Beige",
  "Cream",
  "Navy",
]);

// -----------------------------------------------------------------------------
// Color families
// -----------------------------------------------------------------------------

export const COLOR_FAMILIES = Object.freeze({
  Black: "Neutral",
  White: "Neutral",
  Grey: "Neutral",

  Beige: "Earth",
  Brown: "Earth",
  Cream: "Earth",
  Olive: "Earth",
  Khaki: "Earth",

  Blue: "Blue",
  Navy: "Blue",

  Green: "Green",

  Red: "Red",
  Maroon: "Red",
  Pink: "Red",

  Orange: "Orange",

  Yellow: "Yellow",

  Purple: "Purple",
});

// -----------------------------------------------------------------------------
// Complementary color groups
// -----------------------------------------------------------------------------

export const COMPLEMENTARY_COLORS = Object.freeze({
  Blue: ["Brown", "Beige", "Cream"],
  Navy: ["Beige", "Cream", "Khaki"],

  Green: ["Brown", "Beige", "Cream"],

  Red: ["Black", "White", "Grey"],
  Maroon: ["Black", "Grey", "Cream"],

  Pink: ["White", "Grey", "Black"],

  Yellow: ["Black", "Navy", "Grey"],

  Orange: ["Black", "White", "Brown"],

  Purple: ["Grey", "White", "Black"],

  Olive: ["Black", "White", "Cream"],

  Khaki: ["Black", "Navy", "White"],
});
