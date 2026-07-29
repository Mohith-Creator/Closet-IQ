// -----------------------------------------------------------------------------
// Preferred Fit Personalization Score
// -----------------------------------------------------------------------------

import { createScoringResult } from "../../models/scoringResult.js";

import { PREFERRED_FIT_SCORING } from "../../config/constants.js";

import { getPreferredFitMatch } from "../../knowledge/fits/rules.js";

// -----------------------------------------------------------------------------
// Preferred Fit Score
// -----------------------------------------------------------------------------

export const scorePreferredFit = ({ candidate, userContext }) => {
  const preferredFit = userContext.preferences.fit;

  const items = Object.values(candidate.items).filter(Boolean);

  if (!preferredFit) {
    return createScoringResult({
      score: 0,
      confidence: 0,
      metadata: {
        preferredFit: null,
        matchedItems: 0,
        totalItems: items.length,
        itemMatches: [],
      },
    });
  }

  let totalScore = 0;

  let matchedItems = 0;

  const itemMatches = [];

  items.forEach((item) => {
    const match = getPreferredFitMatch(preferredFit, item);

    const score =
      PREFERRED_FIT_SCORING[match.relationship.toUpperCase()] ??
      PREFERRED_FIT_SCORING.UNKNOWN;

    if (match.relationship === "same" || match.relationship === "good") {
      matchedItems++;
    }

    totalScore += score;

    itemMatches.push({
      itemId: item._id,

      preferredFit: match.preferredFit,

      itemFit: match.itemFit,

      relationship: match.relationship,

      compatibility: match.compatibility,

      score,
    });
  });

  const maxPossible = items.length * PREFERRED_FIT_SCORING.SAME;

  const normalizedScore =
    maxPossible === 0
      ? 0
      : Math.round(
          (totalScore / maxPossible) * PREFERRED_FIT_SCORING.MAX_SCORE,
        );

  const confidence = items.length === 0 ? 0 : matchedItems / items.length;

  return createScoringResult({
    score: normalizedScore,

    confidence,

    metadata: {
      preferredFit,

      matchedItems,

      totalItems: items.length,

      itemMatches,
    },
  });
};
