import api from "./api";
import { getAuthHeaders } from "./authHeaders";

// -----------------------------------------------------------------------------
// Create Outfit
// -----------------------------------------------------------------------------

export const createOutfit = async (data) => {
  const response = await api.post("/outfits", data, {
    headers: await getAuthHeaders(),
  });

  return response.data;
};

// -----------------------------------------------------------------------------
// Get Outfits
// -----------------------------------------------------------------------------

export const getOutfits = async () => {
  const response = await api.get("/outfits", {
    headers: await getAuthHeaders(),
  });

  return response.data;
};

// -----------------------------------------------------------------------------
// Update Outfit
// -----------------------------------------------------------------------------

export const updateOutfit = async (id, data) => {
  const response = await api.put(`/outfits/${id}`, data, {
    headers: await getAuthHeaders(),
  });

  return response.data;
};

// -----------------------------------------------------------------------------
// Delete Outfit
// -----------------------------------------------------------------------------

export const deleteOutfit = async (id) => {
  const response = await api.delete(`/outfits/${id}`, {
    headers: await getAuthHeaders(),
  });

  return response.data;
};

// -----------------------------------------------------------------------------
// Delete Outfit Info
// -----------------------------------------------------------------------------

export const getOutfitDeleteInfo = async (id) => {
  const response = await api.get(`/outfits/${id}/delete-info`, {
    headers: await getAuthHeaders(),
  });

  return response.data;
};

// -----------------------------------------------------------------------------
// AI Recommendation (Single Occasion)
// -----------------------------------------------------------------------------

export const getRecommendations = async (occasion, page = 1, limit = 5) => {
  const response = await api.get(`/outfits/recommendations/${occasion}`, {
    params: {
      page,
      limit,
    },
    headers: await getAuthHeaders(),
  });

  return response.data;
};

// -----------------------------------------------------------------------------
// AI Home Recommendations
// -----------------------------------------------------------------------------

export const getHomeRecommendations = async (occasions) => {
  const response = await api.post(
    "/outfits/recommendations/home",
    {
      occasions,
    },
    {
      headers: await getAuthHeaders(),
    },
  );

  return response.data;
};

// -----------------------------------------------------------------------------
// Wear Outfit
// -----------------------------------------------------------------------------

export const wearOutfit = async (id) => {
  const response = await api.patch(
    `/outfits/${id}/wear`,
    {},
    {
      headers: await getAuthHeaders(),
    },
  );

  return response.data;
};

// -----------------------------------------------------------------------------
// Favorite Outfit
// -----------------------------------------------------------------------------

export const toggleFavoriteOutfit = async (id) => {
  const response = await api.patch(
    `/outfits/${id}/favorite`,
    {},
    {
      headers: await getAuthHeaders(),
    },
  );

  return response.data;
};

// -----------------------------------------------------------------------------
// Duplicate Outfit
// -----------------------------------------------------------------------------

export const duplicateOutfit = async (id) => {
  const response = await api.post(
    `/outfits/${id}/duplicate`,
    {},
    {
      headers: await getAuthHeaders(),
    },
  );

  return response.data;
};

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

export const getFavoriteOutfits = async () => {
  const outfits = await getOutfits();
  return outfits.filter((o) => o.isFavorite);
};

export const getMostWornOutfits = async () => {
  const outfits = await getOutfits();
  return outfits.sort((a, b) => b.wearCount - a.wearCount);
};
