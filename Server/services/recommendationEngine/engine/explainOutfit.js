// -----------------------------------------------------------------------------
// Outfit Explanation
//
// Converts structured explanation objects into UI-ready explanation cards.
// -----------------------------------------------------------------------------

const EXPLANATION_TEMPLATES = {
  "preferred-style": {
    title: "Matches Your Style",
    icon: "sparkles",
    color: "success",

    buildMessage: (data) =>
      `${data.matchedItems} of ${data.totalItems} items match your preferred ${data.preferredStyles.join(", ")} style.`,
  },

  "favorite-colors": {
    title: "Favorite Colors",
    icon: "color-palette",
    color: "primary",

    buildMessage: (data) =>
      `${data.matchedItems} item${data.matchedItems === 1 ? "" : "s"} use your favorite colors (${data.favoriteColors.join(", ")}).`,
  },

  "preferred-fit": {
    title: "Preferred Fit",
    icon: "body",
    color: "secondary",

    buildMessage: (data) =>
      `${data.matchedItems} item${data.matchedItems === 1 ? "" : "s"} match your preferred ${data.preferredFit}.`,
  },

  occasion: {
    title: "Perfect Occasion",
    icon: "calendar",
    color: "warning",

    buildMessage: (data) => `Suitable for ${data.selectedOccasion}.`,
  },

  "style-harmony": {
    title: "Style Harmony",
    icon: "shirt",
    color: "success",

    buildMessage: () => "The clothing styles complement each other well.",
  },

  "color-harmony": {
    title: "Color Harmony",
    icon: "color-filter",
    color: "primary",

    buildMessage: () =>
      "The outfit uses a balanced and coordinated color palette.",
  },

  season: {
    title: "Season Ready",
    icon: "partly-sunny",
    color: "info",

    buildMessage: (data) => `Suitable for ${data.seasons.join(", ")}.`,
  },

  material: {
    title: "Material Balance",
    icon: "layers",
    color: "secondary",

    buildMessage: () => "The selected materials work well together.",
  },
};

// -----------------------------------------------------------------------------
// Explain Outfit
// -----------------------------------------------------------------------------

export const explainOutfit = (candidate) => {
  return candidate.explanation.map((explanation) => {
    const template = EXPLANATION_TEMPLATES[explanation.type];

    if (!template) {
      return {
        type: explanation.type,
        title: "Recommendation",
        icon: "sparkles",
        color: "neutral",
        message: "Recommended based on your wardrobe and preferences.",
        score: explanation.score,
        priority: explanation.priority,
      };
    }

    return {
      type: explanation.type,
      title: template.title,
      icon: template.icon,
      color: template.color,
      message: template.buildMessage(explanation.data),
      score: explanation.score,
      priority: explanation.priority,
    };
  });
};
