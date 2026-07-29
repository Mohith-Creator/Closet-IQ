import React, { useMemo } from "react";
import { View } from "react-native";

import UpcomingPlanCard from "./UpcomingPlanCard";
import UpcomingPlansEmpty from "./UpcomingPlansEmpty";

import {
  filterUpcomingPlans,
  sortPlansByDate,
} from "../../../utils/calendarUtils";

export default function UpcomingPlanList({
  plans = [],
  onPlanPress,
  onCreatePlan,
}) {
  const upcomingPlans = useMemo(() => {
    return sortPlansByDate(filterUpcomingPlans(plans));
  }, [plans]);

  if (!upcomingPlans.length) {
    return <UpcomingPlansEmpty onCreatePlan={onCreatePlan} />;
  }

  return (
    <>
      {upcomingPlans.map((plan, index) => {
        const handlePress = () => {
          onPlanPress?.(plan);
        };

        return (
          <View
            key={plan._id}
            style={{
              marginBottom: index === upcomingPlans.length - 1 ? 0 : 14,
            }}
          >
            <UpcomingPlanCard plan={plan} onPress={handlePress} />
          </View>
        );
      })}
    </>
  );
}