import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FitPreferenceSelector from "../../inputs/FitPreferenceSelector";

import COLORS from "../../../../theme/colors";

export default function FitPreferenceStep({ value, onChange }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.headerIcon}>
          <MaterialCommunityIcons
            name="tshirt-crew-outline"
            size={22}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.heading}>Choose your preferred fit</Text>
      </View>

      <Text style={styles.description}>
        Choose your preferred fit. We'll recommend outfits and sizes that match.
      </Text>

      <View style={styles.selectorContainer}>
        <FitPreferenceSelector value={value} onChange={onChange} />
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
