import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import COLORS from "../../../theme/colors";

import CalendarHeader from "./CalendarHeader";
import CalendarDay from "./CalendarDay";

import { WEEK_DAYS } from "../../../constants/planner/plannerConstants";

import {
  createPlannedDatesSet,
  generateCalendar,
  getNextMonth,
  getPreviousMonth,
  isPastDate,
  isSameDay,
  isToday,
  normalizeDate,
} from "../../../utils/calendarUtils";

export default function MonthlyCalendar({
  plans = [],
  initialDate = new Date(),
  allowPastPlans = false,
  onDatePress,
}) {
  const initialMonth = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth(),
    1,
  );

  const [selectedDate, setSelectedDate] = useState(() => initialDate);

  const [currentMonth, setCurrentMonth] = useState(
    () => new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  );

  // Calendar cells
  const calendar = useMemo(() => {
    return generateCalendar(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
    );
  }, [currentMonth]);

  // Fast lookup for planned dates
  const plannedDatesSet = useMemo(() => {
    return createPlannedDatesSet(plans);
  }, [plans]);

  const handleNextMonth = () => {
    setCurrentMonth((month) => getNextMonth(month));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((month) => getPreviousMonth(month));
  };

  const handleCurrentMonth = () => {
    const today = new Date();

    const isCurrentMonth =
      currentMonth.getFullYear() === today.getFullYear() &&
      currentMonth.getMonth() === today.getMonth();

    if (isCurrentMonth) {
      setSelectedDate(today);
      onDatePress?.(today);
      return;
    }

    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));

    setSelectedDate(today);
  };

  const handleSelectDay = (date) => {
    setSelectedDate(date);

    if (onDatePress) {
      onDatePress(date);
    }
  };

  return (
    <View style={styles.container}>
      <CalendarHeader
        currentMonth={currentMonth}
        onPrevious={handlePreviousMonth}
        onNext={handleNextMonth}
        onToday={handleCurrentMonth}
      />

      {/* Week Days */}

      <View style={styles.weekRow}>
        {WEEK_DAYS.map((day) => (
          <Text key={day} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar */}

      <View style={styles.calendarGrid}>
        {calendar.map((day, index) => {
          const { empty, date } = day;

          const selected = !empty && isSameDay(date, selectedDate);

          const isTodayDate = !empty && isToday(date);

          const hasPlannedOutfit =
            !empty && plannedDatesSet.has(normalizeDate(date).getTime());

          const disabled =
            !empty &&
            (allowPastPlans
              ? isPastDate(date) && !hasPlannedOutfit
              : isPastDate(date));

          return (
            <CalendarDay
              key={day.empty ? `empty-${index}` : day.date.getTime()}
              day={day}
              selected={selected}
              today={isTodayDate}
              hasPlan={hasPlannedOutfit}
              disabled={disabled}
              onPress={handleSelectDay}
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
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },

  weekRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  weekDay: {
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
