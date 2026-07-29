import { createCandidate } from "../models/candidate.js";

export const generateCandidates = (candidateContext) => {
  const { tops, bottoms, shoes, accessories } = candidateContext.categories;

  if (!candidateContext.isValid) {
    return [];
  }

  const accessoryPool = accessories.length ? accessories : [null];

  const candidates = [];

  for (const top of tops) {
    for (const bottom of bottoms) {
      for (const shoe of shoes) {
        for (const accessory of accessoryPool) {
          candidates.push(
            createCandidate({
              top,
              bottom,
              shoes: shoe,
              accessory,
            }),
          );
        }
      }
    }
  }

  return candidates;
};
