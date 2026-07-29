// -----------------------------------------------------------------------------
// Preferred Style Personalization Score
// -----------------------------------------------------------------------------

import { createScoringResult } from "../../models/scoringResult.js";

import { PREFERRED_STYLE_SCORING } from "../../config/constants.js";

import {
  getItemStyles,
  getBestStyleMatch,
} from "../../knowledge/styles/rules.js";

// -----------------------------------------------------------------------------
// Preferred Style Score
// -----------------------------------------------------------------------------

export const scorePreferredStyle = ({ candidate, userContext }) => {
  const preferredStyles = userContext.preferences.styles;

  const items = Object.values(candidate.items).filter(Boolean);

  if (!preferredStyles.length) {
    return createScoringResult({
      score: 0,
      confidence: 0,
      metadata: {
        preferredStyles: [],
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
    const itemStyles = getItemStyles(item);

    const match = getBestStyleMatch(preferredStyles, itemStyles);

    const compatibility = match.compatibility;

    let score = PREFERRED_STYLE_SCORING.NONE;

    if (compatibility === 10) {
      score = PREFERRED_STYLE_SCORING.MATCH;
      matchedItems++;
    } else if (compatibility >= 7) {
      score = PREFERRED_STYLE_SCORING.PARTIAL;
    }

    totalScore += score;

    itemMatches.push({
      itemId: item._id,

      itemStyles,

      preferredStyle: match.userStyle,

      matchedStyle: match.itemStyle,

      compatibility,

      score,
    });
  });

  const maxPossible = items.length * PREFERRED_STYLE_SCORING.MATCH;

  const normalizedScore =
    maxPossible === 0
      ? 0
      : Math.round(
          (totalScore / maxPossible) * PREFERRED_STYLE_SCORING.MAX_SCORE,
        );

  const confidence = itemMatches.length === items.length ? 1 : 0.8;

  return createScoringResult({
    score: normalizedScore,

    confidence,

    metadata: {
      preferredStyles,

      matchedItems,

      totalItems: items.length,

      itemMatches,
    },
  });
};
