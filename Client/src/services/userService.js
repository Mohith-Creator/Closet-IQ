import api from "./api";
import { getAuthHeaders } from "./authHeaders";

// ==============================
// Profile
// ==============================

export const getMyProfile = async () => {
  const headers = await getAuthHeaders();

  const { data } = await api.get("/users/me", {
    headers,
  });

  return data;
};

export const updateProfile = async ({ name, username, gender }) => {
  const headers = await getAuthHeaders();
  const { data } = await api.put(
    "/users/profile",
    {
      name,
      username,
      gender,
    },
    {
      headers,
    },
  );
  return data;
};

// ==============================
// Preferences
// ==============================

export const updatePreferences = async ({
  styles,
  fitPreference,
  favoriteColors,
}) => {
  const headers = await getAuthHeaders();

  const { data } = await api.put(
    "/users/preferences",
    {
      styles,
      fitPreference,
      favoriteColors,
    },
    {
      headers,
    },
  );

  return data;
};

// ==============================
// Measurements
// ==============================

export const updateMeasurements = async ({ measurements }) => {
  const headers = await getAuthHeaders();
  const { data } = await api.put(
    "/users/measurements",
    { measurements },
    {
      headers,
    },
  );
  return data;
};

// ==============================
// Avatar
// ==============================

export const updateAvatar = async (image) => {
  const headers = await getAuthHeaders();

  const formData = new FormData();

  formData.append("avatar", {
    uri: image.uri,
    type: image.mimeType || image.type || "image/jpeg",
    name: image.fileName || image.name || "avatar.jpg",
  });

  const { data } = await api.put("/users/avatar", formData, {
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// ==============================
// Onboarding
// ==============================

export const finishOnboarding = async () => {
  const headers = await getAuthHeaders();

  const { data } = await api.patch(
    "/users/onboarding",
    {},
    {
      headers,
    },
  );

  return data;
};
