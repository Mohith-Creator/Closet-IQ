import User from "../models/User.js";

// Signup
// Creates a new user after Firebase authentication.

export const signup = async (req, res) => {
  try {
    const { uid, name, email } = req.body;
    if (!uid || !email) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }
    let user = await User.findOne({
      $or: [{ uid }, { email }],
    });
    if (!user) {
      user = await User.create({
        uid,
        name: name?.trim() || "",
        email,
        isOnboarded: false,
      });
    } else {
      user.uid = uid;
      if (name?.trim()) {
        user.name = name.trim();
      }
      await user.save();
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Login
// Returns the existing user or creates one if it doesn't exist.

export const login = async (req, res) => {
  try {
    const { uid, name, email } = req.body;
    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({
        uid,
        name: name?.trim() || "",
        email,
        isOnboarded: false,
      });
    }
    if ((!user.name || user.name === "User") && name?.trim()) {
      user.name = name.trim();
      await user.save();
    }
    if (user.isOnboarded === undefined) {
      user.isOnboarded = false;
      await user.save();
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Google Authentication
// Creates a user if signing in with Google for the first time.

export const googleLogin = async (req, res) => {
  try {
    const { uid, name, email } = req.body;
    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({
        uid,
        name: name?.trim() || "",
        email,
        isOnboarded: false,
      });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
