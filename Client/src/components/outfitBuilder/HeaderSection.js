import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";

import COLORS from "../../theme/colors";

export default function HeaderSection({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={28} color={COLORS.text} />
      </TouchableOpacity>

      <View style={styles.center}>
        <Text style={styles.title}>Outfit Builder</Text>

        <Text style={styles.subtitle}>Create your perfect look</Text>
      </View>

      <TouchableOpacity style={styles.iconBtn}>
        <Ionicons name="sparkles" size={22} color={COLORS.brown} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
  },

  center: {
    alignItems: "center",
  },

  iconBtn: {
    marginRight: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.secondary,
  },
});
