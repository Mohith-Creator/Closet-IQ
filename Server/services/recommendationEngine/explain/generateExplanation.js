// -----------------------------------------------------------------------------
// Explanation Generator
//
// Creates structured explanation objects from the scored candidate.
// -----------------------------------------------------------------------------

import { createExplanation } from "../models/explanation.js";

export const generateExplanation = (candidate) => {
  const explanations = [];

  const { compatibility, personalization } = candidate.scores;

  // ---------------------------------------------------------------------------
  // Preferred Style
  // ---------------------------------------------------------------------------

  const preferredStyle = personalization.metadata.preferredStyle;

  if (preferredStyle.matchedItems > 0) {
    explanations.push(
      createExplanation({
        type: "preferred-style",

        priority: 100,

        score: personalization.breakdown.preferredStyle,

        relationship: "matched",

        data: {
          preferredStyles: preferredStyle.preferredStyles,

          matchedItems: preferredStyle.matchedItems,

          totalItems: preferredStyle.totalItems,

          itemMatches: preferredStyle.itemMatches,
        },
      }),
    );
  }

  // ---------------------------------------------------------------------------
  // Favorite Colors
  // ---------------------------------------------------------------------------

  const favoriteColors = personalization.metadata.favoriteColors;

  if (favoriteColors.matchedItems > 0) {
    explanations.push(
      createExplanation({
        type: "favorite-colors",

        priority: 90,

        score: personalization.breakdown.favoriteColors,

        relationship: "matched",

        data: {
          favoriteColors: favoriteColors.favoriteColors,

          matchedItems: favoriteColors.matchedItems,

          totalItems: favoriteColors.totalItems,

          itemMatches: favoriteColors.itemMatches,
        },
      }),
    );
  }

  // ---------------------------------------------------------------------------
  // Preferred Fit
  // ---------------------------------------------------------------------------

  const preferredFit = personalization.metadata.preferredFit;

  if (preferredFit.matchedItems > 0) {
    explanations.push(
      createExplanation({
        type: "preferred-fit",

        priority: 80,

        score: personalization.breakdown.preferredFit,

        relationship: "matched",

        data: {
          preferredFit: preferredFit.preferredFit,

          matchedItems: preferredFit.matchedItems,

          totalItems: preferredFit.totalItems,

          itemMatches: preferredFit.itemMatches,
        },
      }),
    );
  }

  // ---------------------------------------------------------------------------
  // Occasion Compatibility
  // ---------------------------------------------------------------------------

  const occasions = compatibility.metadata.occasions;

  explanations.push(
    createExplanation({
      type: "occasion",

      priority: 70,

      score: compatibility.breakdown.occasions,

      relationship: "compatible",

      data: {
        selectedOccasion: occasions.selectedOccasion,

        relationships: occasions.relationships,

        occasions: occasions.uniqueOccasions,
      },
    }),
  );

  // ---------------------------------------------------------------------------
  // Style Harmony
  // ---------------------------------------------------------------------------

  const styles = compatibility.metadata.styles;

  explanations.push(
    createExplanation({
      type: "style-harmony",

      priority: 60,

      score: compatibility.breakdown.styles,

      relationship: "compatible",

      data: {
        dominantStyle: styles.dominantStyle,

        relationships: styles.relationships,

        styles: styles.uniqueStyles,
      },
    }),
  );

  // ---------------------------------------------------------------------------
  // Color Harmony
  // ---------------------------------------------------------------------------

  const colors = compatibility.metadata.colors;

  explanations.push(
    createExplanation({
      type: "color-harmony",

      priority: 50,

      score: compatibility.breakdown.colors,

      relationship: "compatible",

      data: {
        dominantColor: colors.dominantColor,

        relationships: colors.relationships,

        colors: colors.uniqueColors,
      },
    }),
  );

  // ---------------------------------------------------------------------------
  // Season Compatibility
  // ---------------------------------------------------------------------------

  const seasons = compatibility.metadata.seasons;

  explanations.push(
    createExplanation({
      type: "season",

      priority: 40,

      score: compatibility.breakdown.seasons,

      relationship: "compatible",

      data: {
        seasons: seasons.uniqueSeasons,

        relationships: seasons.relationships,
      },
    }),
  );

  // ---------------------------------------------------------------------------
  // Material Compatibility
  // ---------------------------------------------------------------------------

  const materials = compatibility.metadata.materials;

  explanations.push(
    createExplanation({
      type: "material",

      priority: 30,

      score: compatibility.breakdown.materials,

      relationship: "compatible",

      data: {
        materials: materials.uniqueMaterials,

        relationships: materials.relationships,
      },
    }),
  );

  return explanations.sort((a, b) => b.priority - a.priority);
};
