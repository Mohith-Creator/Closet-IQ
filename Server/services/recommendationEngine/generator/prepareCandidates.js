import { getOccasionCompatibility } from "../knowledge/occasions/rules.js";
import { CANDIDATE_FILTER } from "../config/constants.js";

// Occasions that require an exact match
const STRICT_OCCASIONS = ["Wedding", "Traditional", "Gym"];

// -----------------------------------------------------------------------------
// Filters items based on the selected occasion.
// -----------------------------------------------------------------------------

const filterByOccasion = (items, occasion) => {
  if (!occasion) {
    return items;
  }

  console.log("\n==================================================");
  console.log("Requested Occasion:", occasion);
  console.log(
    "Matching Mode:",
    STRICT_OCCASIONS.includes(occasion) ? "STRICT" : "COMPATIBILITY",
  );
  console.log("==================================================");

  return items.filter((item) => {
    const occasions = Array.isArray(item.occasion)
      ? item.occasion
      : item.occasion
        ? [item.occasion]
        : [];

    console.log("\nItem:", item.name);
    console.log("Occasions:", occasions);

    // ------------------------------------------------------------
    // Strict matching
    // ------------------------------------------------------------
    if (STRICT_OCCASIONS.includes(occasion)) {
      const passed = occasions.includes(occasion);

      console.log(
        `STRICT CHECK -> ${occasion}: ${passed ? "PASS ✅" : "FAIL ❌"}`,
      );

      return passed;
    }

    // ------------------------------------------------------------
    // Compatibility matching
    // ------------------------------------------------------------
    const passed = occasions.some((itemOccasion) => {
      const score = getOccasionCompatibility(itemOccasion, occasion);

      console.log(
        `${itemOccasion} -> ${occasion} = ${score} ${
          score >= CANDIDATE_FILTER.OCCASION_THRESHOLD ? "✅" : "❌"
        }`,
      );

      return score >= CANDIDATE_FILTER.OCCASION_THRESHOLD;
    });

    console.log("Result:", passed ? "PASS ✅" : "FAIL ❌");

    return passed;
  });
};

// -----------------------------------------------------------------------------
// Candidate Preparation
//
// Creates the candidate context used by the outfit generator.
// -----------------------------------------------------------------------------

export const prepareCandidates = ({ wardrobe, userContext }) => {
  const selectedOccasion = userContext.context.occasion;

  const categories = Object.fromEntries(
    Object.entries(wardrobe.categories).map(([category, items]) => [
      category,
      filterByOccasion(items, selectedOccasion),
    ]),
  );

  const summary = {
    totalCategories: 4,
    totalItems:
      categories.tops.length +
      categories.bottoms.length +
      categories.shoes.length +
      categories.accessories.length,
    tops: categories.tops.length,
    bottoms: categories.bottoms.length,
    shoes: categories.shoes.length,
    accessories: categories.accessories.length,
  };

  const candidateContext = {
    status: "prepared",
    categories,
    context: userContext.context,
    summary,
    isValid: summary.tops > 0 && summary.bottoms > 0 && summary.shoes > 0,
  };

  return candidateContext;
};
