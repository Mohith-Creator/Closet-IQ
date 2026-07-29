import React, { useState } from "react";
import { Alert } from "react-native";

import { useAuth } from "../../context/AuthContext";

import { updateMeasurements } from "../../services/userService";

import StepLayout from "../../components/onboarding/layout/StepLayout";
import MeasurementsStep from "../../components/onboarding/steps/MeasurementsStep";

import { SECTIONS, MEASUREMENT_STEPS } from "../../constants/onboarding";

export default function BodyMeasurements({ navigation }) {
  const { setUserData } = useAuth();

  const [step, setStep] = useState(0);

  const [measurements, setMeasurements] = useState({
    height: "",
    heightUnit: "cm",

    shoeSize: "",
    shoeSizeUnit: "UK",

    bodyType: "Average",
  });

  const handleNext = async () => {
    // Height
    if (step === 0 && !measurements.height) {
      Alert.alert("Height Required", "Please select your height.");
      return;
    }

    // Shoe Size
    if (step === 1 && !measurements.shoeSize) {
      Alert.alert("Shoe Size Required", "Please select your shoe size.");
      return;
    }

    // Body Type
    if (step === 2 && !measurements.bodyType) {
      Alert.alert("Body Type Required", "Please select your body type.");
      return;
    }

    // Next internal step
    if (step < MEASUREMENT_STEPS.length - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    try {
      const updatedUser = await updateMeasurements({
        measurements,
      });

      setUserData(updatedUser);

      navigation.navigate("StylePreferences");
    } catch (error) {
      Alert.alert("Error", "Unable to save measurements.");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleSkip = () => {
    navigation.navigate("StylePreferences");
  };

  return (
    <StepLayout
      section={SECTIONS[1]}
      currentSection={1}
      currentStep={step + 1}
      totalSteps={MEASUREMENT_STEPS.length}
      primaryLabel={
        step === MEASUREMENT_STEPS.length - 1 ? "Next" : "Continue"
      }
      showHeader={false}
      onBack={handleBack}
      onNext={handleNext}
      onSkip={handleSkip}
    >
      <MeasurementsStep
        step={step}
        measurements={measurements}
        setMeasurements={setMeasurements}
      />
    </StepLayout>
  );
}
