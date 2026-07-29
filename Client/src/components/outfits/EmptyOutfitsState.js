import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

export default function EmptyOutfitsState({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/emptyoutfit.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>No saved outfits yet</Text>

      <Text style={styles.subtitle}>
        Create your first outfit{"\n"}
        or let AI{"\n"}
        build one for you.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Outfits")}
        >
          <Ionicons name="add" size={18} color="#FFF" />
          <Text style={styles.primaryText}>Create Outfit</Text>
        </TouchableOpacity>

        <Text style={styles.dividerText}>OR</Text>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("AISuggestion")}
        >
          <Ionicons name="sparkles" size={18} color={COLORS.primary} />
          <Text style={styles.secondaryText}>Generate with AI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  image: {
    width: 220,
    height: 220,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: -10,
  },

  subtitle: {
    marginTop: 5,
    textAlign: "center",
    color: COLORS.secondary,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 260,
  },

  buttonContainer: {
    width: "100%",
    marginTop: 28,
    alignItems: "center", // Centers OR text and buttons
  },

  primaryButton: {
    width: "60%",
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.small,
  },

  primaryText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 6,
  },

  dividerText: {
    marginVertical: 14,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.secondary,
    letterSpacing: 1,
    textAlign: "center",
  },

  secondaryButton: {
    width: "60%",
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryText: {
    marginLeft: 6,
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },
};
