import { MATERIAL_TYPES, MATERIAL_COMPATIBILITY } from "./data.js";

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

export const isValidMaterial = (material) => MATERIAL_TYPES.includes(material);

// -----------------------------------------------------------------------------
// Normalize
// -----------------------------------------------------------------------------

export const normalizeMaterials = (materials = []) => {
  if (!Array.isArray(materials)) {
    return [];
  }

  return [...new Set(materials.filter(isValidMaterial))];
};

// -----------------------------------------------------------------------------
// Item Materials
// -----------------------------------------------------------------------------

export const getItemMaterials = (item) => normalizeMaterials(item?.material);

// -----------------------------------------------------------------------------
// Has Material
// -----------------------------------------------------------------------------

export const hasMaterial = (item, material) =>
  getItemMaterials(item).includes(material);

// -----------------------------------------------------------------------------
// Compatibility
// -----------------------------------------------------------------------------

export const getMaterialCompatibility = (first, second) => {
  if (!isValidMaterial(first) || !isValidMaterial(second)) {
    return 0;
  }

  return MATERIAL_COMPATIBILITY[first]?.[second] ?? 0;
};

// -----------------------------------------------------------------------------
// Best Compatibility
// -----------------------------------------------------------------------------

export const getBestMaterialCompatibility = (
  materialsA = [],
  materialsB = [],
) => {
  const first = normalizeMaterials(materialsA);
  const second = normalizeMaterials(materialsB);

  let best = 0;

  for (const a of first) {
    for (const b of second) {
      best = Math.max(best, getMaterialCompatibility(a, b));
    }
  }

  return best;
};

// -----------------------------------------------------------------------------
// Relationship
// -----------------------------------------------------------------------------

export const getMaterialRelationship = (first, second) => {
  const compatibility = getMaterialCompatibility(first, second);

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

export const getItemMaterialRelationship = (firstItem, secondItem) => {
  const first = getItemMaterials(firstItem);
  const second = getItemMaterials(secondItem);

  let best = {
    relationship: "unknown",
    compatibility: 0,
  };

  for (const a of first) {
    for (const b of second) {
      const result = getMaterialRelationship(a, b);

      if (result.compatibility > best.compatibility) {
        best = result;
      }
    }
  }

  return best;
};
