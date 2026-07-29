import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";

const STYLE_OPTIONS = [
  {
    title: "Casual",
    description: "Everyday",
    icon: "tshirt-crew",
  },
  {
    title: "Formal",
    description: "Elegant",
    icon: "tie",
  },
  {
    title: "Streetwear",
    description: "Urban",
    icon: "shoe-sneaker",
  },
  {
    title: "Vintage",
    description: "Classic",
    icon: "hanger",
  },
  {
    title: "Sporty",
    description: "Active",
    icon: "run-fast",
  },
];

export default function StyleGridSelector({ value = [], onChange }) {
  const toggleStyle = (style) => {
    if (value.includes(style)) {
      onChange(value.filter((item) => item !== style));
      return;
    }

    if (value.length >= 5) return;

    onChange([...value, style]);
  };

  return (
    <View style={styles.container}>
      {STYLE_OPTIONS.map((item) => {
        const selected = value.includes(item.title);

        return (
          <TouchableOpacity
            key={item.title}
            activeOpacity={0.85}
            onPress={() => toggleStyle(item.title)}
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
