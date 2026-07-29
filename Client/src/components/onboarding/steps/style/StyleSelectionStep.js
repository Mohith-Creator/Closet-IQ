import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

import StyleGridSelector from "../../inputs/StyleGridSelector";

import COLORS from "../../../../theme/colors";

export default function StyleSelectionStep({ value, onChange }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.titleRow}>
        <View style={styles.headerIcon}>
          <Feather name="star" size={20} color={COLORS.primary} />
        </View>

        <Text style={styles.heading}>Choose your style</Text>
      </View>

      <Text style={styles.description}>
        Select up to five styles that best match your everyday wardrobe.
      </Text>
      <View style={styles.selectorContainer}>
        <StyleGridSelector value={value} onChange={onChange} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingBottom: 24,
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
