import {
  CATEGORIES,
  SUB_CATEGORIES,
  COLORS,
  MATERIALS,
  OCCASIONS,
  SEASONS,
  FIT_TYPES,
  SLEEVE_TYPES,
} from "../../shared/index.js";

/**
 * -----------------------------------------------------------------------------
 * ClosetIQ AI Validator
 *
 * Ensures every AI value belongs to ClosetIQ's taxonomy.
 * -----------------------------------------------------------------------------
 */

const normalize = (value) => {
  if (!value) return null;

  return String(value).trim().replace(/\s+/g, " ").toLowerCase();
};

const normalizeArray = (values) => {
  if (!Array.isArray(values)) return [];

  return [...new Set(values.filter(Boolean))];
};

/**
 * Case-insensitive lookup.
 */
function findMatch(value, allowed) {
  if (!value) return null;

  const normalized = normalize(value);

  return allowed.find((item) => normalize(item) === normalized) || null;
}

/**
 * Validate category.
 */
function validateCategory(category) {
  return findMatch(category, CATEGORIES);
}

/**
 * Validate sub category.
 */
function validateSubCategory(category, subCategory) {
  if (!category) return null;

  const allowed = SUB_CATEGORIES[category] || [];

  return findMatch(subCategory, allowed);
}

/**
 * Validate color list.
 */
function validateColors(colors = []) {
  return normalizeArray(
    colors.map((color) => findMatch(color, COLORS)).filter(Boolean),
  );
}

/**
 * Validate primary color.
 */
function validatePrimaryColor(primaryColor, colors) {
  const color = findMatch(primaryColor, COLORS);

  if (color) return color;

  return colors[0] || null;
}

/**
 * Validate material.
 */
function validateMaterial(subCategory, material) {
  if (!material) return null;

  const allowed = MATERIALS[subCategory] || [];

  return findMatch(material, allowed);
}

/**
 * Validate occasions.
 */
function validateOccasions(subCategory, occasions = []) {
  const allowed = OCCASIONS[subCategory] || [];

  return normalizeArray(
    occasions.map((item) => findMatch(item, allowed)).filter(Boolean),
  );
}

/**
 * Validate seasons.
 */
function validateSeasons(seasons = []) {
  return normalizeArray(
    seasons.map((season) => findMatch(season, SEASONS)).filter(Boolean),
  );
}

/**
 * Validate fit.
 */
function validateFit(subCategory, fit) {
  const allowed = FIT_TYPES[subCategory] || [];

  return findMatch(fit, allowed);
}

/**
 * Validate sleeve type.
 */
function validateSleeve(subCategory, sleeveType) {
  const allowed = SLEEVE_TYPES[subCategory] || [];

  return findMatch(sleeveType, allowed);
}

/**
 * Validate confidence object.
 */
function validateConfidence(confidence = {}) {
  const clamp = (value) => {
    if (typeof value !== "number") return 0;

    return Math.min(1, Math.max(0, value));
  };

  return {
    overall: clamp(confidence.overall),
    category: clamp(confidence.category),
    subCategory: clamp(confidence.subCategory),
    color: clamp(confidence.color),
    material: clamp(confidence.material),
    fit: clamp(confidence.fit),
  };
}

/**
 * Main validator.
 */
export function validateAIResponse(ai) {
  const category = validateCategory(ai.category);

  const subCategory = validateSubCategory(category, ai.subCategory);

  const colors = validateColors(ai.colors);

  const primaryColor = validatePrimaryColor(ai.primaryColor, colors);

  return {
    name: ai.name?.trim() || "Unnamed Item",

    category,

    subCategory,

    primaryColor,

    colors,

    material: validateMaterial(subCategory, ai.material),

    fit: validateFit(subCategory, ai.fit),

    sleeveType: validateSleeve(subCategory, ai.sleeveType),

    pattern: ai.pattern || null,

    occasion: validateOccasions(subCategory, ai.occasion),

    season: validateSeasons(ai.season),

    tags: {
      styles: normalizeArray(ai.tags?.styles),
      colors: normalizeArray(ai.tags?.colors),
      features: normalizeArray(ai.tags?.features),
    },

    description: ai.description || "",

    confidence: validateConfidence(ai.confidence),
  };
}
