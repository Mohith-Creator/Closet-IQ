import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { useAuth } from "../../context/AuthContext";

import { updateMeasurements } from "../../services/userService";

import {
  BASIC_MEASUREMENT_FIELDS,
  BODY_MEASUREMENT_FIELDS,
} from "../../constants/profile";

import COLORS from "../../theme/colors";

import Button from "../../components/common/Button";
import StepIndicator from "../../components/onboarding/layout/StepIndicator";
import MeasurementSection from "../../components/profile/MeasurementSection";
import BodyTypeSelector from "../../components/onboarding/inputs/BodyTypeSelector";

export default function Measurements({ navigation }) {
  const { userData, setUserData } = useAuth();

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("bodyType");
  const [measurements, setMeasurements] = useState({
    height: userData?.measurements?.height?.toString() || "",
    weight: userData?.measurements?.weight?.toString() || "",
    bodyType: userData?.measurements?.bodyType || "Average",
    chest: userData?.measurements?.chest?.toString() || "",
    waist: userData?.measurements?.waist?.toString() || "",
    hips: userData?.measurements?.hips?.toString() || "",
    shoulder: userData?.measurements?.shoulder?.toString() || "",
    inseam: userData?.measurements?.inseam?.toString() || "",
    shoeSize: userData?.measurements?.shoeSize?.toString() || "",
  });

  const handleSave = async () => {
    try {
      const allFields = [
        ...BASIC_MEASUREMENT_FIELDS,
        ...BODY_MEASUREMENT_FIELDS,
      ];
      for (const field of allFields) {
        const value = measurements[field.key];
        if (!value) continue;
        const number = Number(value);
        if (number < field.min || number > field.max) {
          Alert.alert(
            "Invalid Measurement",
            `${field.label} must be between ${field.min} and ${field.max} ${
              field.key === "shoeSize" ? "UK" : "cm"
            }.`,
          );
          return;
        }
      }
      setLoading(true);
      const updatedUser = await updateMeasurements({
        measurements: {
          height: Number(measurements.height) || null,
          weight: Number(measurements.weight) || null,
          bodyType: measurements.bodyType,
          chest: Number(measurements.chest) || null,
          waist: Number(measurements.waist) || null,
          hips: Number(measurements.hips) || null,
          shoulder: Number(measurements.shoulder) || null,
          inseam: Number(measurements.inseam) || null,
          shoeSize: Number(measurements.shoeSize) || null,
        },
      });
      setUserData(updatedUser);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to update measurements.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Measurements</Text>
          <Text style={styles.headerSubtitle}>
            Update your body measurements
          </Text>
        </View>
        <View style={styles.placeholder} />
      </View>
      <StepIndicator
        currentStep={currentStep === "bodyType" ? 1 : 2}
        totalSteps={2}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {currentStep === "bodyType" ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Body Type</Text>

            <Text style={styles.sectionDescription}>
              Select the body type that best matches your physique.
            </Text>

            <BodyTypeSelector
              value={measurements.bodyType}
              onChange={(bodyType) =>
                setMeasurements((prev) => ({
                  ...prev,
                  bodyType,
                }))
              }
            />
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Basic Measurements</Text>

              <Text style={styles.sectionDescription}>
                Used to recommend the right clothing sizes.
              </Text>

              <MeasurementSection
                fields={BASIC_MEASUREMENT_FIELDS}
                measurements={measurements}
                setMeasurements={setMeasurements}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Body Measurements</Text>

              <Text style={styles.sectionDescription}>
                Optional but improves fit recommendations.
              </Text>

              <MeasurementSection
                fields={BODY_MEASUREMENT_FIELDS}
                measurements={measurements}
                setMeasurements={setMeasurements}
              />
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {currentStep === "bodyType" ? (
          <Button
            title="Continue"
            icon="arrow-right"
            onPress={() => setCurrentStep("measurements")}
          />
        ) : (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.backIconButton}
              onPress={() => setCurrentStep("bodyType")}
              activeOpacity={0.8}
            >
              <Feather name="arrow-left" size={22} color={COLORS.primary} />
            </TouchableOpacity>

            <View style={styles.saveButtonContainer}>
              <Button
                title="Save Changes"
                loading={loading}
                onPress={handleSave}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingTop: 4,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    marginBottom: 10,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },

  headerCenter: {
    flex: 1,
    marginHorizontal: 16,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },

  headerSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.secondary,
  },

  placeholder: {
    width: 42,
  },

  content: {
    flexGrow: 1,
    paddingBottom: 10,
  },

  section: {
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },

  sectionDescription: {
    fontSize: 14,
    color: COLORS.secondary,
    lineHeight: 20,
    marginBottom: 18,
  },

  footer: {
    paddingTop: 14,
    paddingBottom: 10,
    backgroundColor: COLORS.background,
  },

  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  backIconButton: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  saveButtonContainer: {
    flex: 1,
  },
});
