import User from "../../models/User.js";

// -----------------------------------------------------------------------------
// Authentication Helper
// Returns the currently authenticated user document.
// Used by all controllers.
// -----------------------------------------------------------------------------

export const getCurrentUser = async (req) => {
  return await User.findOne({
    uid: req.user.uid,
  });
};
