import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";

const COLOR_OPTIONS = [
  { name: "Black", color: "#1F1F1F" },
  { name: "White", color: "#FFFFFF" },
  { name: "Gray", color: "#9CA3AF" },
  { name: "Blue", color: "#3B82F6" },
  { name: "Navy", color: "#1E3A8A" },
  { name: "Green", color: "#22C55E" },
  { name: "Olive", color: "#708238" },
  { name: "Yellow", color: "#FACC15" },
  { name: "Orange", color: "#F97316" },
  { name: "Red", color: "#EF4444" },
  { name: "Pink", color: "#EC4899" },
  { name: "Brown", color: "#8B5E3C" },
];

export default function ColorSelector({ value = [], onChange }) {
  const toggleColor = (name) => {
    if (value.includes(name)) {
      onChange(value.filter((item) => item !== name));
      return;
    }

    if (value.length >= 8) return;

    onChange([...value, name]);
  };

  return (
    <View style={styles.container}>
      {COLOR_OPTIONS.map((item) => {
        const active = value.includes(item.name);

        return (
          <TouchableOpacity
            key={item.name}
            activeOpacity={0.85}
            onPress={() => toggleColor(item.name)}
            style={[styles.item, active && styles.activeItem]}
          >
            <View
              style={[
                styles.colorCircle,
                { backgroundColor: item.color },
                item.name === "White" && styles.whiteColor,
                active && styles.activeCircle,
              ]}
            >
              {active && (
                <Feather
                  name="check"
                  size={20}
                  color={
                    item.name === "White" || item.name === "Yellow"
                      ? COLORS.text
                      : COLORS.white
                  }
                />
              )}
            </View>

            <Text style={[styles.label, active && styles.activeLabel]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  item: {
    width: "31%",
    height: 130,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  activeItem: {
    backgroundColor: "#FFF8F4",
    borderColor: COLORS.primary,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },

  colorCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },

  whiteColor: {
    borderColor: "#E5E7EB",
  },

  activeCircle: {
    borderColor: COLORS.primary,
    borderWidth: 3,
    transform: [{ scale: 1.08 }],
  },

  label: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },

  activeLabel: {
    color: COLORS.primary,
  },
});