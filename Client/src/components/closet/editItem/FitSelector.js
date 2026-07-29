import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles/editItemStyles";
import COLORS from "../../../theme/colors";

export default function FitSelector({ fits, value, updateField }) {
  if (!fits.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.label}>Fit</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: 20,
        }}
      >
        {fits.map((item) => {
          const selected = value === item;

          return (
            <TouchableOpacity
              key={item}
              style={[styles.optionChip, selected && styles.selectedOptionChip]}
              onPress={() => updateField("fit", item)}
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
  );
}
