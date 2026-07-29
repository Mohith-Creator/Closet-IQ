import Planner from "../models/Planner.js";
import Outfit from "../models/Outfit.js";
import { getCurrentUser } from "./helpers/authHelper.js";
import { serverError } from "./helpers/responseHelper.js";

// -----------------------------------------------------------------------------
// Returns the start and end of a calendar day
// -----------------------------------------------------------------------------

const getDayRange = (date) => {
  const selected = new Date(date);

  const start = new Date(selected);
  start.setHours(0, 0, 0, 0);

  const end = new Date(selected);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

// -----------------------------------------------------------------------------
// Create Planner Entry
// -----------------------------------------------------------------------------

export const createPlan = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    // Check if a plan already exists for this date and time
    const { start, end } = getDayRange(req.body.date);

    const existingPlan = await Planner.findOne({
      user: user._id,
      date: {
        $gte: start,
        $lte: end,
      },
      timeOfDay: req.body.timeOfDay,
    });

    if (existingPlan) {
      return res.status(400).json({
        success: false,
        message:
          "A plan already exists for this time of day on the selected date.",
      });
    }

    const plan = await Planner.create({
      user: user._id,
      outfit: req.body.outfit,
      date: req.body.date,
      occasion: req.body.occasion,
      weather: req.body.weather,
      timeOfDay: req.body.timeOfDay,
      notes: req.body.notes,
    });

    res.status(201).json({
      success: true,
      plan,
    });
  } catch (error) {
    serverError(res, error);
  }
};

// -----------------------------------------------------------------------------
// Get Planner Entries
// -----------------------------------------------------------------------------

export const getPlans = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const plans = await Planner.find({
      user: user._id,
    })
      .populate({
        path: "outfit",
        populate: {
          path: "items",
        },
      })
      .sort({
        date: 1,
      });

    res.json(plans);
  } catch (error) {
    serverError(res, error);
  }
};

// -----------------------------------------------------------------------------
// Get Single Plan
// -----------------------------------------------------------------------------

export const getPlan = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const plan = await Planner.findOne({
      _id: req.params.id,
      user: user._id,
    }).populate({
      path: "outfit",
      populate: {
        path: "items",
      },
    });

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    res.json(plan);
  } catch (error) {
    serverError(res, error);
  }
};

// -----------------------------------------------------------------------------
// Update Planner Entry
// -----------------------------------------------------------------------------

export const updatePlan = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const { start, end } = getDayRange(req.body.date);

    const existingPlan = await Planner.findOne({
      _id: { $ne: req.params.id }, // ignore current plan
      user: user._id,
      date: {
        $gte: start,
        $lte: end,
      },
      timeOfDay: req.body.timeOfDay,
    });

    if (existingPlan) {
      return res.status(400).json({
        success: false,
        message:
          "A plan already exists for this time of day on the selected date.",
      });
    }

    const updatedPlan = await Planner.findOneAndUpdate(
      {
        _id: req.params.id,
        user: user._id,
      },
      {
        $set: {
          outfit: req.body.outfit,
          date: req.body.date,
          occasion: req.body.occasion,
          weather: req.body.weather,
          timeOfDay: req.body.timeOfDay,
          notes: req.body.notes,
          reminder: req.body.reminder,
          completed: req.body.completed,
        },
      },
      {
        new: true,
      },
    ).populate({
      path: "outfit",
      populate: {
        path: "items",
      },
    });

    if (!updatedPlan) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    res.json(updatedPlan);
  } catch (error) {
    serverError(res, error);
  }
};

// -----------------------------------------------------------------------------
// Replace Planner Outfit
// -----------------------------------------------------------------------------

export const replacePlanOutfit = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const { outfit } = req.body;

    const plan = await Planner.findOne({
      _id: req.params.id,
      user: user._id,
    });

    if (!plan) {
      return notFound(res, "Plan not found");
    }

    const selectedOutfit = await Outfit.findOne({
      _id: outfit,
      user: user._id,
    });

    if (!selectedOutfit) {
      return notFound(res, "Outfit not found");
    }

    plan.outfit = selectedOutfit._id;

    await plan.save();

    await plan.populate({
      path: "outfit",
      populate: {
        path: "items",
      },
    });

    res.json({
      success: true,
      message: "Outfit replaced successfully.",
      plan,
    });
  } catch (error) {
    serverError(res, error);
  }
};

// -----------------------------------------------------------------------------
// Delete Planner Entry
// -----------------------------------------------------------------------------

export const deletePlan = async (req, res) => {
  try {
    const user = await getCurrentUser(req);

    const deleted = await Planner.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    res.json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    serverError(res, error);
  }
};
