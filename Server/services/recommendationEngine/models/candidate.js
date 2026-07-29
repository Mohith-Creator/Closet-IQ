// -----------------------------------------------------------------------------
// Candidate Model
//
// Creates a standardized outfit candidate used throughout the
// recommendation engine.
// -----------------------------------------------------------------------------

export const createCandidate = ({ top, bottom, shoes, accessory = null }) => {
  return {
    id: [top._id, bottom._id, shoes._id, accessory?._id ?? "none"].join("-"),

    status: "generated",

    items: {
      top,
      bottom,
      shoes,
      accessory,
    },

    scores: {
      compatibility: null,
      personalization: null,
      overall: null,
    },

    ranking: {
      score: null,
      position: null,
    },

    explanation: [],

    metadata: {
      colors: {},
      styles: {},
      materials: {},
      occasions: {},
      seasons: {},
      diagnostics: {},
    },
  };
};
