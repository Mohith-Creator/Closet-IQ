import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS as COLOR_OPTIONS } from "../../../constants/closet/wardrobeConstants";
import styles from "../../../styles/editItemStyles";
import { COLOR_PALETTE } from "../../../constants/colors/colorPalette";

export default function ColorSelector({ value, error, updateField }) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>
        Color
        <Text style={error ? styles.required : styles.normalRequired}>
          {" *"}
        </Text>
      </Text>

      <View style={[styles.colorGrid, error && styles.errorWrap]}>
        {COLOR_OPTIONS.map((item, index) => {
          const selected = value === item;

          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.colorCard,
                (index + 1) % 3 === 0 && {
                  marginRight: 0,
                },
                selected && styles.selectedColorCard,
              ]}
              onPress={() => updateField("color", item)}
              activeOpacity={0.85}
            >
              <View
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: COLOR_PALETTE[item] || "#DDD",
                  },
                  !selected &&
                    item === "White" && {
                      borderWidth: 1,
                      borderColor: "#D8D8D8",
                    },
                ]}
              >
                {selected && (
                  <Ionicons
                    name="checkmark"
                    size={13}
                    color={
                      ["White", "Cream", "Beige"].includes(item)
                        ? "#222"
                        : "#FFF"
                    }
                  />
                )}
              </View>

              <Text
                numberOfLines={1}
                style={[
                  styles.colorCardText,
                  selected && styles.selectedColorCardText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error && <Text style={styles.errorText}>Please select a color.</Text>}
    </View>
  );
}