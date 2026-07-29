// -----------------------------------------------------------------------------
// Scoring Result Model
//
// Standardized return object for every scoring module.
// -----------------------------------------------------------------------------

export const createScoringResult = ({
  score = 0,
  confidence = 0,
  breakdown = {},
  metadata = {},
}) => {
  return {
    score,
    confidence,
    breakdown,
    metadata,
  };
};
