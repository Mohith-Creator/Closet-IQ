// -----------------------------------------------------------------------------
// Compatibility Scoring
//
// Orchestrates all outfit compatibility scoring modules.
// -----------------------------------------------------------------------------

import { createScoringResult } from "../../models/scoringResult.js";

import { scoreColors } from "./colorScore.js";
import { scoreStyles } from "./styleScore.js";
import { scoreOccasions } from "./occasionScore.js";
import { scoreSeasons } from "./seasonScore.js";
import { scoreMaterials } from "./materialScore.js";

// -----------------------------------------------------------------------------
// Compatibility Pipeline
// -----------------------------------------------------------------------------

export const scoreCompatibility = (scoringContext) => {
  const scorers = {
    colors: scoreColors,
    styles: scoreStyles,
    occasions: scoreOccasions,
    seasons: scoreSeasons,
    materials: scoreMaterials,
  };

  const results = Object.fromEntries(
    Object.entries(scorers).map(([key, scorer]) => [
      key,
      scorer(scoringContext),
    ]),
  );

  const breakdown = Object.fromEntries(
    Object.entries(results).map(([key, result]) => [key, result.score]),
  );

  const metadata = Object.fromEntries(
    Object.entries(results).map(([key, result]) => [key, result.metadata]),
  );

  const score = Object.values(results).reduce(
    (sum, result) => sum + result.score,
    0,
  );

  const overallConfidence =
    Object.values(results).reduce((sum, result) => sum + result.confidence, 0) /
    Object.keys(results).length;

  return createScoringResult({
    score,
    confidence: overallConfidence,
    breakdown,
    metadata,
  });
};
