import React from "react";
import { View, Text, StyleSheet } from "react-native";

import OnboardingLayout from "./OnboardingLayout";
import StepHeader from "./StepHeader";
import SectionProgress from "./SectionProgress";
import StepIndicator from "./StepIndicator";
import StepNavigation from "./StepNavigation";

import COLORS from "../../../theme/colors";

export default function StepLayout({
  section,
  currentSection,
  currentStep,
  totalSteps,
  title,
  subtitle,
  children,
  primaryLabel = "Continue",
  showBack = true,
  showHeader = true,
  onBack,
  onNext,
  onSkip,
}) {
  return (
    <OnboardingLayout>
      <StepHeader title={section} showBack={showBack} onBack={onBack} />
      {/* <SectionProgress currentSection={currentSection} /> */}
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      <View style={styles.content}>
        <View style={styles.children}>{children}</View>
      </View>
      <StepNavigation
        primaryLabel={primaryLabel}
        onNext={onNext}
        onSkip={onSkip}
      />
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.secondary,
    marginBottom: 36,
  },

  children: {
    flex: 1,
  },
});
