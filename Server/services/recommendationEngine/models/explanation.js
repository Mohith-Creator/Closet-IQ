// -----------------------------------------------------------------------------
// Explanation Model
//
// Standard explanation object used throughout the recommendation engine.
// -----------------------------------------------------------------------------

export const createExplanation = ({
  type,
  priority,
  score,
  relationship,
  data = {},
}) => ({
  type,
  priority,
  score,
  relationship,
  data,
});
