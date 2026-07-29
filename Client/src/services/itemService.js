import api from "./api";
import { getAuthHeaders } from "./authHeaders";

// -----------------------------------------------------------------------------
// Create Wardrobe Item
// -----------------------------------------------------------------------------

export const createItem = async (itemData) => {
  const formData = new FormData();

  formData.append("name", itemData.name);
  formData.append("category", itemData.category);
  formData.append("subCategory", itemData.subCategory);
  formData.append("color", itemData.color);
  formData.append("material", itemData.material);

  formData.append("occasion", JSON.stringify(itemData.occasion || []));
  formData.append("tags", JSON.stringify(itemData.tags || []));

  formData.append("season", JSON.stringify(itemData.season || []));
  formData.append("fit", itemData.fit || "");
  formData.append("sleeveType", itemData.sleeveType || "");

  formData.append("notes", itemData.notes || "");

  if (itemData.image) {
    formData.append("image", {
      uri: itemData.image,
      type: "image/jpeg",
      name: "item.jpg",
    });
  }

  const response = await api.post("/items", formData, {
    headers: await getAuthHeaders(true),
  });

  return response.data;
};

// -----------------------------------------------------------------------------
// Get Wardrobe Items
// -----------------------------------------------------------------------------

export const getItems = async () => {
  const response = await api.get("/items", {
    headers: await getAuthHeaders(),
  });

  return response.data;
};

// -----------------------------------------------------------------------------
// Toggle Favorite
// -----------------------------------------------------------------------------

export const toggleFavorite = async (id) => {
  const response = await api.patch(
    `/items/${id}/favorite`,
    {},
    {
      headers: await getAuthHeaders(),
    },
  );

  return response.data;
};

// -----------------------------------------------------------------------------
// Delete Item
// -----------------------------------------------------------------------------

export const deleteItem = async (id) => {
  const response = await api.delete(`/items/${id}`, {
    headers: await getAuthHeaders(),
  });

  return response.data;
};

// -----------------------------------------------------------------------------
// Update Item
// -----------------------------------------------------------------------------

export const updateItem = async (id, itemData) => {
  const formData = new FormData();

  formData.append("name", itemData.name);
  formData.append("category", itemData.category);
  formData.append("subCategory", itemData.subCategory);
  formData.append("color", itemData.color);
  formData.append("material", itemData.material);

  formData.append("occasion", JSON.stringify(itemData.occasion || []));
  const tags = Array.isArray(itemData.tags)
    ? {
        styles: itemData.tags,
        colors: [],
        features: [],
      }
    : itemData.tags;

  formData.append("tags", JSON.stringify(tags));

  formData.append("season", JSON.stringify(itemData.season || []));
  formData.append("fit", itemData.fit || "");
  formData.append("sleeveType", itemData.sleeveType || "");

  formData.append("notes", itemData.notes || "");

  if (itemData.processedImage) {
    formData.append("processedImage", itemData.processedImage);
  }

  if (itemData.originalImage) {
    formData.append("originalImage", itemData.originalImage);
  }

  if (
    itemData.image &&
    typeof itemData.image === "string" &&
    itemData.image.startsWith("file://")
  ) {
    formData.append("image", {
      uri: itemData.image,
      type: "image/jpeg",
      name: "item.jpg",
    });
  }

  const response = await api.put(`/items/${id}`, formData, {
    headers: await getAuthHeaders(true),
  });

  return response.data;
};

// -----------------------------------------------------------------------------
// AI Clothing Analysis
// -----------------------------------------------------------------------------

export const analyzeItem = async (imageUri) => {
  const formData = new FormData();

  formData.append("image", {
    uri: imageUri,
    type: "image/jpeg",
    name: "item.jpg",
  });

  const response = await api.post("/items/analyze", formData, {
    headers: await getAuthHeaders(true),
  });

  return response.data;
};
