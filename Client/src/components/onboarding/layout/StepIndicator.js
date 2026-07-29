import React from "react";
import { View, StyleSheet } from "react-native";

import COLORS from "../../../theme/colors";

export default function StepIndicator({ currentStep, totalSteps }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const active = index < currentStep;

        return (
          <View key={index} style={[styles.bar, active && styles.activeBar]} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    marginBottom: 32,
  },

  bar: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: COLORS.border,
  },

  activeBar: {
    backgroundColor: COLORS.primary,
  },
});
