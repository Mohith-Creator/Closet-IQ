import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

export default function ClosetItemCard({
  item,
  onPress,
  onFavorite,
  viewMode = "grid",
}) {
  const getDate = () => {
    try {
      return formatDistanceToNowStrict(new Date(item.createdAt), {
        addSuffix: true,
      });
    } catch {
      return "";
    }
  };

  const getWearLabel = () => {
    const count = item.wearCount || 0;
    if (count === 0) {
      return "✨ Never Worn";
    }
    if (count === 1) {
      return "🔥 1 Wear";
    }
    return `🔥 ${count} Wears`;
  };
  
const imageUri =
  item.processedImage && item.processedImage !== "undefined"
    ? item.processedImage
    : item.image;
  if (viewMode === "list") {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.listCard}
        onPress={onPress}
      >
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.listImage}
        />

        <View style={styles.listContent}>
          <TouchableOpacity style={styles.listFavoriteBtn} onPress={onFavorite}>
            <Ionicons
              size={18}
              color={item.favorite ? "#E53935" : "#111111"}
              name={item.favorite ? "heart" : "heart-outline"}
            />
          </TouchableOpacity>

          <Text numberOfLines={1} style={styles.title}>
            {item.name}
          </Text>

          <Text numberOfLines={1} style={styles.meta}>
            {item.subCategory || "Item"}
            {" • "}
            {item.material || "N/A"}
            {" • "}
            {item.color || "N/A"}
          </Text>

          <Text style={styles.date}>Added {getDate()}</Text>

          <View
            style={[
              styles.listWearBadge,
              (item.wearCount || 0) === 0 && styles.neverWornBadge,
            ]}
          >
            <Text
              style={[
                styles.wearText,
                (item.wearCount || 0) === 0 && styles.neverWornText,
              ]}
            >
              {getWearLabel()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
      {/* Favorite */}

      <TouchableOpacity style={styles.favoriteBtn} onPress={onFavorite}>
        <Ionicons
          size={16}
          color={item.favorite ? "#E53935" : "#111111"}
          name={item.favorite ? "heart" : "heart-outline"}
        />
      </TouchableOpacity>

      {/* Image */}
      {item.aiDetected && (
        <View style={styles.aiBadge}>
          <Text style={styles.aiText}>AI</Text>
        </View>
      )}
      <Image source={{ uri: imageUri }} style={styles.image} />

      {/* Wear Badge */}

      <View
        style={[
          styles.wearBadge,
          (item.wearCount || 0) === 0 && styles.neverWornBadge,
        ]}
      >
        <Text
          style={[
            styles.wearText,
            (item.wearCount || 0) === 0 && styles.neverWornText,
          ]}
        >
          {getWearLabel()}
        </Text>
      </View>

      {/* Content */}

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {item.name}
        </Text>

        <Text numberOfLines={1} style={styles.meta}>
          {item.subCategory || "Item"}
          {" • "}
          {item.material || "Material"}
          {" • "}
          {item.color || "Color"}
        </Text>

        <Text style={styles.date}>Added {getDate()}</Text>

        <TouchableOpacity style={styles.menuBtn}>
          <Feather name="more-vertical" size={18} color="#8A8178" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: "hidden",
    margin: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  image: {
    width: "100%",
    height: 160,
    backgroundColor: COLORS.imagePlaceholder,
  },

  content: {
    padding: 14,
    position: "relative",
  },

  title: {
    marginTop: -6,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },

  meta: {
    marginTop: 5,
    fontSize: 10,
    color: COLORS.secondary,
  },

  date: {
    marginTop: 5,
    fontSize: 10,
    color: COLORS.secondary,
  },

  favoriteBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 20,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.whiteOverlay,
    justifyContent: "center",
    alignItems: "center",
  },

  aiBadge: {
    position: "absolute",
    left: 12,
    top: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    zIndex: 10,
  },

  aiText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
  },

  wearBadge: {
    position: "absolute",
    right: 8,
    top: 132,
    backgroundColor: COLORS.white,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  listWearBadge: {
    alignSelf: "flex-start",
    marginTop: 8,
    backgroundColor: COLORS.wearBadgeBg,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  wearText: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.primary,
  },

  neverWornBadge: {
    backgroundColor: COLORS.neverWornBg,
  },

  neverWornText: {
    color: COLORS.success,
  },

  menuBtn: {
    position: "absolute",
    right: 12,
    bottom: 12,
  },

  /* LIST MODE */

  listCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginBottom: 10,
    overflow: "hidden",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  listImage: {
    width: 120,
    height: 120,
  },

  listFavoriteBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },

  listContent: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 12,
    justifyContent: "center",
  },
});