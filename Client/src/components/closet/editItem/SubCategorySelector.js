import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles/editItemStyles";
import COLORS from "../../../theme/colors";

export default function SubCategorySelector({
  category,
  subCategory,
  subCategories,
  onSelect,
  error,
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>
        Sub Category
        <Text style={error ? styles.required : styles.normalRequired}>
          {" *"}
        </Text>
      </Text>

      <View style={error && styles.errorWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {subCategories[category]?.map((item) => {
            const selected = subCategory === item;

            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.optionChip,
                  selected && styles.selectedOptionChip,
                ]}
                onPress={() => onSelect(item)}
              >
                <Ionicons
                  name={selected ? "checkmark-circle" : "ellipse-outline"}
                  size={16}
                  color={selected ? COLORS.primary : "#8B7B6A"}
                  style={styles.optionChipIcon}
                />

                <Text
                  style={[
                    styles.optionChipText,
                    selected && styles.selectedOptionChipText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {error && (
        <Text style={styles.errorText}>Please select a sub category.</Text>
      )}
    </View>
  );
}
