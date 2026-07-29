import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";

import OutfitCardPreview from "../../outfits/OutfitCardPreview";

export default function OutfitListCard({ outfit, selected, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(outfit)}
      style={[styles.card, selected && styles.selectedCard]}
    >
      {selected && (
        <View style={styles.badge}>
          <Ionicons name="checkmark" size={16} color="#FFF" />
        </View>
      )}

      <OutfitCardPreview
        outfit={outfit}
        height={175}
        backgroundColor="#F7EBDD"
        style={styles.preview}
      />

      <Text numberOfLines={1} style={styles.name}>
        {outfit.name}
      </Text>

      <View style={styles.actionRow}>
        <Text
          style={[styles.actionText, selected && styles.selectedActionText]}
        >
          {selected ? "Selected" : "Tap to Select"}
        </Text>

        <Ionicons
          name={selected ? "checkmark" : "chevron-forward"}
          size={18}
          color={selected ? COLORS.primary : COLORS.secondary}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    marginBottom: 16,
    position: "relative",
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: "#FCF8F3",
  },

  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
    marginHorizontal: 14,
    marginTop: 2,
  },

  actionRow: {
    marginTop: 2,
    marginHorizontal: 14,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  actionText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.secondary,
  },

  selectedActionText: {
    color: COLORS.primary,
  },
});
