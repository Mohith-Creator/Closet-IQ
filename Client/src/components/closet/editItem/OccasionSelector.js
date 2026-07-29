import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles/editItemStyles";
import COLORS from "../../../theme/colors";
import { OCCASION_ICONS } from "../../../constants/closet/occasionIcons";

export default function OccasionSelector({
  occasions,
  selected,
  error,
  toggleOccasion,
  
}) {
  if (!occasions.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.label}>
        Occasion
        <Text style={error ? styles.required : styles.normalRequired}>
          {" *"}
        </Text>
      </Text>

      <View style={[styles.wrap, error && styles.errorWrap]}>
        {occasions.map((item, index) => {
          const isSelected = selected.includes(item);

          const Icon = OCCASION_ICONS[item]?.lib || Ionicons;

          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.occasionCard,
                (index + 1) % 3 === 0 && { marginRight: 0 },
                isSelected && styles.selectedOccasionCard,
              ]}
              onPress={() => toggleOccasion(item)}
            >
              <Icon
                name={OCCASION_ICONS[item]?.name || "ellipse-outline"}
                size={isSelected ? 24 : 22}
                color={isSelected ? COLORS.primary : "#6A5446"}
              />

              <Text
                numberOfLines={1}
                style={[
                  styles.occasionText,
                  isSelected && styles.selectedOccasionText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error && (
        <Text style={styles.errorText}>Select at least one occasion.</Text>
      )}
    </View>
  );
}
