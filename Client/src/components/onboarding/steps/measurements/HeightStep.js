import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import HeightPicker from "./HeightPicker";

import COLORS from "../../../../theme/colors";

export default function HeightStep({
  value,
  unit = "cm",
  onChange,
  onUnitChange,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.icon}>
          <Feather name="maximize-2" size={20} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>What's your height?</Text>
      </View>
      <Text style={styles.subtitle}>
        We'll use your height to recommend better fitting outfits.
      </Text>
      <HeightPicker value={value} unit={unit} onChange={onChange} />
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

  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F7EFE8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.secondary,
    marginBottom: 40,
  },
});
