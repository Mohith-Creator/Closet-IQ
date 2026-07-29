import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";

const BODY_TYPES = [
  {
    value: "Lean",
    title: "Lean",
    description: "Slim frame",
    icon: "run-fast",
  },
  {
    value: "Athletic",
    title: "Athletic",
    description: "Muscular build",
    icon: "dumbbell",
  },
  {
    value: "Average",
    title: "Average",
    description: "Balanced body",
    icon: "human-male",
  },
  {
    value: "Broad",
    title: "Broad",
    description: "Larger frame",
    icon: "weight-lifter",
  },
];

export default function BodyTypeSelector({ value, onChange }) {
  return (
    <View style={styles.container}>
      {BODY_TYPES.map((item) => {
        const selected = value === item.value;

        return (
          <TouchableOpacity
            key={item.value}
            activeOpacity={0.85}
            onPress={() => onChange(item.value)}
            style={[styles.card, selected && styles.selectedCard]}
          >
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={22}
                  color={COLORS.primary}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={[styles.title, selected && styles.selectedTitle]}>
                  {item.title}
                </Text>

                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>

            {selected ? (
              <Feather name="check-circle" size={24} color={COLORS.primary} />
            ) : (
              <View style={styles.radio} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  card: {
    height: 74,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 18,

    backgroundColor: COLORS.white,

    borderRadius: 18,

    borderWidth: 1.5,
    borderColor: COLORS.border,
  },

  selectedCard: {
    borderColor: COLORS.primary,
    backgroundColor: "#FFF8F4",
  },

  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: "#F7EFE8",

    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    marginLeft: 14,
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.text,
  },

  selectedTitle: {
    color: COLORS.primary,
  },

  description: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.secondary,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,

    borderWidth: 2,
    borderColor: "#D7D3CF",
  },
});
