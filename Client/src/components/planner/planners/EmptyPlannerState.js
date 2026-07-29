import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";

export default function EmptyPlannerState({ onCreatePlan }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="calendar-clear-outline"
          size={64}
          color={COLORS.primary}
        />

        <View style={styles.sparkle}>
          <Ionicons name="sparkles" size={18} color="#F5B041" />
        </View>
      </View>

      <Text style={styles.title}>No outfit plans yet</Text>

      <Text style={styles.subtitle}>
        Plan your outfits ahead and never wonder
        {"\n"}
        what to wear every day.
      </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => onCreatePlan()}
      >
        <Ionicons name="add" size={20} color="#FFF" />

        <Text style={styles.buttonText}>Plan Outfit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },

  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F9F4EF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },

  sparkle: {
    position: "absolute",
    top: 24,
    right: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: 42,
  },

  button: {
    width: "100%",
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.primary,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
