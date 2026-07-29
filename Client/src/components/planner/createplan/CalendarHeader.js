import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";
import { MONTHS } from "../../../constants/planner/plannerConstants";

export default function CalendarHeader({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  disablePrevious,
}) {
  const month = MONTHS[currentMonth.getMonth()];
  const year = currentMonth.getFullYear();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.arrowButton, disablePrevious && styles.disabledButton]}
        activeOpacity={0.8}
        disabled={disablePrevious}
        onPress={onPreviousMonth}
      >
        <Ionicons
          name="chevron-back"
          size={20}
          color={disablePrevious ? COLORS.muted : COLORS.primary}
        />
      </TouchableOpacity>

      <Text style={styles.monthText}>
        {month} {year}
      </Text>

      <TouchableOpacity
        style={styles.arrowButton}
        activeOpacity={0.8}
        onPress={onNextMonth}
      >
        <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  arrowButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  disabledButton: {
    opacity: 0.5,
  },

  monthText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: 0.3,
  },
});
