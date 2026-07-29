// -----------------------------------------------------------------------------
// Outfit Ranking
//
// Calculates the final recommendation score and ranking.
// -----------------------------------------------------------------------------

import { RANKING_WEIGHTS } from "../config/constants.js";

export const rankOutfits = (candidates = []) => {
  const ranked = candidates.map((candidate) => {
    const compatibility = candidate.scores.compatibility.score;

    const personalization = candidate.scores.personalization.score;

    const overallScore = Math.round(
      compatibility * RANKING_WEIGHTS.compatibility +
        personalization * RANKING_WEIGHTS.personalization,
    );

    const overallConfidence =
      (candidate.scores.compatibility.confidence +
        candidate.scores.personalization.confidence) /
      2;

    return {
      ...candidate,

      scores: {
        ...candidate.scores,

        overall: {
          score: overallScore,
          confidence: overallConfidence,
        },
      },
    };
  });

  ranked.sort(
    (first, second) => second.scores.overall.score - first.scores.overall.score,
  );

  return ranked.map((candidate, index) => ({
    ...candidate,

    ranking: {
      position: index + 1,

      overallScore: candidate.scores.overall.score,

      compatibilityScore: candidate.scores.compatibility.score,

      personalizationScore: candidate.scores.personalization.score,
    },
  }));
};
