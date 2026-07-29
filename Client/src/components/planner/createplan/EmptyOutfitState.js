import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";
import { EMPTY_OUTFIT } from "../../../constants/planner/plannerConstants";

export default function EmptyOutfitState({ onCreateOutfit }) {
  return (
    <View style={styles.container}>
      {/* Illustration */}

      <View style={styles.iconContainer}>
        <Ionicons name="shirt-outline" size={58} color={COLORS.primary} />
      </View>

      {/* Title */}

      <Text style={styles.title}>{EMPTY_OUTFIT.title}</Text>

      {/* Description */}

      <Text style={styles.description}>{EMPTY_OUTFIT.description}</Text>

      {/* Button */}

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.button}
        onPress={() => onCreateOutfit()}
      >
        <Ionicons name="add-circle-outline" size={20} color={COLORS.white} />

        <Text style={styles.buttonText}>{EMPTY_OUTFIT.buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#F5ECE2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
    textAlign: "center",
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: 28,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 22,
    height: 50,
    borderRadius: 16,
    minWidth: 180,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },
});
