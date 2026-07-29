import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";

export default function UpcomingPlansEmpty({
  onCreatePlan,
  icon = "calendar-clear-outline",
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={34} color={COLORS.primary} />
      </View>

      <Text style={styles.title}>No upcoming outfit plans</Text>

      <Text style={styles.subtitle}>
        Plan your next look{"\n"}
        and stay prepared.
      </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={onCreatePlan}
      >
        <Ionicons name="add" size={18} color="#FFF" />

        <Text style={styles.buttonText}>Plan Outfit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    alignItems: "center",
  },

  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: 22,
  },

  button: {
    height: 46,
    paddingHorizontal: 22,
    borderRadius: 23,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
