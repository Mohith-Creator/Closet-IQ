import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import COLORS from "../../../theme/colors";

export default function CalendarDay({
  day,
  selected,
  today,
  hasPlan,
  disabled = false,
  onPress,
}) {
  // Empty calendar cell
  if (day.empty) {
    return <View style={styles.emptyCell} />;
  }

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress(day.date);
    }
  };

  const showTodayRing = today && !selected;
  const showTodaySelected = today && selected;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      style={styles.container}
      onPress={handlePress}
    >
      {showTodaySelected ? (
        <View style={styles.todaySelectedRing}>
          <View style={styles.todaySelectedInner}>
            <Text style={[styles.dayText, styles.selectedText]}>{day.day}</Text>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.dayCircle,
            selected && styles.selectedDay,
            showTodayRing && styles.todayDay,
            disabled && styles.disabledDay,
          ]}
        >
          <Text
            style={[
              styles.dayText,
              selected && styles.selectedText,
              disabled && styles.disabledText,
            ]}
          >
            {day.day}
          </Text>
        </View>
      )}

      {hasPlan && <View style={[styles.dot, selected && styles.selectedDot]} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: `${100 / 7}%`,
    height: 46,
    alignItems: "center",
  },

  emptyCell: {
    width: `${100 / 7}%`,
    height: 46,
  },

  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  todayDay: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },

  selectedDay: {
    backgroundColor: COLORS.primary,
  },

  todaySelectedRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  todaySelectedInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  dayText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },

  selectedText: {
    color: "#FFF",
    fontWeight: "700",
  },

  dot: {
    position: "absolute",
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },

  selectedDot: {
    backgroundColor: "#FFF",
  },

  disabledDay: {
    opacity: 0.45,
  },

  disabledText: {
    color: COLORS.placeholder,
  },
});