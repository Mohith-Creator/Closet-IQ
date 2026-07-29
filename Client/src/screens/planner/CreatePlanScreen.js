import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import MonthlyCalendar from "../../components/planner/planners/MonthlyCalendar";
import PlannerOptionSelector from "../../components/planner/createplan/PlannerOptionSelector";
import OutfitList from "../../components/planner/createplan/OutfitList";
import NotesInput from "../../components/planner/createplan/NotesInput";

import COLORS from "../../theme/colors";

import {
  OCCASIONS,
  WEATHER_OPTIONS,
  TIME_OPTIONS,
} from "../../constants/planner/plannerConstants";

import {
  createPlan,
  updatePlan,
  getPlans,
} from "../../services/plannerService";

import { getOutfits } from "../../services/outfitService";

export default function CreatePlanScreen({ navigation, route }) {

  const isEdit = route.params?.mode === "edit";
  const editingPlan = route.params?.plan;

  // ===========================================================================
  // Planner States
  // ===========================================================================

 const initialDate = editingPlan
   ? new Date(editingPlan.date)
   : route.params?.selectedDate
     ? new Date(route.params.selectedDate)
     : new Date();

 const [selectedDate, setSelectedDate] = useState(initialDate);

  const [selectedOccasion, setSelectedOccasion] = useState(
    editingPlan?.occasion || "",
  );

  const [selectedWeather, setSelectedWeather] = useState(
    editingPlan?.weather || "",
  );

  const [selectedTime, setSelectedTime] = useState(
    editingPlan?.timeOfDay || "",
  );

  const [selectedOutfit, setSelectedOutfit] = useState(
    editingPlan?.outfit || null,
  );

  const [notes, setNotes] = useState(editingPlan?.notes || "");

  // ===========================================================================
  // Backend Data
  // ===========================================================================

  const [outfits, setOutfits] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===========================================================================
  // Load Planner Data
  // ===========================================================================

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [outfitsData, plansData] = await Promise.all([
        getOutfits(),
        getPlans(),
      ]);

      setOutfits(outfitsData || []);
      setPlans(plansData || []);
    } catch (error) {
      console.log("Planner Load Error:", error);

      Alert.alert("Error", "Failed to load planner data.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectOutfit = (outfit) => {
    if (selectedOutfit?._id === outfit._id) {
      // Deselect if the same outfit is tapped again
      setSelectedOutfit(null);
    } else {
      // Select new outfit
      setSelectedOutfit(outfit);
    }
  };

  // ===========================================================================
  // Reload Whenever Screen Opens
  // ===========================================================================

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  // ===========================================================================
  // Save Planner
  // ===========================================================================

  const planDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    12,
    0,
    0,
  );

  const handleSave = async () => {
    if (!selectedOutfit) {
      return Alert.alert("Select Outfit", "Please choose an outfit.");
    }

    if (!selectedOccasion) {
      return Alert.alert("Occasion", "Please select an occasion.");
    }

    if (!selectedWeather) {
      return Alert.alert("Weather", "Please select the weather.");
    }

    if (!selectedTime) {
      return Alert.alert("Time of Day", "Please select the time of day.");
    }

    try {
      const payload = {
        outfit: selectedOutfit._id,
        date: planDate,
        occasion: selectedOccasion,
        weather: selectedWeather,
        timeOfDay: selectedTime,
        notes,
      };

      if (isEdit) {
        await updatePlan(editingPlan._id, payload);

        navigation.navigate("Planner", {
          snackbar: {
            message: "Plan updated successfully",
            icon: "checkmark-circle",
          },
        });

        return;
      } else {
        await createPlan(payload);

        navigation.navigate("Planner", {
          snackbar: {
            message: "Outfit planned successfully",
            icon: "checkmark-circle",
          },
        });

        return;
      }
    } catch (error) {
      if (error.response?.status === 400) {
        Alert.alert("Plan Already Exists", error.response.data.message);
        return;
      }

      console.log(error);

      Alert.alert("Error", "Failed to create plan.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ---------------------------------------------------------------- */}
      {/* Header */}
      {/* ---------------------------------------------------------------- */}

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.title}>
            {isEdit ? "Edit Plan" : "Create Plan"}
          </Text>

          <Text style={styles.subtitle}>
            {isEdit
              ? "Update your planned outfit"
              : "Plan your look for a future date"}
          </Text>
        </View>
      </View>

      {/* ---------------------------------------------------------------- */}
      {/* Loading */}
      {/* ---------------------------------------------------------------- */}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />

          <Text style={styles.loadingText}>Loading planner...</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* ------------------------------------------------------------ */}
          {/* Monthly Calendar */}
          {/* ------------------------------------------------------------ */}

          <MonthlyCalendar
            plans={plans}
            initialDate={selectedDate}
            allowPastPlans={false}
            onDatePress={setSelectedDate}
          />

          {/* ------------------------------------------------------------ */}
          {/* Occasion */}
          {/* ------------------------------------------------------------ */}

          <PlannerOptionSelector
            title="Occasion"
            options={OCCASIONS}
            selected={selectedOccasion}
            onSelect={setSelectedOccasion}
          />

          {/* ------------------------------------------------------------ */}
          {/* Weather */}
          {/* ------------------------------------------------------------ */}

          <PlannerOptionSelector
            title="Weather"
            options={WEATHER_OPTIONS}
            selected={selectedWeather}
            onSelect={setSelectedWeather}
          />

          {/* ------------------------------------------------------------ */}
          {/* Time of Day */}
          {/* ------------------------------------------------------------ */}

          <PlannerOptionSelector
            title="Time of Day"
            options={TIME_OPTIONS}
            selected={selectedTime}
            onSelect={setSelectedTime}
          />

          {/* ------------------------------------------------------------ */}
          {/* Outfit Selection */}
          {/* ------------------------------------------------------------ */}

          <OutfitList
            outfits={outfits}
            loading={loading}
            selectedOutfit={selectedOutfit}
            onSelect={handleSelectOutfit}
            onCreateOutfit={() => navigation.navigate("Outfits")}
          />

          {/* ------------------------------------------------------------ */}
          {/* Notes */}
          {/* ------------------------------------------------------------ */}

          <NotesInput value={notes} onChangeText={setNotes} />

          {/* ------------------------------------------------------------ */}
          {/* Save Button */}
          {/* ------------------------------------------------------------ */}

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Ionicons name="calendar-outline" size={20} color="#FFF" />

            <Text style={styles.saveText}>
              {isEdit ? "Update Plan" : "Create Plan"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
      paddingBottom: 26,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 18,
    },

    backButton: {
      paddingRight: 10,
    },

    headerContent: {
      flex: 1,
    },

    title: {
      fontSize: 24,
      fontWeight: "700",
      color: COLORS.text,
    },

    subtitle: {
      marginTop: 4,
      fontSize: 15,
      color: COLORS.secondary,
      lineHeight: 21,
    },

    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    loadingText: {
      marginTop: 14,
      fontSize: 15,
      color: COLORS.secondary,
    },

    sectionCard: {
      backgroundColor: COLORS.white,
      borderRadius: 24,
      padding: 18,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: COLORS.border,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 12,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      elevation: 3,
    },

    saveButton: {
      height: 60,
      borderRadius: 18,
      backgroundColor: COLORS.primary,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginTop: 8,
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      elevation: 5,
    },

    saveText: {
      color: "#FFF",
      fontWeight: "700",
      fontSize: 16,
      marginLeft: 10,
    },
  });