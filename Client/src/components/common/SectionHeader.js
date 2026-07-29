import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import COLORS from "../../theme/colors";

export default function SectionHeader({ title, actionText, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {actionText ? (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.link}>{actionText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  link: {
    fontSize: 13,
    color: COLORS.secondary,
    fontWeight: "500",
  },
});
