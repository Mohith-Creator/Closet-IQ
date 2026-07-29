import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  CATEGORIES,
  SUB_CATEGORIES,
} from "../../constants/closet/wardrobeConstants";
import COLORS from "../../theme/colors";
import styles from "../../styles/editItemStyles";
import useEditItemForm from "../../hooks/useEditItemForm";

import StyleTags from "../../components/closet/editItem/StyleTags";
import NotesInput from "../../components/closet/editItem/NotesInput";
import FitSelector from "../../components/closet/editItem/FitSelector";
import SaveButtons from "../../components/closet/editItem/SaveButtons";
import ImageUploader from "../../components/closet/editItem/ImageUploader";
import ItemNameInput from "../../components/closet/editItem/ItemNameInput";
import ColorSelector from "../../components/closet/editItem/ColorSelector";
import SeasonSelector from "../../components/closet/editItem/SeasonSelector";
import SleeveSelector from "../../components/closet/editItem/SleeveSelector";
import CategorySelector from "../../components/closet/editItem/CategorySelector";
import MaterialSelector from "../../components/closet/editItem/MaterialSelector";
import OccasionSelector from "../../components/closet/editItem/OccasionSelector";
import SubCategorySelector from "../../components/closet/editItem/SubCategorySelector";

import { createItem, updateItem, deleteItem } from "../../services/itemService";

export default function EditItemDetailsScreen({ navigation, route }) {
  const [image, setImage] = useState(
    route?.params?.itemData?.processedImage ||
      route?.params?.processedImage ||
      route?.params?.itemData?.image ||
      route?.params?.image ||
      null,
  );

  // Keep track of the original file separately
  const [originalImage, setOriginalImage] = useState(
    route?.params?.itemData?.image ||
      route?.params?.originalImage ||
      route?.params?.image ||
      null,
  );
  const {
    existingItem,
    processedImage,
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
    toggleOccasion,
    toggleTag,
    handleSubCategoryChange,
  } = useEditItemForm(route);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow gallery access.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setOriginalImage(result.assets[0].uri);
      setImage(result.assets[0].uri); // Preview until processed version is available
      clearError("image");
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const itemPayload = {
        ...formData,
        subCategory: selectedSubCategory,
        season: Array.isArray(formData.season)
          ? formData.season
          : formData.season
            ? [formData.season]
            : [],

        tags: {
          styles: formData.tags ?? [],
          colors: [],
          features: [],
        },

        image: originalImage,

        // Existing processed image when editing
        processedImage,

        // Existing original image when editing
        originalImage,
      };

      if (isEditing) {
        await updateItem(existingItem._id, itemPayload);

        Alert.alert("Success", "Item Updated Successfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Closet"),
          },
        ]);
      } else {
        await createItem(itemPayload);

        Alert.alert("Success", "Item Added Successfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Closet"),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Operation Failed");
    }
  };

  const validateForm = () => {
    const validationErrors = {
      image: !image,
      name: !formData.name.trim(),
      category: !formData.category,
      subCategory: !formData.subCategory,
      color: !formData.color,
      material: !formData.material,
      occasion: formData.occasion.length === 0,
      season: formData.season.length === 0,
    };

    setErrors(validationErrors);

    return !Object.values(validationErrors).some(Boolean);
  };

  const handleDelete = async () => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteItem(existingItem._id);

            Alert.alert("Deleted", "Item deleted successfully", [
              {
                text: "OK",
                onPress: () => navigation.navigate("Closet"),
              },
            ]);
          } catch (error) {
            Alert.alert("Error", "Failed to delete item");
          }
        },
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#111" />
          </TouchableOpacity>

          <Text style={styles.title}>
            {isEditing ? "Edit Item" : "Item Details"}
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* IMAGE */}

        <ImageUploader
          image={image}
          error={errors.image}
          pickImage={pickImage}
          COLORS={COLORS}
        />

        {/* NAME */}

        <ItemNameInput
          value={formData.name}
          error={errors.name}
          onChange={(text) => updateField("name", text)}
        />

        {/* CATEGORY */}

        <CategorySelector
          category={formData.category}
          categories={CATEGORIES}
          showDropdown={showCategoryDropdown}
          setShowDropdown={setShowCategoryDropdown}
          onCategoryChange={handleCategoryChange}
          error={errors.category}
          locked={isManualCategoryLocked}
        />

        {/* SUB CATEGORY */}

        <SubCategorySelector
          category={formData.category}
          subCategory={formData.subCategory}
          subCategories={SUB_CATEGORIES}
          error={errors.subCategory}
          onSelect={handleSubCategoryChange}
        />

        {/* COLOR */}

        <ColorSelector
          value={formData.color}
          error={errors.color}
          updateField={updateField}
        />

        {/* MATERIAL */}

        <MaterialSelector
          subCategory={formData.subCategory}
          value={formData.material}
          error={errors.material}
          showDropdown={showMaterialDropdown}
          setShowDropdown={setShowMaterialDropdown}
          updateField={updateField}
          clearError={clearError}
        />

        {/* OCCASION */}

        <OccasionSelector
          occasions={availableOccasions}
          selected={formData.occasion}
          error={errors.occasion}
          toggleOccasion={toggleOccasion}
        />

        {/* Season */}

        <SeasonSelector value={formData.season} updateField={updateField} />

        {/* FIT */}

        <FitSelector
          fits={availableFits}
          value={formData.fit}
          updateField={updateField}
        />

        {/* SLEEVE TYPE */}

        <SleeveSelector
          sleeves={availableSleeves}
          value={formData.sleeveType}
          updateField={updateField}
        />

        {/* STYLE TAGS */}

        <StyleTags
          groups={availableTagGroups}
          selectedStyles={formData.tags}
          toggleStyle={toggleTag}
        />

        {/* NOTES */}

        <NotesInput value={formData.notes} updateField={updateField} />

        {/* BUTTON */}

        <SaveButtons
          isEditing={isEditing}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
