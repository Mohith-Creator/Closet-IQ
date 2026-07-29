import React from "react";
import { View, Text, StyleSheet } from "react-native";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

export default function StatCard({ icon, value, label }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "23%",
    height: 85,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.softBorder,
    borderRadius: 18,
    ...SHADOW.card,
  },

  value: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  label: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    color: COLORS.secondary,
  },
});