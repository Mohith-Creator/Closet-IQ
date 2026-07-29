import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

import ColorSelector from "../../inputs/ColorSelector";

import COLORS from "../../../../theme/colors";

export default function FavoriteColorsStep({ value, onChange }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.headerIcon}>
          <Feather name="droplet" size={20} color={COLORS.primary} />
        </View>

        <Text style={styles.heading}>Favorite colors</Text>
      </View>

      <Text style={styles.description}>
        Select up to 8 favorite colors for personalized outfit recommendations.
      </Text>
      <ScrollView
        style={styles.selectorContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ColorSelector value={value} onChange={onChange} />
      </ScrollView>
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
    marginTop: 30,
  },
});
