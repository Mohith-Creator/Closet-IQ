import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";

const GENDERS = [
  {
    label: "Male",
    value: "Male",
    symbol: "♂",
  },
  {
    label: "Female",
    value: "Female",
    symbol: "♀",
  },
  {
    label: "Other",
    value: "Other",
    symbol: "⚧",
  },
];

export default function GenderSelector({ value, onChange }) {
  return (
    <View style={styles.container}>
      {GENDERS.map((gender) => {
        const selected = value === gender.value;
        return (
          <TouchableOpacity
            key={gender.value}
            activeOpacity={0.85}
            onPress={() => onChange(gender.value)}
            style={[styles.card, selected && styles.selectedCard]}
          >
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <Text style={styles.genderSymbol}>{gender.symbol}</Text>
              </View>
              <Text style={[styles.title, selected && styles.selectedTitle]}>
                {gender.label}
              </Text>
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

  genderSymbol: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
  },

  title: {
    marginLeft: 14,
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.text,
  },

  selectedTitle: {
    color: COLORS.primary,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#D7D3CF",
  },
});
