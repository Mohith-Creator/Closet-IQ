import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  CAROUSEL_CARD_SIZE,
  CAROUSEL_IMAGE_SIZE,
  EMPTY_ICON_SIZE,
} from "../../constants/outfitBuilder/constants";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

export default function ClosetCarousel({
  items,
  selectedSlot,
  onViewAll,
  onSelectItem,
}) {
  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {selectedSlot ? `Available ${selectedSlot}` : "Available Items"}
          </Text>
        </View>

        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="cube-outline" size={26} color="#8A5A3A" />
          </View>

          <Text style={styles.emptyTitle}>
            No {selectedSlot || "Items"} Found
          </Text>

          <Text style={styles.emptyDescription}>
            Add items to your closet to start building outfits
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {selectedSlot ? `Available ${selectedSlot}` : "Available Items"}
        </Text>

        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={items}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => onSelectItem(item)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  viewAll: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },

  card: {
    width: CAROUSEL_CARD_SIZE,
    height: CAROUSEL_CARD_SIZE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.softBorder,
    borderRadius: 16,
    ...SHADOW.small,
  },

  image: {
    width: CAROUSEL_IMAGE_SIZE,
    height: CAROUSEL_IMAGE_SIZE,
  },

  emptyState: {
    paddingVertical: 24,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.softBorder,
    borderRadius: 20,
    ...SHADOW.small,
  },

  emptyIcon: {
    width: EMPTY_ICON_SIZE,
    height: EMPTY_ICON_SIZE,
    borderRadius: EMPTY_ICON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: COLORS.background,
  },

  emptyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },

  emptyDescription: {
    marginTop: 4,
    fontSize: 12,
    textAlign: "center",
    color: COLORS.textLight,
  },
});