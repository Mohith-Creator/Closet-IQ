// Style Compatibility Score

import {
  getItemStyles,
  getItemStyleRelationship,
} from "../../knowledge/styles/rules.js";
import { STYLE_SCORING } from "../../config/constants.js";
import { createScoringResult } from "../../models/scoringResult.js";

// -----------------------------------------------------------------------------
// Style Compatibility
// -----------------------------------------------------------------------------

export const scoreStyles = ({ candidate }) => {
  const { top, bottom, shoes, accessory } = candidate.items;

  const items = [top, bottom, shoes, accessory].filter(Boolean);

  const styles = items.flatMap(getItemStyles);

  const uniqueStyles = [...new Set(styles)];

  const dominantStyle = getItemStyles(top)[0] ?? null;

  let totalScore = 0;
  let totalPairs = 0;

  const relationships = {
    same: 0,
    perfect: 0,
    good: 0,
    acceptable: 0,
    poor: 0,
    unknown: 0,
  };

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const { relationship } = getItemStyleRelationship(items[i], items[j]);
      relationships[relationship]++;
      totalScore +=
        STYLE_SCORING[relationship.toUpperCase()] ?? STYLE_SCORING.UNKNOWN;
      totalPairs++;
    }
  }

  const maxPossible = totalPairs * STYLE_SCORING.SAME;
  const score =
    maxPossible === 0
      ? 0
      : Math.round((totalScore / maxPossible) * STYLE_SCORING.MAX_SCORE);

  return createScoringResult({
    score,
    confidence: 1,
    metadata: {
      dominantStyle,
      styles,
      uniqueStyles,
      relationships,
    },
  });
};
