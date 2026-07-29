import Outfit from "../../models/Outfit.js";

// -----------------------------------------------------------------------------
// Outfit Helpers
// Shared helper functions for outfit controllers.
// -----------------------------------------------------------------------------

// Finds an outfit belonging to the current user.
export const findUserOutfit = async (
  userId,
  outfitId,
  populateItems = false,
) => {
  let query = Outfit.findOne({
    _id: outfitId,
    user: userId,
  });

  if (populateItems) {
    query = query.populate("items");
  }

  return await query;
};
