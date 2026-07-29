import React, { useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "../../../firebase";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

import logo from "../../../assets/logo1.png";
import useAuthMotion from "../../hooks/useAuthMotion";
import Snackbar from "../../components/common/Snackbar";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    type: "error",
  });

  const showSnackbar = (message, type = "error") => {
    setSnackbar({
      visible: true,
      message,
      type,
    });
  };

  const motion = useAuthMotion({
    inputCount: 1,
    animateSocial: false,
    animateFooter: true,
  });

  const handleReset = async () => {
    if (!email.trim()) {
      return showSnackbar("Please enter your email address.");
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email.trim());
      showSnackbar(
        "Password reset link has been sent to your email. Please check your inbox and spam folder",
        "success",
      );
    } catch (error) {
      showSnackbar(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Snackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onDismiss={() =>
          setSnackbar((prev) => ({
            ...prev,
            visible: false,
          }))
        }
      />

      <Animated.View style={[styles.bgCircleOne, motion.backgroundStyle]} />
      <Animated.View style={[styles.bgCircleTwo, motion.backgroundStyle]} />

      <Animated.View style={[styles.backBtn, motion.backButtonStyle]}>
        <TouchableOpacity
          style={styles.backBtnTouchable}
          activeOpacity={0.8}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather name="arrow-left" size={18} color="#3A2C24" />
        </TouchableOpacity>
      </Animated.View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View style={[styles.card, motion.cardStyle]}>
            <Animated.View style={motion.logoStyle}>
              <Image source={logo} style={styles.logo} resizeMode="contain" />
            </Animated.View>

            <Animated.View style={motion.titleStyle}>
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={styles.subtitle}>
                Enter your email to receive a password reset link.
              </Text>
            </Animated.View>

            <Animated.View
              style={[styles.inputContainer, motion.getInputStyle(0)]}
            >
              <View style={styles.inputWrapper}>
                <View style={styles.iconCircle}>
                  <Feather name="mail" size={18} color="#6B4F3B" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#9E8E80"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </Animated.View>

            <Animated.View
              style={[
                {
                  width: "100%",
                },
                motion.buttonStyle,
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                disabled={loading}
                onPressIn={motion.pressIn}
                onPressOut={motion.pressOut}
                onPress={handleReset}
              >
                <LinearGradient
                  colors={["#7B5A43", "#5A3E2B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.resetButton}
                >
                  {loading ? (
                    <>
                      <ActivityIndicator color="#FFF" />
                      <Text style={styles.resetButtonText}>Sending...</Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.resetButtonText}>
                        Send Reset Link
                      </Text>

                      <Feather name="arrow-right" size={18} color="#FFF" />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={motion.footerStyle}>
              <TouchableOpacity
                style={styles.footerContainer}
                onPress={() => navigation.replace("Login")}
              >
                <Text style={styles.footerText}>Remember your password?</Text>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.authBackground,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
  },

  bgCircleOne: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: COLORS.backgroundCircleOne,
    top: -120,
    right: -100,
  },

  bgCircleTwo: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: COLORS.backgroundCircleTwo,
    bottom: -80,
    left: -80,
  },

  backBtn: {
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 999,
    elevation: 999,
  },

  backBtnTouchable: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.floating,
  },

  card: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: COLORS.authCard,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 22,
    alignItems: "center",
    ...SHADOW.authCard,
  },

  logo: {
    width: 95,
    height: 95,
    marginBottom: -4,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.authTitle,
    textAlign: "center",
    letterSpacing: 0.3,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.authSubtitle,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 20,
    paddingHorizontal: 6,
  },

  inputContainer: {
    width: "100%",
    marginBottom: 24,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.authInputBorder,
    paddingHorizontal: 14,
    ...SHADOW.medium,
  },

  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.authInputIconBg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "500",
  },

  resetButton: {
    width: "100%",
    height: 52,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.primaryButton,
  },

  resetButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 8,
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },

  footerText: {
    color: COLORS.authSubtitle,
    fontSize: 14,
  },

  loginLink: {
    marginLeft: 6,
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});
