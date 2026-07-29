import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import COLORS from "../../theme/colors";

export default function MenuItem({
  title,
  icon,
  type,
  onPress,
  isLast = false,
}) {
  const renderIcon = () => {
    if (type === "mc") {
      return (
        <MaterialCommunityIcons name={icon} size={18} color={COLORS.primary} />
      );
    }

    return <Ionicons name={icon} size={18} color={COLORS.primary} />;
  };

  return (
    <TouchableOpacity
      style={[styles.menuItem, !isLast && styles.menuDivider]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.menuLeft}>
        <View style={styles.iconContainer}>{renderIcon()}</View>

        <Text style={styles.menuText}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={22} color="#B9ADA2" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.card,
  },

  menuDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1E8DF",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F8EFE6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  menuText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    flex: 1,
  },
});