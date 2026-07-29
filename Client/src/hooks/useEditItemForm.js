import { useState } from "react";

import {
  SUB_CATEGORIES,
  OCCASIONS,
  FIT_TYPES,
  SLEEVE_TYPES,
  TAG_GROUPS,
} from "../constants/closet/wardrobeConstants";

export default function useEditItemForm(route) {
  const defaultCategory = route?.params?.category || "Tops";
  const existingItem = route?.params?.itemData;
  const aiData = route?.params?.aiData;
  const isEditing = !!existingItem?._id;
 const processedImage =
   route?.params?.processedImage ??
   route?.params?.itemData?.processedImage ??
   null;

 const originalImage =
   route?.params?.originalImage ?? route?.params?.itemData?.image ?? null;
  const isManualCategoryLocked = !!route?.params?.category;
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showMaterialDropdown, setShowMaterialDropdown] = useState(false);
  const [errors, setErrors] = useState({
    image: false,
    name: false,
    category: false,
    subCategory: false,
    color: false,
    material: false,
    occasion: false,
  });

  const [formData, setFormData] = useState({
    name: existingItem?.name || aiData?.name || "",
    category: existingItem?.category || aiData?.category || defaultCategory,
    subCategory: existingItem?.subCategory || aiData?.subCategory || "",
    color:
      existingItem?.color ||
      aiData?.primaryColor ||
      aiData?.colors?.[0] ||
      "Black",
    material: existingItem?.material || aiData?.material || "Cotton",
    // Multi-select
    occasion: Array.isArray(existingItem?.occasion)
      ? existingItem.occasion
      : Array.isArray(aiData?.occasion)
        ? aiData.occasion
        : existingItem?.occasion
          ? [existingItem.occasion]
          : [],
    // Multi-select
    season: Array.isArray(existingItem?.season)
      ? existingItem.season
      : Array.isArray(aiData?.season)
        ? aiData.season
        : existingItem?.season
          ? [existingItem.season]
          : aiData?.season
            ? [aiData.season]
            : ["All Season"],

    fit: existingItem?.fit || aiData?.fit || "",
    sleeveType: existingItem?.sleeveType || aiData?.sleeveType || "",
    // New schema -> tags.styles
    tags:
      existingItem?.tags?.styles ??
      aiData?.tags?.styles ??
      existingItem?.tags ??
      aiData?.tags ??
      [],
    notes: existingItem?.notes || "",
  });

  const selectedSubCategory =
    formData.subCategory || SUB_CATEGORIES[formData.category]?.[0] || "";

  const availableOccasions = OCCASIONS[selectedSubCategory] || [];

  const availableFits = FIT_TYPES[selectedSubCategory] || [];

  const availableSleeves = SLEEVE_TYPES[selectedSubCategory] || [];

  const availableTagGroups = TAG_GROUPS[selectedSubCategory] || [];

  const clearError = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    clearError(field);
  };

  const handleCategoryChange = (category) => {
    const firstSubCategory = SUB_CATEGORIES[category]?.[0] || "";

    setFormData((prev) => ({
      ...prev,
      category,
      subCategory: firstSubCategory,
      occasion: [],
      season: ["All Season"],
      fit: "",
      sleeveType: "",
      tags: [],
    }));

    setShowCategoryDropdown(false);

    clearError("category");
    clearError("subCategory");
    clearError("occasion");
  };

  const handleSubCategoryChange = (subCategory) => {
    setFormData((prev) => ({
      ...prev,
      subCategory,
      occasion: [],
      material: "",
      fit: "",
      sleeveType: "",
      tags: [],
    }));

    clearError("subCategory");
    clearError("occasion");
    clearError("material");
  };

  const toggleOccasion = (occasion) => {
    setFormData((prev) => {
      const exists = prev.occasion.includes(occasion);

      const updatedOccasion = exists
        ? prev.occasion.filter((o) => o !== occasion)
        : [...prev.occasion, occasion];

      if (updatedOccasion.length > 0) {
        clearError("occasion");
      }

      return {
        ...prev,
        occasion: updatedOccasion,
      };
    });
  };

  const toggleTag = (tag) => {
    setFormData((prev) => {
      const exists = prev.tags.includes(tag);

      return {
        ...prev,
        tags: exists ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
      };
    });
  };

  return {
    defaultCategory,

    existingItem,

    processedImage,
    originalImage,
    isEditing,

    isManualCategoryLocked,

    showCategoryDropdown,
    setShowCategoryDropdown,

    showMaterialDropdown,
    setShowMaterialDropdown,

    errors,
    setErrors,

    formData,
    setFormData,

    selectedSubCategory,

    availableOccasions,

    availableFits,

    availableSleeves,

    availableTagGroups,

    clearError,

    updateField,

    handleCategoryChange,

    handleSubCategoryChange,

    toggleOccasion,

    toggleTag,
  };
}
