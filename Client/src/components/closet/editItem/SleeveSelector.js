import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles/editItemStyles";
import COLORS from "../../../theme/colors";

export default function SleeveSelector({ sleeves, value, updateField }) {
  if (!sleeves.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.label}>Sleeve Type</Text>

      <View style={styles.wrap}>
        {sleeves.map((item) => {
          const selected = value === item;

          return (
            <TouchableOpacity
              key={item}
              style={[styles.optionChip, selected && styles.selectedOptionChip]}
              onPress={() => updateField("sleeveType", item)}
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
      </View>
    </View>
  );
}
