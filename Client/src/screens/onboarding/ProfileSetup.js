import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

import { useAuth } from "../../context/AuthContext";
import useAvatarUpload from "../../hooks/useAvatarUpload";

import { updateProfile } from "../../services/userService";

import Snackbar from "../../components/common/Snackbar";
import StepLayout from "../../components/onboarding/layout/StepLayout";
import ProfileStep from "../../components/onboarding/steps/ProfileStep";

import { PROFILE_STEPS, SECTIONS } from "../../constants/onboarding";

export default function ProfileSetup({ navigation }) {
  const { userData, setUserData } = useAuth();
  const { avatar, uploadAvatar } = useAvatarUpload();

  const [step, setStep] = useState(0);
  const stepData = PROFILE_STEPS[step];
  const [profile, setProfile] = useState({
    username: "",
    gender: "Male",
  });
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    icon: "alert-circle",
  });

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

  const handleUploadAvatar = async () => {
    const uploadedAvatar = await uploadAvatar();
    if (uploadedAvatar) {
      setProfile((prev) => ({
        ...prev,
        avatar: uploadedAvatar,
      }));
    }
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

  useEffect(() => {
    if (!userData) return;
    setProfile({
      username: userData.username || "",
      gender: userData.gender || "Male",
      avatar: userData.avatar || "",
    });
  }, [userData]);

  const handleNext = async () => {
    if (step === 0) {
      const error = validateUsername(profile.username);

      if (error) {
        showSnackbar(error, "alert-circle");
        return;
      }
    }

    if (step < PROFILE_STEPS.length - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    try {
      const updatedUser = await updateProfile({
        username: profile.username.trim(),
        gender: profile.gender,
      });

      setUserData(updatedUser);
      navigation.navigate("BodyMeasurements");
    } catch (error) {
      showSnackbar(
        error?.response?.data?.message || "Unable to update profile.",
        "alert-circle",
      );
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
    navigation.navigate("BodyMeasurements");
  };

  return (
    <>
      <StepLayout
        section={SECTIONS[0]}
        currentSection={0}
        currentStep={step + 1}
        totalSteps={PROFILE_STEPS.length}
        title={stepData.title}
        subtitle={stepData.subtitle}
        primaryLabel={step === PROFILE_STEPS.length - 1 ? "Next" : "Continue"}
        showBack={step === 0 ? false : true}
        showHeader={false}
        onBack={handleBack}
        onNext={handleNext}
        onSkip={handleSkip}
      >
        <ProfileStep
          step={step}
          profile={profile}
          setProfile={setProfile}
          avatar={avatar}
          onUploadAvatar={uploadAvatar}
        />
      </StepLayout>

      <Snackbar
        visible={snackbar.visible}
        message={snackbar.message}
        icon={snackbar.icon}
        onHide={hideSnackbar}
      />
    </>
  );
}
