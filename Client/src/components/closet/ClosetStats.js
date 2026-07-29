import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

import { CLOSET_STATS } from "../../constants/closet/closetStats";

export default function ClosetStats({ stats }) {
  return (
    <View style={styles.container}>
      {CLOSET_STATS.map((item) => (
        <View key={item.key} style={styles.statItem}>
          <View style={styles.topRow}>
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon} size={15} color={COLORS.primary} />
            </View>

            <Text style={styles.value}>
              {stats[item.key] || 0}
              {item.suffix || ""}
            </Text>
          </View>

          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    backgroundColor: COLORS.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 8,
    ...SHADOW.card,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: COLORS.lightBrown,
    justifyContent: "center",
    alignItems: "center",
  },

  value: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.secondary,
  },
});