// -----------------------------------------------------------------------------
// Color Compatibility Score
// -----------------------------------------------------------------------------

import { COLOR_SCORING } from "../../config/constants.js";
import { createScoringResult } from "../../models/scoringResult.js";
import { getColorRelationship } from "../../knowledge/colors/rules.js";

// -----------------------------------------------------------------------------
// Color Compatibility
// -----------------------------------------------------------------------------

export const scoreColors = ({ candidate }) => {
  const { top, bottom, shoes, accessory } = candidate.items;

  const items = [top, bottom, shoes, accessory].filter(Boolean);

  const colors = items.map((item) => item.color);

  const uniqueColors = [...new Set(colors)];

  const dominantColor = top.color;

  let totalScore = 0;
  let totalPairs = 0;

  const relationships = {
    same: 0,
    neutral: 0,
    family: 0,
    complementary: 0,
    contrast: 0,
  };

  // ---------------------------------------------------------------------------
  // Evaluate every unique color pair
  // ---------------------------------------------------------------------------

  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      const { relationship } = getColorRelationship(colors[i], colors[j]);
      relationships[relationship]++;
      totalScore +=
        COLOR_SCORING[relationship.toUpperCase()] ?? COLOR_SCORING.UNKNOWN;
      totalPairs++;
    }
  }

  // ---------------------------------------------------------------------------
  // Normalize
  // ---------------------------------------------------------------------------

  const maxPossible = totalPairs * COLOR_SCORING.SAME;
  const score =
    maxPossible === 0
      ? 0
      : Math.round((totalScore / maxPossible) * COLOR_SCORING.MAX_SCORE);

  return createScoringResult({
    score,
    confidence: 1,
    metadata: {
      dominantColor,
      palette: colors,
      uniqueColors,
      relationships,
    },
  });
};
