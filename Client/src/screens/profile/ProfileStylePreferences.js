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

import { updatePreferences } from "../../services/userService";

import COLORS from "../../theme/colors";

import Button from "../../components/common/Button";
import StepIndicator from "../../components/onboarding/layout/StepIndicator";

import StyleGridSelector from "../../components/onboarding/inputs/StyleGridSelector";
import ColorSelector from "../../components/onboarding/inputs/ColorSelector";
import FitPreferenceSelector from "../../components/onboarding/inputs/FitPreferenceSelector";

export default function ProfileStylePreferences({ navigation }) {
  const { userData, setUserData } = useAuth();

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("styles");
  const [selectedStyles, setSelectedStyles] = useState(
    userData?.preferences?.styles || [],
  );

  const [fitPreference, setFitPreference] = useState(
    userData?.preferences?.fitPreference || "",
  );

  const [favoriteColors, setFavoriteColors] = useState(
    userData?.preferences?.favoriteColors || [],
  );

  const handleSave = async () => {
    try {
      setLoading(true);

      const updatedUser = await updatePreferences({
        styles: selectedStyles,
        favoriteColors,
        fitPreference,
      });
      console.log(updatedUser);

      setUserData(updatedUser);

      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to update style preferences.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={screenStyles.container}>
      <View style={screenStyles.header}>
        <TouchableOpacity
          style={screenStyles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={22} color={COLORS.text} />
        </TouchableOpacity>

        <View style={screenStyles.headerCenter}>
          <Text style={screenStyles.headerTitle}>Style Preferences</Text>

          <Text style={screenStyles.headerSubtitle}>
            Update your fashion preferences
          </Text>
        </View>

        <View style={screenStyles.placeholder} />
      </View>

      <StepIndicator
        currentStep={
          currentStep === "styles" ? 1 : currentStep === "fit" ? 2 : 3
        }
        totalSteps={3}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={screenStyles.content}
      >
        {currentStep === "styles" ? (
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>Style Preferences</Text>

            <Text style={screenStyles.sectionDescription}>
              Select up to 5 styles that best describe your wardrobe.
            </Text>

            <StyleGridSelector
              value={selectedStyles}
              onChange={setSelectedStyles}
            />
          </View>
        ) : currentStep === "fit" ? (
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>Fit Preference</Text>

            <Text style={screenStyles.sectionDescription}>
              Select the clothing fit you prefer most.
            </Text>

            <FitPreferenceSelector
              value={fitPreference}
              onChange={setFitPreference}
            />
          </View>
        ) : (
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>Favorite Colors</Text>

            <Text style={screenStyles.sectionDescription}>
              Select up to 8 colors that best match your wardrobe.
            </Text>

            <ColorSelector
              value={favoriteColors}
              onChange={setFavoriteColors}
            />
          </View>
        )}
      </ScrollView>

      <View style={screenStyles.footer}>
        {currentStep === "styles" ? (
          <Button
            title="Continue"
            icon="arrow-right"
            onPress={() => setCurrentStep("fit")}
          />
        ) : currentStep === "fit" ? (
          <View style={screenStyles.buttonRow}>
            <TouchableOpacity
              style={screenStyles.backIconButton}
              onPress={() => setCurrentStep("styles")}
            >
              <Feather name="arrow-left" size={22} color={COLORS.primary} />
            </TouchableOpacity>

            <View style={screenStyles.saveButtonContainer}>
              <Button
                title="Continue"
                icon="arrow-right"
                onPress={() => setCurrentStep("colors")}
              />
            </View>
          </View>
        ) : (
          <View style={screenStyles.buttonRow}>
            <TouchableOpacity
              style={screenStyles.backIconButton}
              onPress={() => setCurrentStep("fit")}
            >
              <Feather name="arrow-left" size={22} color={COLORS.primary} />
            </TouchableOpacity>

            <View style={screenStyles.saveButtonContainer}>
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

const screenStyles = StyleSheet.create({
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
    marginBottom: 16,
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
    marginBottom: 24,
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
