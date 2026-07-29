import recommendationCache from "./recommendationCache.js";

export const clearRecommendationCache = (userId) => {
  const prefix = `${userId}-`;

  for (const key of recommendationCache.keys()) {
    if (key.startsWith(prefix)) {
      recommendationCache.delete(key);
    }
  }

  console.log(`Recommendation cache cleared for ${userId}`);
};
