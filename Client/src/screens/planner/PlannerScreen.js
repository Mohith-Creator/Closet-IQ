import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import COLORS from "../../theme/colors";

import { getPlans } from "../../services/plannerService";
import {
  filterPlansByDate,
  filterUpcomingPlans,
} from "../../utils/calendarUtils";

import Snackbar from "../../components/common/Snackbar";
import EmptyPlannerState from "../../components/planner/planners/EmptyPlannerState";
import MonthlyCalendar from "../../components/planner/planners/MonthlyCalendar";
import UpcomingPlanList from "../../components/planner/planners/UpcomingPlanList";

export default function PlannerScreen({ navigation, route }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarIcon, setSnackbarIcon] = useState("checkmark-circle");

  useFocusEffect(
    useCallback(() => {
      loadPlans();
    }, [loadPlans]),
  );

  useEffect(() => {
    const snackbar = route.params?.snackbar;

    if (!snackbar) return;

    setSnackbarMessage(snackbar.message);
    setSnackbarIcon(snackbar.icon ?? "checkmark-circle");
    setSnackbarVisible(true);

    navigation.setParams({
      snackbar: undefined,
    });
  }, [route.params?.snackbar, navigation]);

  const loadPlans = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getPlans();

      setPlans(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);

      await loadPlans();
    } finally {
      setRefreshing(false);
    }
  }, [loadPlans]);

  const goToCreatePlan = (selectedDate = null) => {
    navigation.navigate("CreatePlan", {
      selectedDate,
    });
  };

  const handleDatePress = (date) => {
    const dayPlans = filterPlansByDate(plans, date);
    const plan = dayPlans[0];

    if (plan) {
      navigation.navigate("PlanDetails", {
        plan,
      });
    } else {
      navigation.navigate("EmptyPlan", {
        selectedDate: date.toISOString(),
      });
    }
  };

  const handlePlanPress = (plan) => {
    navigation.navigate("PlanDetails", {
      plan,
    });
  };

  const hasUpcomingPlans = filterUpcomingPlans(plans).length > 0;

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Snackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        icon={snackbarIcon}
        onHide={() => setSnackbarVisible(false)}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.title}>Outfit Planner</Text>

        <View style={{ width: 26 }} />
      </View>

      {plans.length === 0 ? (
        <EmptyPlannerState onCreatePlan={goToCreatePlan} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
        >
          <MonthlyCalendar
            plans={plans}
            initialDate={new Date()}
            allowPastPlans={true}
            onDatePress={handleDatePress}
          />

          <Text style={styles.sectionTitle}>Upcoming Plans</Text>

          <UpcomingPlanList
            plans={plans}
            onPlanPress={handlePlanPress}
            onCreatePlan={() => goToCreatePlan()}
          />
        </ScrollView>
      )}
      {plans.length > 0 && hasUpcomingPlans && (
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.9}
          onPress={() => goToCreatePlan()}
        >
          <Ionicons name="add" size={22} color="#FFF" />
          <Text style={styles.fabText}>Plan Outfit</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 74,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 24,
    marginBottom: 16,
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 28,
    height: 56,
    paddingHorizontal: 22,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 10,
  },

  fabText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});
