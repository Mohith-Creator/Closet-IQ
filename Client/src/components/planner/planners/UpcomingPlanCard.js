import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";

import { formatUpcomingDate } from "../../../utils/calendarUtils";

export default function UpcomingPlanCard({ plan, onPress }) {
  const outfit = plan.outfit;
  const isOutfitMissing = !outfit;

  const formattedDate = formatUpcomingDate(plan.date);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      {/* Thumbnail */}

      <View style={styles.thumbnail}>
        {isOutfitMissing ? (
          <Ionicons name="warning-outline" size={34} color="#E67E22" />
        ) : outfit.thumbnail ? (
          <Image
            source={{ uri: outfit.thumbnail }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Ionicons name="shirt-outline" size={34} color={COLORS.secondary} />
        )}
      </View>

      {/* Content */}

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {isOutfitMissing ? "Outfit Removed" : outfit.name}
        </Text>
        {isOutfitMissing && (
          <View style={styles.warningBadge}>
            <Ionicons name="alert-circle" size={13} color="#E67E22" />

            <Text style={styles.warningText}>Needs Attention</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={15}
            color={COLORS.secondary}
          />

          <Text style={styles.infoText}>{formattedDate}</Text>
        </View>

        {plan.occasion ? (
          <View style={styles.infoRow}>
            <Ionicons
              name="sparkles-outline"
              size={15}
              color={COLORS.secondary}
            />

            <Text style={styles.infoText}>{plan.occasion}</Text>
          </View>
        ) : null}
      </View>

      <Ionicons name="chevron-forward" size={22} color={COLORS.secondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },

  thumbnail: {
    width: 82,
    height: 96,
    borderRadius: 14,
    backgroundColor: COLORS.preview,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  image: {
    width: 68,
    height: 82,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },

  warningBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFF3E8",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },

  warningText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: "700",
    color: "#E67E22",
  },
  
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  infoText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.secondary,
  },
});