import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

export default function CategoryChips({
  categories = [],
  counts = {},
  selected,
  onSelect,
}) {
  return (
    <ScrollView
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
      style={{
        flexGrow: 0,
        maxHeight: 60,
      }}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const isSelected = selected === category;

        return (
          <TouchableOpacity
            key={category}
            activeOpacity={0.9}
            style={[styles.chip, isSelected && styles.activeChip]}
            onPress={() => onSelect(category)}
          >
            <Text style={[styles.label, isSelected && styles.activeLabel]}>
              {category}
            </Text>

            <View style={[styles.countBadge, isSelected && styles.activeBadge]}>
              <Text
                style={[styles.countText, isSelected && styles.activeCount]}
              >
                {counts[category] || 0}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 36,
    marginRight: 10,
    ...SHADOW.small,
  },

  activeChip: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },

  activeLabel: {
    color: COLORS.white,
  },

  countBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightBrown,
  },

  activeBadge: {
    backgroundColor: COLORS.activeOverlay,
  },

  countText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
  },

  activeCount: {
    color: COLORS.white,
  },
});