import api from "./api";
import { getAuthHeaders } from "./authHeaders";

// -----------------------------------------------------------------------------
// Create Planner Entry
// Used in:
// - Create Plan Screen
// -----------------------------------------------------------------------------

export const createPlan = async (data) => {
  const response = await api.post("/planner", data, {
    headers: await getAuthHeaders(),
  });

  return response.data;
};

// -----------------------------------------------------------------------------
// Get All Planner Entries
// Used in:
// - Planner Screen
// - Monthly Calendar
// -----------------------------------------------------------------------------

export const getPlans = async () => {
  const response = await api.get("/planner", {
    headers: await getAuthHeaders(),
  });

  return response.data;
};

// -----------------------------------------------------------------------------
// Get Single Planner Entry
// Used in:
// - Edit Plan Screen (Future)
// -----------------------------------------------------------------------------

export const getPlan = async (id) => {
  const response = await api.get(`/planner/${id}`, {
    headers: await getAuthHeaders(),
  });

  return response.data;
};

// -----------------------------------------------------------------------------
// Update Planner Entry
// Used in:
// - Edit Plan Screen (Future)
// -----------------------------------------------------------------------------

export const updatePlan = async (id, data) => {
  const response = await api.put(`/planner/${id}`, data, {
    headers: await getAuthHeaders(),
  });

  return response.data;
};

export const replacePlanOutfit = async (planId, outfitId) => {
  const response = await api.patch(
    `/planner/${planId}/replace-outfit`,
    {
      outfit: outfitId,
    },
    {
      headers: await getAuthHeaders(),
    },
  );

  return response.data;
};

// -----------------------------------------------------------------------------
// Delete Planner Entry
// Used in:
// - Planner Screen
// -----------------------------------------------------------------------------

export const deletePlan = async (id) => {
  const response = await api.delete(`/planner/${id}`, {
    headers: await getAuthHeaders(),
  });

  return response.data;
};