// -----------------------------------------------------------------------------
// Outfit Recommendation Engine
//
// Main orchestration pipeline.
// Coordinates the recommendation process without containing
// business or scoring logic.
// -----------------------------------------------------------------------------

import { analyzeUser } from "./analyzeUser.js";
import { analyzeWardrobe } from "./analyzeWardrobe.js";

import { prepareCandidates } from "../generator/prepareCandidates.js";
import { generateCandidates } from "../generator/generateCandidates.js";
import { validateCandidate } from "../generator/validateCandidate.js";

import { scoreCompatibility } from "../scoring/compatibility/index.js";
import { scorePersonalization } from "../scoring/personalization/index.js";

import { rankOutfits } from "./rankOutfits.js";
import { diversityFilter } from "../generator/diversityFilter.js";

import { generateExplanation } from "../explain/generateExplanation.js";
import { explainOutfit } from "./explainOutfit.js";

import { createRecommendationResult } from "../models/recommendationResult.js";

// -----------------------------------------------------------------------------
// Recommendation Pipeline
// -----------------------------------------------------------------------------

export const recommendOutfits = ({ user, items, occasion }) => {
  // ---------------------------------------------------------------------------
  // Analyze User
  // ---------------------------------------------------------------------------

  const userContext = analyzeUser(user, {
    occasion,
  });

  // ---------------------------------------------------------------------------
  // Analyze Wardrobe
  // ---------------------------------------------------------------------------

  const wardrobeContext = analyzeWardrobe(items);

  // ---------------------------------------------------------------------------
  // Prepare Candidate Pools
  // ---------------------------------------------------------------------------

  const candidateContext = prepareCandidates({
    wardrobe: wardrobeContext,
    userContext,
  });

  if (!candidateContext.isValid) {
    return [];
  }

  // ---------------------------------------------------------------------------
  // Generate Candidates
  // ---------------------------------------------------------------------------

  const candidates = generateCandidates(candidateContext);

  if (!candidates.length) {
    return [];
  }

  // ---------------------------------------------------------------------------
  // Validate Candidates
  // ---------------------------------------------------------------------------

  const validCandidates = candidates.filter(validateCandidate);

  if (!validCandidates.length) {
    return [];
  }

  // ---------------------------------------------------------------------------
  // Score Candidates
  // ---------------------------------------------------------------------------

  const scoredCandidates = validCandidates.map((candidate) => {
    const scoringContext = {
      candidate,
      userContext,
      wardrobeContext,
    };

    return {
      ...candidate,

      status: "scored",

      scores: {
        ...candidate.scores,

        compatibility: scoreCompatibility(scoringContext),

        personalization: scorePersonalization(scoringContext),
      },
    };
  });

  // ---------------------------------------------------------------------------
  // Rank Candidates
  // ---------------------------------------------------------------------------

  const rankedCandidates = rankOutfits(scoredCandidates);

  // ---------------------------------------------------------------------------
  // Diversify Recommendations
  // ---------------------------------------------------------------------------

  const diversifiedCandidates = diversityFilter(rankedCandidates);

  // ---------------------------------------------------------------------------
  // Generate Explanations
  // ---------------------------------------------------------------------------

  const explainedCandidates = diversifiedCandidates.map((candidate) => {
    const explanations = generateExplanation(candidate);

    return {
      ...candidate,

      status: "recommended",

      explanation: explainOutfit({
        ...candidate,
        explanation: explanations,
      }),
    };
  });

  // ---------------------------------------------------------------------------
  // Create Recommendation Results
  // ---------------------------------------------------------------------------

  return explainedCandidates.map(createRecommendationResult);
};
