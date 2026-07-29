// -----------------------------------------------------------------------------
// Season Compatibility Score
// -----------------------------------------------------------------------------

import { createScoringResult } from "../../models/scoringResult.js";

import { SEASON_SCORING } from "../../config/constants.js";

import {
  getItemSeasonRelationship,
  getItemSeasons,
} from "../../knowledge/seasons/rules.js";

export const scoreSeasons = ({ candidate }) => {
  const { top, bottom, shoes, accessory } = candidate.items;

  const items = [top, bottom, shoes, accessory].filter(Boolean);

  const seasons = items.flatMap(getItemSeasons);

  const uniqueSeasons = [...new Set(seasons)];

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
      const { relationship } = getItemSeasonRelationship(items[i], items[j]);

      relationships[relationship]++;

      totalScore +=
        SEASON_SCORING[relationship.toUpperCase()] ?? SEASON_SCORING.UNKNOWN;

      totalPairs++;
    }
  }

  const maxPossible = totalPairs * SEASON_SCORING.SAME;

  const score =
    maxPossible === 0
      ? 0
      : Math.round((totalScore / maxPossible) * SEASON_SCORING.MAX_SCORE);

  const confidence = seasons.length === items.length ? 1 : 0.8;

  return createScoringResult({
    score,
    confidence,

    metadata: {
      seasons,
      uniqueSeasons,
      relationships,
    },
  });
};
