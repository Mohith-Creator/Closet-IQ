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
import useAvatarUpload from "../../hooks/useAvatarUpload";

import { updateProfile } from "../../services/userService";

import Snackbar from "../../components/common/Snackbar";
import AvatarPicker from "../../components/onboarding/inputs/AvatarPicker";
import TextInputField from "../../components/onboarding/inputs/TextInputField";
import GenderSelector from "../../components/onboarding/inputs/GenderSelector";

import StepIndicator from "../../components/onboarding/layout/StepIndicator";
import Button from "../../components/common/Button";

import COLORS from "../../theme/colors";

export default function PersonalInformation({ navigation }) {
  const { userData, setUserData } = useAuth();

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("photo");
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    icon: "alert-circle",
  });
  const [name, setName] = useState(userData?.name || "");
  const [username, setUsername] = useState(userData?.username || "");
  const [gender, setGender] = useState(userData?.gender || "Male");

  const { avatar, uploading, uploadAvatar } = useAvatarUpload();
  const showSnackbar = (message, icon = "alert-circle") => {
    setSnackbar({
      visible: true,
      message,
      icon,
    });
  };

  const hideSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  const validateUsername = (username) => {
    const value = username.trim();

    if (!value) {
      return "Username is required.";
    }

    if (value.length < 3 || value.length > 20) {
      return "Username must be 3–20 characters.";
    }

    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return "Only letters, numbers and underscores are allowed.";
    }

    return null;
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Name Required", "Please enter your name.");
      return;
    }

    const usernameError = validateUsername(username);

    if (usernameError) {
      showSnackbar(usernameError, "alert-circle");
      return;
    }

    try {
      setLoading(true);

      const updatedUser = await updateProfile({
        name: name.trim(),
        username: username.trim(),
        gender,
      });

      setUserData(updatedUser);

      navigation.goBack();
    } catch (error) {
      showSnackbar(
        error?.response?.data?.message || "Unable to update profile.",
        "alert-circle",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={screenStyles.container}>
      {/* Header */}
      <Snackbar
        visible={snackbar.visible}
        message={snackbar.message}
        icon={snackbar.icon}
        onHide={hideSnackbar}
      />
      <View style={screenStyles.header}>
        <TouchableOpacity
          style={screenStyles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={22} color={COLORS.text} />
        </TouchableOpacity>

        <View style={screenStyles.headerCenter}>
          <Text style={screenStyles.headerTitle}>Personal Information</Text>

          <Text style={screenStyles.headerSubtitle}>
            Update your profile details
          </Text>
        </View>

        <View style={screenStyles.placeholder} />
      </View>

      <StepIndicator
        currentStep={
          currentStep === "photo" ? 1 : currentStep === "details" ? 2 : 3
        }
        totalSteps={3}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={screenStyles.content}
      >
        {currentStep === "photo" ? (
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>Profile Photo</Text>

            <Text style={screenStyles.sectionDescription}>
              Upload a profile picture to personalize your account.
            </Text>

            <AvatarPicker
              image={avatar}
              editable
              label={uploading ? "Uploading..." : "Change Profile Photo"}
              onPress={uploadAvatar}
            />
          </View>
        ) : currentStep === "details" ? (
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>Personal Details</Text>

            <Text style={screenStyles.sectionDescription}>
              Update your display name and choose a unique username.
            </Text>

            <View style={{ marginBottom: 18 }}>
              <Text style={screenStyles.inputLabel}>Full Name</Text>

              <TextInputField
                icon="account-outline"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
              />
            </View>

            <Text style={screenStyles.inputLabel}>Username</Text>

            <TextInputField
              icon="at"
              placeholder="Choose a username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        ) : (
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>Gender</Text>

            <Text style={screenStyles.sectionDescription}>
              Select the gender you identify with.
            </Text>

            <GenderSelector value={gender} onChange={setGender} />
          </View>
        )}
      </ScrollView>

      <View style={screenStyles.footer}>
        {currentStep === "photo" ? (
          <Button
            title="Continue"
            icon="arrow-right"
            onPress={() => setCurrentStep("details")}
          />
        ) : currentStep === "details" ? (
          <View style={screenStyles.buttonRow}>
            <TouchableOpacity
              style={screenStyles.backIconButton}
              activeOpacity={0.8}
              onPress={() => setCurrentStep("photo")}
            >
              <Feather name="arrow-left" size={22} color={COLORS.primary} />
            </TouchableOpacity>

            <View style={screenStyles.saveButtonContainer}>
              <Button
                title="Continue"
                icon="arrow-right"
                onPress={() => setCurrentStep("gender")}
              />
            </View>
          </View>
        ) : (
          <View style={screenStyles.buttonRow}>
            <TouchableOpacity
              style={screenStyles.backIconButton}
              activeOpacity={0.8}
              onPress={() => setCurrentStep("details")}
            >
              <Feather name="arrow-left" size={22} color={COLORS.primary} />
            </TouchableOpacity>

            <View style={screenStyles.saveButtonContainer}>
              <Button
                title="Save Changes"
                icon="check"
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

  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
    marginLeft: 2,
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
