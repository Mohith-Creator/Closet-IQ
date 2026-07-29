// -----------------------------------------------------------------------------
// Material Compatibility Score
// -----------------------------------------------------------------------------

import { createScoringResult } from "../../models/scoringResult.js";

import { MATERIAL_SCORING } from "../../config/constants.js";

import {
  getItemMaterials,
  getItemMaterialRelationship,
} from "../../knowledge/materials/rules.js";

// -----------------------------------------------------------------------------
// Material Compatibility
// -----------------------------------------------------------------------------

export const scoreMaterials = ({ candidate }) => {
  const { top, bottom, shoes, accessory } = candidate.items;

  const items = [top, bottom, shoes, accessory].filter(Boolean);

  const materials = items.flatMap(getItemMaterials);

  const uniqueMaterials = [...new Set(materials)];

  let totalScore = 0;
  let totalPairs = 0;

  const relationships = {
    same: 0,
    perfect: 0,
    good: 0,
    acceptable: 0,
    poor: 0,
    unknown: 0,
  };

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const { relationship } = getItemMaterialRelationship(items[i], items[j]);

      relationships[relationship]++;

      totalScore +=
        MATERIAL_SCORING[relationship.toUpperCase()] ??
        MATERIAL_SCORING.UNKNOWN;

      totalPairs++;
    }
  }

  const maxPossible = totalPairs * MATERIAL_SCORING.SAME;

  const score =
    maxPossible === 0
      ? 0
      : Math.round((totalScore / maxPossible) * MATERIAL_SCORING.MAX_SCORE);

  const confidence = materials.length === items.length ? 1 : 0.8;

  return createScoringResult({
    score,
    confidence,

    metadata: {
      materials,
      uniqueMaterials,
      relationships,
    },
  });
};
