// -----------------------------------------------------------------------------
// User Analysis
//
// Creates a normalized recommendation context from the user document.
// -----------------------------------------------------------------------------

import { normalizeStyles } from "../knowledge/styles/rules.js";
import { normalizeFit } from "../knowledge/fits/rules.js";

export const analyzeUser = (user = {}, context = {}) => {
  const preferredStyles = normalizeStyles(user.stylePreferences ?? []);
  const preferredFit = normalizeFit(user.fitPreference);
  const favoriteColors = [...new Set(user.favoriteColors ?? [])];

  return {
    id: user._id ?? null,

    preferences: {
      styles: preferredStyles,
      fit: preferredFit,
      favoriteColors,
    },

    profile: {
      gender: user.gender ?? null,
      bodyType: user.bodyType ?? null,
    },

    measurements: {
      height: user.measurements?.height ?? null,
      weight: user.measurements?.weight ?? null,
    },

    wardrobe: {},

    history: {},

    context: {
      occasion: context.occasion ?? "Casual",
      weather: context.weather ?? null,
      season: context.season ?? null,
      temperature: context.temperature ?? null,
      location: context.location ?? null,
      timeOfDay: context.timeOfDay ?? null,
    },
  };
};
