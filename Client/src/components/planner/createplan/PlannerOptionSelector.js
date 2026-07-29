import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../../theme/colors";

export default function PlannerOptionSelector({
  title,
  options,
  selected,
  onSelect,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isSelected = selected === option.id;

          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.85}
              onPress={() => onSelect(option.id)}
              style={[styles.option, isSelected && styles.selectedOption]}
            >
              <Ionicons
                name={option.icon}
                size={16}
                color={isSelected ? COLORS.white : COLORS.primary}
              />

              <Text
                numberOfLines={1}
                style={[styles.optionText, isSelected && styles.selectedText]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 14,
  },

  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  option: {
    width: "31.5%",
    height: 46,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    paddingHorizontal: 6,
  },

  selectedOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  optionText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },

  selectedText: {
    color: COLORS.white,
  },
});
