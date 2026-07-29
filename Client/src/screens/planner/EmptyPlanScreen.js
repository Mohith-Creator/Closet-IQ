import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../theme/colors";

export default function EmptyPlanScreen({ route, navigation }) {
  const { selectedDate } = route.params;

  const date = new Date(selectedDate);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleCreatePlan = () => {
    navigation.navigate("CreatePlan", {
      selectedDate,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Outfit Planner</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Empty State */}

      <View style={styles.content}>
        <Ionicons name="calendar-outline" size={84} color={COLORS.primary} />
        <Text style={styles.heading}>No outfit planned</Text>
        <Text style={styles.description}>Plan your outfit for</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={handleCreatePlan}
        >
          <Text style={styles.buttonText}>Plan Outfit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 36,
  },

  heading: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },

  description: {
    marginTop: 14,
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: "center",
  },

  date: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.primary,
    textAlign: "center",
  },

  button: {
    marginTop: 40,
    height: 54,
    alignSelf: "stretch",
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});