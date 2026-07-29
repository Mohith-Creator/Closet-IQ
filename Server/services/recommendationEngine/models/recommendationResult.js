// -----------------------------------------------------------------------------
// Recommendation Result Model
//
// Creates the standardized response returned by the recommendation engine.
// -----------------------------------------------------------------------------

export const createRecommendationResult = (candidate) => ({
  id: candidate.id,
  status: candidate.status,
  items: candidate.items,
  scores: candidate.scores,
  ranking: candidate.ranking,
  explanation: candidate.explanation,
  metadata: candidate.metadata,
});
