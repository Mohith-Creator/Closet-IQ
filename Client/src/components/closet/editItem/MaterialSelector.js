import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "../../../styles/editItemStyles";
import COLORS from "../../../theme/colors";

import { MATERIALS } from "../../../constants/closet/wardrobeConstants";
import { MATERIAL_ICONS } from "../../../constants/closet/materialIcons";

export default function MaterialSelector({
  subCategory,
  value,
  error,
  showDropdown,
  setShowDropdown,
  updateField,
  clearError,
}) {
  const materials = MATERIALS[subCategory] || [];

  if (!materials.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.label}>
        Material
        <Text style={error ? styles.required : styles.normalRequired}>
          {" *"}
        </Text>
      </Text>

      <TouchableOpacity
        style={[styles.dropdown, error && styles.errorBorder]}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <View style={styles.dropdownLeft}>
          <MaterialCommunityIcons
            name={MATERIAL_ICONS[value] || "help-circle-outline"}
            size={20}
            color={COLORS.primary}
            style={styles.dropdownIcon}
          />

          <Text style={styles.dropdownText}>{value || "Select Material"}</Text>
        </View>

        <Ionicons
          name={showDropdown ? "chevron-up" : "chevron-down"}
          size={18}
          color="#777"
        />
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownMenu}>
          {materials.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                updateField("material", item);
                clearError("material");
                setShowDropdown(false);
              }}
            >
              <View style={styles.dropdownLeft}>
                <MaterialCommunityIcons
                  name={MATERIAL_ICONS[item] || "help-circle-outline"}
                  size={18}
                  color={COLORS.primary}
                  style={styles.dropdownIcon}
                />

                <Text style={styles.dropdownItemText}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {error && <Text style={styles.errorText}>Please select a material.</Text>}
    </View>
  );
}
