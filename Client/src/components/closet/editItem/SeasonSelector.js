import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "../../../styles/editItemStyles";
import COLORS from "../../../theme/colors";
import { SEASONS } from "../../../constants/closet/wardrobeConstants";

export default function SeasonSelector({ value = [], updateField }) {
  const toggleSeason = (season) => {
    let updated;

    if (season === "All Season") {
      updated = value.includes("All Season") ? [] : ["All Season"];
    } else {
      const withoutAllSeason = value.filter((item) => item !== "All Season");

      updated = withoutAllSeason.includes(season)
        ? withoutAllSeason.filter((item) => item !== season)
        : [...withoutAllSeason, season];
    }

    updateField("season", updated);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.label}>Season</Text>

      <View style={styles.wrap}>
        {SEASONS.map((season) => {
          const selected = value.includes(season);

          return (
            <TouchableOpacity
              key={season}
              style={[styles.optionChip, selected && styles.selectedOptionChip]}
              onPress={() => toggleSeason(season)}
            >
              <Ionicons
                name={selected ? "checkmark-circle" : "ellipse-outline"}
                size={16}
                color={selected ? COLORS.primary : "#8B7B6A"}
                style={styles.optionChipIcon}
              />

              <Text
                style={[
                  styles.optionChipText,
                  selected && styles.selectedOptionChipText,
                ]}
              >
                {season}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
