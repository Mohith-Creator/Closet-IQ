import React from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const shirtOutline = require("../../../assets/outfitBuilder/shirt-outline.png");
const pantsOutline = require("../../../assets/outfitBuilder/pants-outline.png");
const shoesOutline = require("../../../assets/outfitBuilder/shoes-outline.png");
const watchOutline = require("../../../assets/outfitBuilder/watch-outline.png");

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

function SlotCard({ icon, label, filled, onPress }) {
  return (
    <TouchableOpacity
      style={styles.slotCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name={icon} size={24} color={COLORS.brown} />

      <Text style={styles.slotLabel}>{label}</Text>

      <View style={[styles.slotAction, filled && styles.slotSelected]}>
        <Ionicons
          name={filled ? "checkmark" : "add"}
          size={14}
          color={filled ? COLORS.white : COLORS.primary}
        />
      </View>
    </TouchableOpacity>
  );
}

export default function OutfitCanvas({
  outfit,
  selectedSlot,
  availableCount,
  onSelectSlot,
  onUndo,
}) {
  const selectedCount = [
    outfit.top,
    outfit.bottom,
    outfit.shoes,
    outfit.accessory,
  ].filter(Boolean).length;

  const isComplete = selectedCount === 4;
  const isEmpty =
    !outfit.top && !outfit.bottom && !outfit.shoes && !outfit.accessory;
 const getGuidance = () => {
   // User selected a category but closet is empty
   if (selectedSlot && availableCount === 0) {
     return {
       title: `No ${selectedSlot} Found`,
       sub: `Add ${selectedSlot.toLowerCase()} to your closet first`,
     };
   }

   if (!outfit.top) {
     return {
       title: "Start with a Top Wear",
       sub: "Select a shirt, t-shirt or hoodie",
     };
   }

   if (!outfit.bottom) {
     return {
       title: "Add a Bottom Wear",
       sub: "Choose jeans, trousers or shorts",
     };
   }

   if (!outfit.shoes) {
     return {
       title: "Almost there",
       sub: "Pick a pair of shoes",
     };
   }

   if (!outfit.accessory) {
     return {
       title: "Finish the look",
       sub: "Add a watch or accessory",
     };
   }

   return {
     title: "Outfit Complete",
     sub: "Ready to save or generate AI suggestions",
   };
 };

  const guidance = getGuidance();
  return (
    <View style={styles.card}>
      {/* Refresh */}

      <TouchableOpacity style={styles.refreshBtn} onPress={onUndo}>
        <Ionicons name="arrow-undo-outline" size={20} color={COLORS.brown} />
      </TouchableOpacity>

      {/* LEFT SLOTS */}

      <View style={styles.topSlot}>
        <SlotCard
          icon="shirt-outline"
          label="Top Wear"
          filled={!!outfit.top}
          onPress={() => onSelectSlot("Tops")}
        />
      </View>

      <View style={styles.bottomSlot}>
        <SlotCard
          icon="body-outline"
          label="Bottom Wear"
          filled={!!outfit.bottom}
          onPress={() => onSelectSlot("Bottoms")}
        />
      </View>

      <View style={styles.shoesSlot}>
        <SlotCard
          icon="footsteps-outline"
          label="Shoes"
          filled={!!outfit.shoes}
          onPress={() => onSelectSlot("Shoes")}
        />
      </View>

      {/* WATCH SLOT */}

      <View style={styles.watchSlot}>
        <SlotCard
          icon="watch-outline"
          label="Watch"
          filled={!!outfit.accessory}
          onPress={() => onSelectSlot("Accessories")}
        />
      </View>

      {/* DOTTED CONNECTORS */}

      <View style={styles.lineTop} />
      <View style={styles.lineBottom} />
      <View style={styles.lineShoes} />
      <View style={styles.lineWatchVertical} />
      <View style={styles.lineWatchHorizontal} />

      {/* DOTS */}

      <View style={styles.dotTop} />
      <View style={styles.dotBottom} />
      <View style={styles.dotShoes} />
      <View style={styles.dotWatch} />

      {/* OUTFIT PREVIEW */}

      <View style={styles.preview}>
        <>
          {/* Always visible outlines */}

          {!outfit.top && (
            <Image
              source={shirtOutline}
              style={styles.shirtOutline}
              resizeMode="contain"
            />
          )}

          {!outfit.bottom && (
            <Image
              source={pantsOutline}
              style={styles.pantsOutline}
              resizeMode="contain"
            />
          )}

          {!outfit.shoes && (
            <Image
              source={shoesOutline}
              style={styles.shoesOutline}
              resizeMode="contain"
            />
          )}

          {!outfit.accessory && (
            <Image
              source={watchOutline}
              style={styles.watchOutline}
              resizeMode="contain"
            />
          )}

          {/* Selected items overlay */}

          {outfit.bottom && (
            <Image
              source={{ uri: outfit.bottom.image }}
              style={styles.bottomImage}
              resizeMode="contain"
            />
          )}

          {outfit.top && (
            <Image
              source={{ uri: outfit.top.image }}
              style={styles.topImage}
              resizeMode="contain"
            />
          )}

          {outfit.shoes && (
            <Image
              source={{ uri: outfit.shoes.image }}
              style={styles.shoeImage}
              resizeMode="contain"
            />
          )}

          {outfit.accessory && (
            <Image
              source={{ uri: outfit.accessory.image }}
              style={styles.watchImage}
              resizeMode="contain"
            />
          )}
          {selectedCount > 0 && (
            <View style={styles.completionBadge}>
              <Text style={styles.completionText}>
                {isComplete
                  ? "✓ Complete Outfit Ready"
                  : `${selectedCount}/4 Items Selected`}
              </Text>
            </View>
          )}
          {guidance && !isComplete && (
            <>
              <Text style={styles.emptyTitle}>{guidance.title}</Text>

              <Text style={styles.emptySub}>{guidance.sub}</Text>
            </>
          )}
        </>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 460,
    marginBottom: 16,
    position: "relative",
    overflow: "hidden",
  },

  refreshBtn: {
    position: "absolute",
    top: 18,
    right: 18,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.card,
  },

  slotCard: {
    width: 70,
    height: 86,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    ...SHADOW.card,
  },

  slotLabel: {
    fontSize: 8,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },

  slotAction: {
    width: 20,
    height: 20,
    borderRadius: 11,
    backgroundColor: COLORS.card,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  slotSelected: {
    backgroundColor: COLORS.primaryDark,
  },

  topSlot: {
    position: "absolute",
    left: 12,
    top: 45, // was 100
  },

  bottomSlot: {
    position: "absolute",
    left: 12,
    top: 170, // was 225
  },

  shoesSlot: {
    position: "absolute",
    left: 12,
    top: 285, // was 340
  },

  watchSlot: {
    position: "absolute",
    right: 12,
    top: 175, // was 230
  },

  lineTop: {
    position: "absolute",
    left: 82,
    top: 87,
    width: 40,
    borderBottomWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.connector,
  },

  lineBottom: {
    position: "absolute",
    left: 82,
    top: 212,
    width: 40,
    borderBottomWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.connector,
  },

  lineShoes: {
    position: "absolute",
    left: 82,
    top: 327,
    width: 40,
    borderBottomWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.connector,
  },

  lineWatchVertical: {
    position: "absolute",
    right: 46,
    top: 269,
    height: 40,
    borderLeftWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.connector,
  },

  lineWatchHorizontal: {
    position: "absolute",
    right: 46,
    top: 309,
    width: 16,
    borderBottomWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.connector,
  },

  dotTop: {
    position: "absolute",
    left: 116,
    top: 83,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primaryDark,
  },

  dotBottom: {
    position: "absolute",
    left: 124,
    top: 208,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primaryDark,
  },

  dotShoes: {
    position: "absolute",
    left: 116,
    top: 323,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primaryDark,
  },

  dotWatch: {
    position: "absolute",
    right: 63,
    top: 305,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primaryDark,
  },

  shirtOutline: {
    position: "absolute",
    top: 20, // was 45
    width: 170,
    height: 135,
  },

  pantsOutline: {
    position: "absolute",
    top: 110, // was 140
    width: 125,
    height: 240,
  },

  shoesOutline: {
    position: "absolute",
    left: -2,
    top: 285, // was 315
    width: 135,
    height: 95,
  },

  watchOutline: {
    position: "absolute",
    right: -20,
    top: 270, // was 300
    width: 44,
    height: 75,
  },

  preview: {
    position: "absolute",
    left: 120,
    right: 90,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  topImage: {
    position: "absolute",
    top: 20,
    left: -18.25,
    width: 185,
    height: 185,
    zIndex: 2,
  },

  bottomImage: {
    position: "absolute",
    top: 145,
    left: 5,
    width: 140,
    height: 210,
    zIndex: 1,
  },

  shoeImage: {
    position: "absolute",
    top: 300,
    left: -15,
    width: 150,
    height: 80,
    zIndex: 3,
  },

  watchImage: {
    position: "absolute",
    top: 270,
    right: -18,
    width: 45,
    height: 75,

    zIndex: 4,
  },

  completionBadge: {
    position: "absolute",
    bottom: 48,
    backgroundColor: "#F6F1EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  completionText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primaryDark,
  },

  emptyTitle: {
    position: "absolute",
    bottom: 25,
    fontSize: 13,
    fontWeight: "700",
    width: 240,
    textAlign: "center",
    color: COLORS.text,
  },

  emptySub: {
    position: "absolute",
    bottom: 10,
    width: 260,
    textAlign: "center",
    fontSize: 9,
    color: COLORS.secondary,
  },
});