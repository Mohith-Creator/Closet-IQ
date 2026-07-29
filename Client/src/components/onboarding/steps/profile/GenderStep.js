import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import GenderSelector from "../../inputs/GenderSelector";

import COLORS from "../../../../theme/colors";

export default function GenderStep({ profile, setProfile }) {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.headerIcon}>
            <Feather name="users" size={20} color={COLORS.primary} />
          </View>

          <Text style={styles.heading}>Select your gender</Text>
        </View>

        <Text style={styles.description}>
          Your selection helps us personalize outfit suggestions and size
          recommendations.
        </Text>
      </View>

      <View style={styles.content}>
        <GenderSelector
          value={profile.gender}
          onChange={(gender) =>
            setProfile((prev) => ({
              ...prev,
              gender,
            }))
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 8,
    marginBottom: 32,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F7EFE8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  heading: {
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    includeFontPadding: false,
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.secondary,
  },

  content: {
    marginTop: 12,
  },
});
