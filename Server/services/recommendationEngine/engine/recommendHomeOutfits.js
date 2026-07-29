// -----------------------------------------------------------------------------
// Home Recommendation Engine
//
// Generates one high-quality recommendation for each requested occasion.
// Reuses the main recommendation pipeline.
// -----------------------------------------------------------------------------

import { recommendOutfits } from "./recommendOutfits.js";

// -----------------------------------------------------------------------------
// Home Recommendations
// -----------------------------------------------------------------------------

export const recommendHomeOutfits = ({ user, items, occasions = [] }) => {
  const usedCandidateIds = new Set();

  const recommendations = [];

  for (const occasion of occasions) {
    const outfits = recommendOutfits({
      user,
      items,
      occasion,
    });

    const recommendation =
      outfits.find((candidate) => !usedCandidateIds.has(candidate.id)) ?? null;

    if (recommendation) {
      usedCandidateIds.add(recommendation.id);
    }

    recommendations.push({
      occasion,
      recommendation,
    });
  }

  return recommendations.filter(({ recommendation }) => recommendation);
};
