import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

import ActionSheet from "../common/ActionSheet";
import ConfirmationModal from "../common/ConfirmationModal";
import OutfitCardPreview from "../outfits/OutfitCardPreview";

import {
  toggleFavoriteOutfit,
  duplicateOutfit,
  wearOutfit,
  getOutfitDeleteInfo,
} from "../../services/outfitService";

export default function SavedOutfitCard({
  item,
  selectionMode,
  selectedOutfits,
  toggleSelect,
  onLongPress,
  handleDelete,
  navigation,
  onRefresh,
  onPress,
  onSuccess,
  replacingOutfit,
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [plansAffected, setPlansAffected] = useState(0);
  const handleFavorite = async () => {
    try {
      await toggleFavoriteOutfit(item._id);

      if (onRefresh) {
        onRefresh();
      }
      onSuccess?.({
        message: item.isFavorite
          ? "Removed from favorites"
          : "Added to favorites",
        icon: item.isFavorite ? "heart-dislike-outline" : "heart",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDuplicate = async () => {
    try {
      await duplicateOutfit(item._id);

      if (onRefresh) {
        onRefresh();
      }
      onSuccess?.({
        message: "Outfit duplicated",
        icon: "copy-outline",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleWear = async () => {
    try {
      await wearOutfit(item._id);

      if (onRefresh) {
        onRefresh();
      }
      onSuccess?.({
        message: "Usage stats updated",
        icon: "walk-outline",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePress = async () => {
    try {
      const info = await getOutfitDeleteInfo(item._id);

      setPlansAffected(info.plansAffected);

      setDeleteMessage(
        info.plansAffected > 0
          ? `This outfit is currently used in ${
              info.plansAffected
            } plan${info.plansAffected > 1 ? "s" : ""}.

Deleting it won't remove those plans.

You'll be able to replace the outfit later from the Planner.`
          : "Are you sure you want to delete this outfit?",
      );

      setDeleteVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = () => {
    setDeleteVisible(false);

    handleDelete(item._id);
  };

  const isSelected = selectedOutfits.includes(item._id);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={replacingOutfit}
      delayLongPress={300}
      onLongPress={() => {
        if (!selectionMode) {
          onLongPress?.();
        }
      }}
      onPress={() => {
        if (selectionMode) {
          toggleSelect(item._id);
          return;
        }

        onPress?.();
      }}
      style={[styles.outfitCard, isSelected && styles.selectedCard]}
    >
      {/* Selection Checkbox */}

      {selectionMode && (
        <View style={styles.checkbox}>
          <Ionicons
            name={isSelected ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={COLORS.primary}
          />
        </View>
      )}

      {/* Preview Container */}

      <View style={styles.previewContainer}>
        <OutfitCardPreview
          outfit={item}
          height={175}
          backgroundColor="#F7EBDD"
          style={styles.preview}
        />

        {item.isDuplicate && (
          <View style={styles.copyBadge}>
            <Ionicons name="copy-outline" size={15} color="#8B5E34" />
          </View>
        )}
      </View>

      {/* Title Row */}

      <View style={styles.titleRow}>
        <Text numberOfLines={1} style={styles.outfitName}>
          {item.name}
        </Text>
        {!selectionMode && (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setMenuVisible(true)}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color={COLORS.secondary}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.bottomRow}>
        <Text numberOfLines={1} style={styles.metaText}>
          {item.occasion || "Casual"} {" • "}
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
      </View>

      <ActionSheet
        visible={menuVisible}
        title="Outfit Options"
        onClose={() => setMenuVisible(false)}
        options={[
          {
            key: "favorite",
            label: item.isFavorite
              ? "Remove from Favorites"
              : "Add to Favorites",
            icon: item.isFavorite ? "heart-dislike-outline" : "heart-outline",
            onPress: handleFavorite,
          },

          {
            key: "edit",
            label: "Edit Outfit",
            icon: "create-outline",
            onPress: () =>
              navigation.navigate("Outfits", {
                editMode: true,
                outfit: item,
              }),
          },

          {
            key: "plan",
            label: "Create Plan",
            icon: "calendar-outline",
            onPress: () =>
              navigation.navigate("CreatePlan", {
                outfit: item,
              }),
          },

          {
            key: "wear",
            label: "Mark as Worn",
            icon: "walk-outline",
            onPress: handleWear,
          },

          {
            key: "duplicate",
            label: "Duplicate Outfit",
            icon: "copy-outline",
            onPress: handleDuplicate,
          },

          {
            key: "delete",
            label: "Delete Outfit",
            icon: "trash-outline",
            color: "#C0392B",
            onPress: handleDeletePress,
          },
        ]}
      />
      <ConfirmationModal
        visible={deleteVisible}
        title={
          plansAffected > 0 ? "Delete Outfit Used in Plans?" : "Delete Outfit?"
        }
        message={deleteMessage}
        icon="trash-outline"
        destructive
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setDeleteVisible(false)}
        onConfirm={confirmDelete}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outfitCard: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    marginBottom: 16,
    position: "relative",
    ...SHADOW.card,
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.selectedCardBg,
  },

  checkbox: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 999,
  },

  previewContainer: {
    position: "relative",
  },

  preview: {
    margin: 5,
  },

  copyBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.copyBadgeBg,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },

  titleRow: {
    marginTop: 8,
    marginHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  outfitName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginRight: 8,
  },

  bottomRow: {
    marginTop: 4,
    marginHorizontal: 14,
    marginBottom: 12,
  },

  metaText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.secondary,
  },

  separator: {
    color: COLORS.secondary,
  },
});
