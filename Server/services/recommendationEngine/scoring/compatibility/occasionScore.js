// -----------------------------------------------------------------------------
// Occasion Compatibility Score
// -----------------------------------------------------------------------------

import { createScoringResult } from "../../models/scoringResult.js";

import { OCCASION_SCORING } from "../../config/constants.js";

import {
  getItemOccasionRelationship,
  getItemOccasions,
} from "../../knowledge/occasions/rules.js";

// -----------------------------------------------------------------------------
// Occasion Compatibility
// -----------------------------------------------------------------------------

export const scoreOccasions = ({ candidate, userContext }) => {
  const { top, bottom, shoes, accessory } = candidate.items;

  const items = [top, bottom, shoes, accessory].filter(Boolean);

  const occasions = items.flatMap(getItemOccasions);

  const uniqueOccasions = [...new Set(occasions)];

  const selectedOccasion = userContext.context.occasion;

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

  // ---------------------------------------------------------------------------
  // Pair compatibility
  // ---------------------------------------------------------------------------

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const { relationship } = getItemOccasionRelationship(items[i], items[j]);

      relationships[relationship]++;

      totalScore +=
        OCCASION_SCORING[relationship.toUpperCase()] ??
        OCCASION_SCORING.UNKNOWN;

      totalPairs++;
    }
  }

  // ---------------------------------------------------------------------------
  // Bonus if every item supports the selected occasion
  // ---------------------------------------------------------------------------

  const supportsSelectedOccasion = items.every((item) =>
    getItemOccasions(item).includes(selectedOccasion),
  );

  if (supportsSelectedOccasion) {
    totalScore += OCCASION_SCORING.SAME;
  }

  // ---------------------------------------------------------------------------
  // Normalize
  // ---------------------------------------------------------------------------

  const maxPossible =
    totalPairs * OCCASION_SCORING.SAME + OCCASION_SCORING.SAME;

  const score =
    maxPossible === 0
      ? 0
      : Math.round((totalScore / maxPossible) * OCCASION_SCORING.MAX_SCORE);

  return createScoringResult({
    score,

    confidence: occasions.length === items.length ? 1 : 0.85,

    metadata: {
      selectedOccasion,

      occasions,

      uniqueOccasions,

      relationships,

      supportsSelectedOccasion,
    },
  });
};
