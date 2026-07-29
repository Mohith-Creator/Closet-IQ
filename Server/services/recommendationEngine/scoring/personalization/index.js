// -----------------------------------------------------------------------------
// Personalization Scoring
//
// Orchestrates all personalization scoring modules.
// -----------------------------------------------------------------------------

import { createScoringResult } from "../../models/scoringResult.js";

import { scorePreferredStyle } from "./preferredStyleScore.js";
import { scoreFavoriteColor } from "./favoriteColorScore.js";
import { scorePreferredFit } from "./preferredFitScore.js";

// -----------------------------------------------------------------------------
// Personalization Pipeline
// -----------------------------------------------------------------------------

export const scorePersonalization = (scoringContext) => {
  const scorers = {
    preferredStyle: scorePreferredStyle,
    favoriteColors: scoreFavoriteColor,
    preferredFit: scorePreferredFit,
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
