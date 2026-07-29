// -----------------------------------------------------------------------------
// Favorite Color Personalization Score
// -----------------------------------------------------------------------------

import { createScoringResult } from "../../models/scoringResult.js";

import { FAVORITE_COLOR_SCORING } from "../../config/constants.js";

import { getFavoriteColorMatch } from "../../knowledge/colors/rules.js";

// -----------------------------------------------------------------------------
// Favorite Color Score
// -----------------------------------------------------------------------------

export const scoreFavoriteColor = ({ candidate, userContext }) => {
  const favoriteColors = userContext.preferences.favoriteColors;

  const items = Object.values(candidate.items).filter(Boolean);

  if (!favoriteColors.length) {
    return createScoringResult({
      score: 0,
      confidence: 0,
      metadata: {
        favoriteColors: [],
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
    const match = getFavoriteColorMatch(favoriteColors, item);

    const score = match.matched
      ? FAVORITE_COLOR_SCORING.MATCH
      : FAVORITE_COLOR_SCORING.NONE;

    if (match.matched) {
      matchedItems++;
    }

    totalScore += score;

    itemMatches.push({
      itemId: item._id,

      itemColor: match.itemColor,

      favoriteColor: match.favoriteColor,

      relationship: match.relationship,

      score,
    });
  });

  const maxPossible = items.length * FAVORITE_COLOR_SCORING.MATCH;

  const normalizedScore =
    maxPossible === 0
      ? 0
      : Math.round(
          (totalScore / maxPossible) * FAVORITE_COLOR_SCORING.MAX_SCORE,
        );

  const confidence = items.length === 0 ? 0 : matchedItems / items.length;

  return createScoringResult({
    score: normalizedScore,

    confidence,

    metadata: {
      favoriteColors,

      matchedItems,

      totalItems: items.length,

      itemMatches,
    },
  });
};
