import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";

export default function TimelineCard({ plan, onPress, onEdit, onDelete }) {
  const outfit = plan.outfit || {};
  const top = outfit.items?.find(
    (item) => item.category === "Top" || item.category === "Tops",
  );
  const bottom = outfit.items?.find(
    (item) => item.category === "Bottom" || item.category === "Bottoms",
  );
  const shoes = outfit.items?.find((item) => item.category === "Shoes");
  const accessory = outfit.items?.find(
    (item) => item.category === "Accessory" || item.category === "Accessories",
  );
  const renderItem = (item, style) => {
    if (!item?.image) return null;
    return (
      <Image source={{ uri: item.image }} style={style} resizeMode="contain" />
    );
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      {/* Preview */}

      <View style={styles.preview}>
        {renderItem(top, styles.top)}

        {renderItem(bottom, styles.bottom)}

        {renderItem(shoes, styles.shoes)}

        {accessory?.image && (
          <Image
            source={{ uri: accessory.image }}
            style={styles.accessory}
            resizeMode="contain"
          />
        )}
      </View>

      {/* Name */}

      <Text style={styles.name}>{outfit.name || "Untitled Outfit"}</Text>

      {/* Chips */}

      <View style={styles.chips}>
        {plan.occasion ? (
          <View style={styles.chip}>
            <Ionicons
              name="sparkles-outline"
              size={14}
              color={COLORS.primary}
            />

            <Text style={styles.chipText}>{plan.occasion}</Text>
          </View>
        ) : null}

        {plan.weather ? (
          <View style={styles.chip}>
            <Ionicons name="sunny-outline" size={14} color={COLORS.primary} />

            <Text style={styles.chipText}>{plan.weather}</Text>
          </View>
        ) : null}

        {plan.timeOfDay ? (
          <View style={styles.chip}>
            <Ionicons name="time-outline" size={14} color={COLORS.primary} />

            <Text style={styles.chipText}>{plan.timeOfDay}</Text>
          </View>
        ) : null}
      </View>

      {/* Notes */}

      {plan.notes ? (
        <>
          <Text style={styles.sectionTitle}>Notes</Text>

          <View style={styles.notesCard}>
            <Text style={styles.notes}>{plan.notes}</Text>
          </View>
        </>
      ) : null}

      {/* Reminder */}

      {plan.reminder?.enabled && (
        <View style={styles.reminder}>
          <Ionicons
            name="notifications-outline"
            size={18}
            color={COLORS.primary}
          />

          <Text style={styles.reminderText}>
            Reminder {plan.reminder.minutesBefore} min before
          </Text>
        </View>
      )}

      {/* Actions */}

      {(onEdit || onDelete) && (
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity style={styles.outlineButton} onPress={onEdit}>
              <Ionicons
                name="create-outline"
                size={18}
                color={COLORS.primary}
              />

              <Text style={styles.outlineText}>Edit</Text>
            </TouchableOpacity>
          )}

          {onDelete && (
            <TouchableOpacity style={styles.outlineButton} onPress={onDelete}>
              <Ionicons name="trash-outline" size={18} color="#C0392B" />

              <Text style={[styles.outlineText, { color: "#C0392B" }]}>
                Delete
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,

    borderRadius: 24,

    padding: 18,

    borderWidth: 1,

    borderColor: COLORS.border,
  },

  preview: {
    height: 260,

    backgroundColor: COLORS.preview,

    borderRadius: 22,

    position: "relative",

    overflow: "hidden",

    marginBottom: 18,
  },

  top: {
    position: "absolute",

    left: 12,

    top: 8,

    width: 145,

    height: 145,
  },

  bottom: {
    position: "absolute",

    right: 8,

    top: 70,

    width: 125,

    height: 125,
  },

  shoes: {
    position: "absolute",

    left: 20,

    bottom: 12,

    width: 95,

    height: 95,
  },

  accessory: {
    position: "absolute",

    right: 20,

    bottom: 20,

    width: 42,

    height: 42,
  },

  name: {
    fontSize: 22,

    fontWeight: "700",

    color: COLORS.text,

    marginBottom: 16,
  },

  chips: {
    flexDirection: "row",

    flexWrap: "wrap",

    marginBottom: 18,
  },

  chip: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#F8F4EF",

    borderRadius: 18,

    paddingHorizontal: 12,

    paddingVertical: 8,

    marginRight: 10,

    marginBottom: 10,
  },

  chipText: {
    marginLeft: 6,

    fontWeight: "600",

    color: COLORS.primary,
  },

  sectionTitle: {
    fontSize: 16,

    fontWeight: "700",

    color: COLORS.text,

    marginBottom: 8,
  },

  notesCard: {
    backgroundColor: "#F8F4EF",

    borderRadius: 16,

    padding: 14,

    marginBottom: 18,
  },

  notes: {
    color: COLORS.secondary,

    lineHeight: 22,

    fontSize: 14,
  },

  reminder: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 20,
  },

  reminderText: {
    marginLeft: 8,

    color: COLORS.primary,

    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 14,
  },

  outlineButton: {
    flex: 1,

    height: 48,

    borderRadius: 14,

    borderWidth: 1,

    borderColor: COLORS.border,

    justifyContent: "center",

    alignItems: "center",

    flexDirection: "row",

    marginHorizontal: 4,
  },

  outlineText: {
    marginLeft: 6,

    fontWeight: "700",

    color: COLORS.primary,
  },
});
