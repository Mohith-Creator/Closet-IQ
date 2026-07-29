import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import CalendarDay from "./CalendarDay";
import CalendarHeader from "./CalendarHeader";

import COLORS from "../../../theme/colors";
import { WEEK_DAYS } from "../../../constants/planner/plannerConstants";

import {
  generateCalendar,
  getNextMonth,
  getPreviousMonth,
  hasPlan,
  isPastDate,
  isSameDay,
  isToday,
} from "../../../utils/calendarUtils";

export default function MonthlyCalendar({
  selectedDate,
  onDateChange,
  plannedDates = [],
}) {
  // Current visible month
  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );

  // Generate month only when month changes
  const calendar = useMemo(() => {
    return generateCalendar(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
    );
  }, [currentMonth]);

  const handlePreviousMonth = () => {
    setCurrentMonth(getPreviousMonth(currentMonth));
  };

  const handleNextMonth = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };

  const handleSelectDate = (date) => {
    if (isPastDate(date)) return;

    onDateChange(date);
  };
  const today = new Date();

  const isCurrentMonth =
    currentMonth.getMonth() === today.getMonth() &&
    currentMonth.getFullYear() === today.getFullYear();

  return (
    <View style={styles.container}>
      <CalendarHeader
        currentMonth={currentMonth}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />

      {/* Week Days */}

      <View style={styles.weekRow}>
        {WEEK_DAYS.map((day) => (
          <Text key={day} style={styles.weekText}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar */}

      <View style={styles.calendarGrid}>
        {calendar.map((item, index) => {
          if (!item) {
            return <CalendarDay key={`empty-${index}`} />;
          }

          return (
            <CalendarDay
              key={item.day}
              day={item.day}
              date={item.date}
              selected={isSameDay(item.date, selectedDate)}
              today={isToday(item.date)}
              disabled={isPastDate(item.date)}
              hasPlan={hasPlan(item.date, plannedDates)}
              onPress={handleSelectDate}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  weekText: {
    width: `${100 / 7}%`,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.secondary,
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
