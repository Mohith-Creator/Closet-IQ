import User from "../models/User.js";
import { uploadBuffer } from "../utils/cloudinaryUpload.js";

const getUser = async (uid) => {
  return await User.findOne({ uid });
};

// ===============================
// Profile
// ===============================

export const getProfile = async (req, res) => {
  try {
    const user = await getUser(req.user.uid);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to fetch profile.",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, username, gender } = req.body;
    const user = await getUser(req.user.uid);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (typeof name === "string") {
      user.name = name.trim();
    }
    if (typeof username === "string") {
      const formatted = username.trim().toLowerCase().replace(/\s+/g, "");
      if (formatted) {
        if (formatted.length < 3 || formatted.length > 20) {
          return res.status(400).json({
            message: "Username must be 3-20 characters.",
          });
        }
        if (!/^[a-z0-9_]+$/.test(formatted)) {
          return res.status(400).json({
            message: "Only letters, numbers and underscores are allowed.",
          });
        }
        const exists = await User.findOne({
          username: formatted,
          _id: { $ne: user._id },
        });
        if (exists) {
          return res.status(400).json({
            message: "Username already taken.",
          });
        }
      }
      user.username = formatted;
    }
    if (gender !== undefined) {
      user.gender = gender;
    }
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to update profile.",
    });
  }
};

// ===============================
// Preferences
// ===============================

export const updatePreferences = async (req, res) => {
  try {
    const { styles, fitPreference, favoriteColors } = req.body;
    const user = await getUser(req.user.uid);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.preferences = {
      ...user.preferences,
      ...(styles !== undefined && {
        styles: Array.isArray(styles) ? styles : [],
      }),
      ...(fitPreference !== undefined && {
        fitPreference,
      }),
      ...(favoriteColors !== undefined && {
        favoriteColors: Array.isArray(favoriteColors) ? favoriteColors : [],
      }),
    };
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to update preferences.",
    });
  }
};

// ===============================
// Measurements
// ===============================

export const updateMeasurements = async (req, res) => {
  try {
    const { measurements } = req.body;
    const user = await getUser(req.user.uid);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const RANGES = {
      height: { min: 120, max: 220, unit: "cm" },
      weight: { min: 30, max: 250, unit: "kg" },
      shoeSize: { min: 3, max: 16, unit: "UK" },
      chest: { min: 60, max: 170, unit: "cm" },
      waist: { min: 45, max: 170, unit: "cm" },
      hips: { min: 60, max: 180, unit: "cm" },
      shoulder: { min: 30, max: 70, unit: "cm" },
      inseam: { min: 45, max: 120, unit: "cm" },
    };

    for (const [key, value] of Object.entries(measurements)) {
      if (value === null || value === undefined || value === "") continue;
      if (RANGES[key]) {
        const number = Number(value);
        if (Number.isNaN(number)) {
          return res.status(400).json({
            message: `${key} must be a valid number.`,
          });
        }
        const { min, max, unit } = RANGES[key];
        if (number < min || number > max) {
          return res.status(400).json({
            message: `${key} must be between ${min} and ${max} ${unit}.`,
          });
        }
      }
    }
    user.measurements = {
      ...user.measurements,
      ...measurements,
    };
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to update measurements.",
    });
  }
};

// ===============================
// Avatar
// ===============================

export const updateAvatar = async (req, res) => {
  try {
    const user = await getUser(req.user.uid);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded.",
      });
    }
    const uploadedImage = await uploadBuffer(req.file.buffer, "avatars");
    user.avatar = uploadedImage.secure_url;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to upload avatar.",
    });
  }
};

// ===============================
// Onboarding
// ===============================

export const finishOnboarding = async (req, res) => {
  try {
    const user = await getUser(req.user.uid);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.isOnboarded = true;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to complete onboarding.",
    });
  }
};
