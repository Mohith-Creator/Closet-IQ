import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles/editItemStyles";
import COLORS from "../../../theme/colors";
import { CATEGORY_ICONS } from "../../../constants/closet/categoryIcons";
export default function CategorySelector({
  category,
  categories,
  showDropdown,
  setShowDropdown,
  onCategoryChange,
  error,
  locked,
}) {
  const CategoryIcon = CATEGORY_ICONS[category]?.lib || Ionicons;
  return (
    <View style={styles.section}>
      <Text style={styles.label}>
        Category
        <Text style={error ? styles.required : styles.normalRequired}>
          {" *"}
        </Text>
      </Text>

      <TouchableOpacity
        style={[
          styles.dropdown,
          error && styles.errorBorder,
          locked && {
            backgroundColor: "#F1E7DC",
          },
        ]}
        disabled={locked}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <View style={styles.dropdownLeft}>
          <CategoryIcon
            name={CATEGORY_ICONS[category]?.name}
            size={20}
            color={locked ? "#927E69" : COLORS.primary}
            style={styles.dropdownIcon}
          />

          <Text style={styles.dropdownText}>{category}</Text>
        </View>

          <Ionicons
            name={showDropdown ? "chevron-up" : "chevron-down"}
            size={18}
            color={locked ? "#927E69" : "#9A8C7E"}
          />
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownMenu}>
          {categories.map((item) => {
            const Icon = CATEGORY_ICONS[item]?.lib || Ionicons;

            return (
              <TouchableOpacity
                key={item}
                style={styles.dropdownItem}
                onPress={() => onCategoryChange(item)}
              >
                <View style={styles.dropdownLeft}>
                  <Icon
                    name={CATEGORY_ICONS[item]?.name}
                    size={18}
                    color={COLORS.primary}
                    style={styles.dropdownIcon}
                  />

                  <Text style={styles.dropdownItemText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {error && <Text style={styles.errorText}>Please select a category.</Text>}
    </View>
  );
}
