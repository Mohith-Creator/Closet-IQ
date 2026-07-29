import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import ShoeSizePicker from "./ShoeSizePicker";

import COLORS from "../../../../theme/colors";

const UNITS = ["UK", "US", "EU"];

export default function ShoeSizeStep({
  value,
  unit = "UK",
  onChange,
  onUnitChange,
}) {
  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.titleRow}>
        <View style={styles.iconContainer}>
          <Feather name="shopping-bag" size={20} color={COLORS.primary} />
        </View>

        <Text style={styles.heading}>What's your shoe size?</Text>
      </View>

      <Text style={styles.description}>
        We'll recommend the best shoe size across different brands.
      </Text>

      {/* Picker */}

      <View style={styles.pickerContainer}>
        <ShoeSizePicker value={value} unit={unit} onChange={onChange} />
      </View>

      {/* Unit Toggle */}

      <View style={styles.unitContainer}>
        {UNITS.map((item) => {
          const selected = unit === item;

          return (
            <TouchableOpacity
              key={item}
              activeOpacity={0.85}
              onPress={() => onUnitChange(item)}
              style={[styles.unitButton, selected && styles.unitButtonSelected]}
            >
              <Text
                style={[styles.unitText, selected && styles.unitTextSelected]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F7EFE8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  heading: {
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.secondary,
  },

  pickerContainer: {
    marginTop: 90,
    alignItems: "center",
  },

  unitContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 30,
    backgroundColor: "#F7F3EF",
    borderRadius: 18,
    padding: 4,
  },

  unitButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
  },

  unitButtonSelected: {
    backgroundColor: COLORS.primary,
  },

  unitText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.secondary,
  },

  unitTextSelected: {
    color: COLORS.white,
  },
});
