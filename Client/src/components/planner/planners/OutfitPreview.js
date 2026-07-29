import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";

export default function OutfitPreview({ outfit = {}, style }) {
  const isOutfitMissing = !outfit;
  const items = outfit?.items || [];

  const getItem = (category) =>
    items.find(
      (item) => item.category === category || item.category === `${category}s`,
    );

  const top = getItem("Top");
  const bottom = getItem("Bottom");
  const shoes = getItem("Shoes");
  const accessory = getItem("Accessory");

  const renderItem = (item, imageStyle) => {
    if (!item?.image) return null;

    return (
      <Image
        source={{ uri: item.image }}
        style={imageStyle}
        resizeMode="contain"
      />
    );
  };

  if (isOutfitMissing) {
    return (
      <View style={[styles.container, styles.emptyContainer, style]}>
        <View style={styles.warningCircle}>
          <Ionicons name="warning-outline" size={42} color={COLORS.warning} />
        </View>

        <Text style={styles.emptyTitle}>Outfit Removed</Text>

        <Text style={styles.emptySubtitle}>
          Choose another outfit to complete this plan.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {renderItem(top, styles.top)}

      {renderItem(bottom, styles.bottom)}

      {renderItem(shoes, styles.shoes)}

      {renderItem(accessory, styles.accessory)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 280,
    backgroundColor: COLORS.preview,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
  },

  top: {
    position: "absolute",
    left: 14,
    top: 12,
    width: 150,
    height: 150,
  },

  bottom: {
    position: "absolute",
    right: 12,
    top: 74,
    width: 130,
    height: 130,
  },

  shoes: {
    position: "absolute",
    left: 20,
    bottom: 16,
    width: 96,
    height: 96,
  },

  accessory: {
    position: "absolute",
    right: 22,
    bottom: 22,
    width: 44,
    height: 44,
  },

  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  warningCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: COLORS.warningLight,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },

  emptySubtitle: {
    marginTop: 10,
    textAlign: "center",
    color: COLORS.secondary,
    lineHeight: 22,
  },
});