// -----------------------------------------------------------------------------
// Diversity Filter
//
// Removes very similar outfits while preserving ranking.
// -----------------------------------------------------------------------------

import { DIVERSITY } from "../config/constants.js";

// -----------------------------------------------------------------------------
// Similarity Score
// -----------------------------------------------------------------------------

const calculateSimilarity = (first, second) => {
  let similarity = 0;

  Object.entries(DIVERSITY.WEIGHTS).forEach(([category, weight]) => {
    const firstItem = first.items[category];
    const secondItem = second.items[category];

    if (firstItem && secondItem && firstItem._id === secondItem._id) {
      similarity += weight;
    }
  });

  return similarity;
};

// -----------------------------------------------------------------------------
// Diversity Filter
// -----------------------------------------------------------------------------

export const diversityFilter = (candidates = []) => {
  const selected = [];

  candidates.forEach((candidate) => {
    const duplicate = selected.some(
      (existing) =>
        calculateSimilarity(existing, candidate) >= DIVERSITY.THRESHOLD,
    );

    if (!duplicate) {
      selected.push(candidate);
    }
  });

  return selected.map((candidate, index) => ({
    ...candidate,

    ranking: {
      ...candidate.ranking,

      position: index + 1,
    },
  }));
};
