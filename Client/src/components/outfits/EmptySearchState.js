import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../theme/colors";

export default function EmptySearchState({ search, onClear }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={72} color={COLORS.secondary} />

      <Text style={styles.title}>No outfits found</Text>

      <Text style={styles.subtitle}>
        We couldn't find any outfits matching{"\n"}
        <Text style={styles.query}>"{search}"</Text>
      </Text>

      <TouchableOpacity style={styles.button} onPress={onClear}>
        <Ionicons name="close-circle-outline" size={18} color="#FFF" />
        <Text style={styles.buttonText}>Clear Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginTop: 80,
  },

  title: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 8,
    textAlign: "center",
    color: COLORS.secondary,
    lineHeight: 22,
    fontSize: 15,
  },

  query: {
    fontWeight: "700",
    color: COLORS.primary,
  },

  button: {
    marginTop: 24,
    height: 46,
    paddingHorizontal: 22,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
  },
};
