import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import { Feather } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";
import SHADOW from "../../../theme/shadows";

export default function StepNavigation({ primaryLabel = "Continue", onNext, onSkip }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.button}
        onPress={onNext}
      >
        <Text style={styles.buttonText}>{primaryLabel}</Text>
        <Feather name="arrow-right" size={18} color={COLORS.white} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={onSkip}>
        <Text style={styles.skip}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 12,
  },

  button: {
    height: 58,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.medium,
  },

  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.white,
    marginRight: 8,
  },

  skip: {
    marginTop: 18,
    marginBottom: 14,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.secondary,
  },
});
