import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../theme/colors";

export default function AIEmptyState() {
  return (
    <View style={styles.container}>
      <Ionicons name="sparkles-outline" size={60} color={COLORS.secondary} />

      <Text style={styles.title}>No AI Suggestions Yet</Text>

      <Text style={styles.subtitle}>
        Add more clothes to your closet and we'll generate outfits for you.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 40,
  },

  title: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 8,
    textAlign: "center",
    color: COLORS.secondary,
  },
});
