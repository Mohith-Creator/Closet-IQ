import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import BodyTypeSelector from "../../inputs/BodyTypeSelector";

import COLORS from "../../../../theme/colors";

export default function BodyTypeStep({ value, onChange }) {
  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.titleRow}>
        <View style={styles.headerIcon}>
          <Feather name="user" size={20} color={COLORS.primary} />
        </View>

        <Text style={styles.heading}>Choose your body type</Text>
      </View>

      <Text style={styles.description}>
        This helps us recommend better-fitting clothes and personalized outfits.
      </Text>

      {/* Selector */}

      <View style={styles.selectorContainer}>
        <BodyTypeSelector value={value} onChange={onChange} />
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

  headerIcon: {
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

  selectorContainer: {
    marginTop: 36,
  },
});
