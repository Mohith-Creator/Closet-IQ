import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";

export default function StepHeader({
  title,
  subtitle,
  showBack = true,
  onBack,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {showBack ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.backButton}
            onPress={onBack}
          >
            <Feather name="arrow-left" size={22} color={COLORS.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <Text style={styles.title}>{title}</Text>
      </View>

      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 8,
  },

  headerRow: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  backButton: {
    position: "absolute",
    left: 0,
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },

  placeholder: {
    position: "absolute",
    left: 0,
    width: 42,
    height: 42,
  },

  title: {
    fontSize: 26,
    fontWeight: "500",
    letterSpacing: -0.5,
    color: COLORS.text,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.secondary,
  },
});
