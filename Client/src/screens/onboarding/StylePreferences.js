import React, { useState } from "react";
import { Alert } from "react-native";

import { useAuth } from "../../context/AuthContext";

import {
  finishOnboarding,
  updatePreferences,
} from "../../services/userService";

import StepLayout from "../../components/onboarding/layout/StepLayout";
import StylePreferenceStep from "../../components/onboarding/steps/StylePreferenceStep";

import { SECTIONS, STYLE_STEPS } from "../../constants/onboarding";

export default function StylePreferences({ navigation }) {
  const { setUserData } = useAuth();

  const [step, setStep] = useState(0);

  const [preferences, setPreferences] = useState({
    styles: [],
    fitPreference: "",
    favoriteColors: [],
  });

  const stepData = STYLE_STEPS[step];

  const handleNext = async () => {
    // Step 1 - Styles
    if (step === 0 && preferences.styles.length === 0) {
      Alert.alert(
        "Select your styles",
        "Choose at least one style to personalize your recommendations.",
      );
      return;
    }

    // Step 2 - Fit Preference
    if (step === 1 && !preferences.fitPreference) {
      Alert.alert(
        "Select your fit preference",
        "Choose how you usually like your clothes to fit.",
      );
      return;
    }

    // Next internal step
    if (step < STYLE_STEPS.length - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    // Final Save
    try {
      const updatedUser = await updatePreferences({
        styles: preferences.styles,
        fitPreference: preferences.fitPreference,
        favoriteColors: preferences.favoriteColors,
      });

      const onboardedUser = await finishOnboarding();

      setUserData(onboardedUser || updatedUser);
    } catch (error) {
      Alert.alert("Error", "Unable to complete onboarding.");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleSkip = async () => {
    try {
      const onboardedUser = await finishOnboarding();
      setUserData(onboardedUser);
    } catch (error) {
      Alert.alert("Error", "Unable to complete onboarding.");
    }
  };

  return (
    <StepLayout
      section={SECTIONS[2]}
      currentSection={2}
      currentStep={step + 1}
      totalSteps={STYLE_STEPS.length}
      primaryLabel={
        step === STYLE_STEPS.length - 1 ? "Get Started" : "Continue"
      }
      onBack={handleBack}
      onNext={handleNext}
      onSkip={handleSkip}
    >
      <StylePreferenceStep
        step={step}
        preferences={preferences}
        setPreferences={setPreferences}
      />
    </StepLayout>
  );
}
