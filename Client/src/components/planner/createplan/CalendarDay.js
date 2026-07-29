import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import COLORS from "../../../theme/colors";

export default function CalendarDay({
  day,
  date,
  selected,
  disabled,
  today,
  hasPlan,
  onPress,
}) {
  // Empty cells before the first day of the month
  if (!day) {
    return <View style={styles.emptyCell} />;
  }

  const isTodaySelected = today && selected;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={() => onPress(date)}
      style={styles.container}
    >
      {isTodaySelected ? (
        <View style={styles.todaySelectedRing}>
          <View style={styles.todaySelectedInner}>
            <Text style={styles.selectedText}>{day}</Text>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.dayCircle,
            selected && styles.selectedDay,
            today && !selected && styles.today,
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
            {day}
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
    height: 44,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  emptyCell: {
    width: `${100 / 7}%`,
    height: 44,
  },

  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },

  // Today only (outlined)
  today: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },

  // Selected only (filled)
  selectedDay: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  // Today + Selected
  todaySelectedRing: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  todaySelectedInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  disabledDay: {
    opacity: 0.45,
  },

  dayText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },

  selectedText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },

  disabledText: {
    color: COLORS.muted,
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
    backgroundColor: COLORS.white,
  },
});
