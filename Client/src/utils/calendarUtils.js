/**
 * Returns the number of days in a month.
 * @param {number} year
 * @param {number} month (0-11)
 */
export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Returns the first weekday of a month.
 * 0 = Sunday
 * 6 = Saturday
 */
export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

/**
 * Removes time from a Date object.
 */
export const normalizeDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

/**
 * Checks whether two dates are the same calendar day.
 */
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Checks if the given date is today.
 */
export const isToday = (date) => {
  return isSameDay(date, new Date());
};

/**
 * Returns true if the date is before today.
 */
export const isPastDate = (date) => {
  const today = normalizeDate(new Date());

  return normalizeDate(date) < today;
};


/**
 * Checks if this date already has a planned outfit.
 */
export const hasPlan = (date, plans = []) => {
  return plans.some((plan) => isSameDay(new Date(plan.date), date));
};

/**
 * Creates a fast lookup set of planned dates.
 * Used by MonthlyCalendar to efficiently determine
 * whether a day has a planned outfit.
 */
export const createPlannedDatesSet = (plans = []) => {
  return new Set(
    plans.map((plan) => normalizeDate(new Date(plan.date)).getTime())
  );
};

/**
 * Generates a complete monthly calendar.
 */
/**
 * Generates a complete monthly calendar.
 * Each cell has a consistent object structure.
 */
export const generateCalendar = (year, month) => {
  const calendar = [];

  const totalDays = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Empty cells before the first day
  for (let i = 0; i < firstDay; i++) {
    calendar.push({
      empty: true,
      day: null,
      date: null,
    });
  }

  // Actual days
  for (let day = 1; day <= totalDays; day++) {
    calendar.push({
      empty: false,
      day,
      date: new Date(year, month, day),
    });
  }

  return calendar;
};

/**
 * Returns the previous month.
 */
export const getPreviousMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};

/**
 * Returns the next month.
 */
export const getNextMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

// =============================================================================
// Additional Planner Helpers
// =============================================================================

/**
 * Returns month title.
 * Example: July 2026
 */
export const getMonthTitle = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

/**
 * Returns the seven dates of the week
 * containing the selected date.
 */
export const getWeekDates = (selectedDate = new Date()) => {
  const sunday = new Date(selectedDate);

  sunday.setDate(selectedDate.getDate() - selectedDate.getDay());

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(sunday);

    date.setDate(sunday.getDate() + index);

    return date;
  });
};


/**
 * Formats the date shown in Upcoming Plans.
 *
 * Today        -> Today • 7 Jul
 * Future dates -> 12 Jul 2026
 */
export const formatUpcomingDate = (date) => {
  const target = normalizeDate(new Date(date));
  const today = normalizeDate(new Date());

  if (isSameDay(target, today)) {
    return `Today • ${target.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    })}`;
  }

  return target.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/**
 * Returns true if the date
 * is after today.
 */
export const isFutureDate = (date) => {
  return normalizeDate(date) > normalizeDate(new Date());
};

/**
 * Sort plans by date ascending.
 */
export const sortPlansByDate = (plans = []) => {
  return [...plans].sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * Returns all plans
 * for a specific day.
 */
export const filterPlansByDate = (plans = [], date) => {
  return plans.filter((plan) => isSameDay(new Date(plan.date), date));
};

/**
 * Returns only today's and
 * future plans.
 */
export const filterUpcomingPlans = (plans = []) => {
  const today = normalizeDate(new Date());

  return plans.filter((plan) => normalizeDate(new Date(plan.date)) >= today);
};

/**
 * Returns the next upcoming plan.
 */
export const getNextUpcomingPlan = (plans = []) => {
  const upcoming = filterUpcomingPlans(plans);

  if (!upcoming.length) return null;

  return sortPlansByDate(upcoming)[0];
};