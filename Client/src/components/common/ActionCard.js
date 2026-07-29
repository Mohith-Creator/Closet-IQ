import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

export default function ActionCard({ icon, iconType, label, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {iconType === "mc" ? (
        <MaterialCommunityIcons name={icon} size={26} color={COLORS.text} />
      ) : (
        <Ionicons name={icon} size={24} color={COLORS.text} />
      )}

      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "23%",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.softBorder,
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 18,
    ...SHADOW.card,
  },

  text: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    color: COLORS.text,
  },
});