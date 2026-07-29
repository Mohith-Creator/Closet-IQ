import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../../../firebase";
import logo from "../../../assets/logo1.png";

import { useAuth } from "../../context/AuthContext";

import useAuthMotion from "../../hooks/useAuthMotion";

import { signup, googleLogin } from "../../services/authService";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

import Snackbar from "../../components/common/Snackbar";
import GoogleLoginButton from "../../components/common/GoogleLoginButton";

export default function SignupScreen({ navigation }) {
  const { setUserData } = useAuth();

  const [secure, setSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    inputCount: 4,
    animateSocial: true,
    animateFooter: true,
  });

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      return showSnackbar("All fields are required.");
    }
    if (password !== confirmPassword) {
      return showSnackbar("Passwords do not match.");
    }
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const user = result.user;
      const token = await user.getIdToken();
      await AsyncStorage.setItem("token", token);
      await updateProfile(user, {
        displayName: name.trim(),
      });
      const data = await signup({
        uid: user.uid,
        name: name.trim(),
        email: user.email,
      });
      setUserData(data);
      showSnackbar("Account created successfully!", "success");
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
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={18} color="#3A2C24" />
        </TouchableOpacity>
      </Animated.View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              flexGrow: 1,
              justifyContent: "center",
            },
          ]}
        >
          <Animated.View style={[styles.card, motion.cardStyle]}>
            <Animated.View style={motion.logoStyle}>
              <Image source={logo} style={styles.logo} resizeMode="contain" />
            </Animated.View>

            <Animated.View style={motion.titleStyle}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Join ClosetIQ and build your digital wardrobe.
              </Text>
            </Animated.View>

            {/* ---------- Name Input starts here ---------- */}
            {/* Full Name */}
            <Animated.View
              style={[styles.inputContainer, motion.getInputStyle(0)]}
            >
              <View style={styles.inputWrapper}>
                <View style={styles.iconCircle}>
                  <Feather name="user" size={18} color="#6B4F3B" />
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#9E8E80"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </Animated.View>

            {/* Email */}
            <Animated.View
              style={[styles.inputContainer, motion.getInputStyle(1)]}
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

            {/* Password */}
            <Animated.View
              style={[styles.inputContainer, motion.getInputStyle(2)]}
            >
              <View style={styles.inputWrapper}>
                <View style={styles.iconCircle}>
                  <Feather name="lock" size={18} color="#6B4F3B" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#9E8E80"
                  secureTextEntry={secure}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSecure(!secure)}
                >
                  <Feather
                    name={secure ? "eye-off" : "eye"}
                    size={18}
                    color="#6B4F3B"
                  />
                </TouchableOpacity>
              </View>

              {/* Password Strength */}
              {password.length > 0 && (
                <View style={styles.strengthWrapper}>
                  <View style={styles.strengthBar}>
                    <View
                      style={[
                        styles.strengthFill,
                        {
                          width:
                            password.length < 5
                              ? "30%"
                              : password.length < 8
                                ? "65%"
                                : "100%",
                          backgroundColor:
                            password.length < 5
                              ? "#E57373"
                              : password.length < 8
                                ? "#F4B400"
                                : "#4CAF50",
                        },
                      ]}
                    />
                  </View>

                  <Text style={styles.strengthText}>
                    {password.length < 5
                      ? "Weak Password"
                      : password.length < 8
                        ? "Good Password"
                        : "Strong Password"}
                  </Text>
                </View>
              )}
            </Animated.View>

            {/* Confirm Password */}
            <Animated.View
              style={[styles.inputContainer, motion.getInputStyle(3)]}
            >
              <View style={styles.inputWrapper}>
                <View style={styles.iconCircle}>
                  <Feather name="lock" size={18} color="#6B4F3B" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#9E8E80"
                  secureTextEntry={confirmSecure}
                  autoCapitalize="none"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setConfirmSecure(!confirmSecure)}
                >
                  <Feather
                    name={confirmSecure ? "eye-off" : "eye"}
                    size={18}
                    color="#6B4F3B"
                  />
                </TouchableOpacity>
              </View>

              {confirmPassword.length > 0 && (
                <View style={styles.matchRow}>
                  <Feather
                    name={
                      confirmPassword === password ? "check-circle" : "x-circle"
                    }
                    size={14}
                    color={confirmPassword === password ? "#4CAF50" : "#E57373"}
                  />
                  <Text
                    style={[
                      styles.matchText,
                      {
                        color:
                          confirmPassword === password ? "#4CAF50" : "#E57373",
                      },
                    ]}
                  >
                    {confirmPassword === password
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </Text>
                </View>
              )}
            </Animated.View>

            {/* Create Account Button */}
            <Animated.View
              style={[
                {
                  marginTop: 20,
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
                onPress={handleSignup}
              >
                <LinearGradient
                  colors={["#7B5A43", "#5A3E2B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.signupButton}
                >
                  {loading ? (
                    <>
                      <ActivityIndicator color="#FFFFFF" size="small" />
                      <Text style={styles.signupButtonText}>
                        Creating Account...
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.signupButtonText}>
                        Create Account
                      </Text>

                      <Feather name="arrow-right" size={18} color="#FFF" />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Divider */}

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            {/* Social Buttons */}

            <Animated.View style={motion.socialStyle}>
              <View style={styles.socialRow}>
                <View style={styles.googleWrapper}>
                  <GoogleLoginButton
                    onLoginSuccess={async (user) => {
                      await googleLogin({
                        uid: user.uid,
                        name: user.name,
                        email: user.email,
                      });
                    }}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.appleButton}
                >
                  <MaterialCommunityIcons name="apple" size={20} color="#222" />
                  <Text style={styles.appleText}>Apple</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Footer */}
            <Animated.View style={motion.footerStyle}>
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.replace("Login")}
                >
                  <Text style={styles.loginLink}>Log In</Text>
                </TouchableOpacity>
              </View>
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
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 36,
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
    top: 42,
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
    marginTop: 70,
    paddingTop: 20,
    paddingBottom: 18,
    paddingHorizontal: 20,
    alignItems: "center",
    ...SHADOW.authCard,
  },

  logo: {
    width: 95,
    height: 95,
    marginBottom: -4,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.authTitle,
    textAlign: "center",
    letterSpacing: 0.3,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.authSubtitle,
    textAlign: "center",
    lineHeight: 23,
    marginTop: 6,
    marginBottom: 25,
  },

  inputContainer: {
    width: "100%",
    marginBottom: 14,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.authInputBorder,
    borderRadius: 15,
    paddingHorizontal: 16,
    height: 52,
    ...SHADOW.medium,
  },

  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: COLORS.authInputIconBg,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "500",
  },

  strengthWrapper: {
    marginTop: 10,
    paddingHorizontal: 4,
  },

  strengthBar: {
    height: 6,
    backgroundColor: COLORS.inactive,
    borderRadius: 999,
    overflow: "hidden",
  },

  strengthFill: {
    height: "100%",
    borderRadius: 999,
  },

  strengthText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textLight,
  },

  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 4,
  },

  matchText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "600",
  },

  divider: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 18,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.authDivider,
  },

  orText: {
    marginHorizontal: 16,
    color: COLORS.authDividerText,
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 1,
  },

  signupButton: {
    height: 52,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.authButtonShadow,
    ...SHADOW.primaryButton,
  },

  signupButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.4,
    marginHorizontal: 8,
  },

  socialRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  googleWrapper: {
    flex: 1,
    marginRight: 10,
  },

  appleButton: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.softBorder,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...SHADOW.medium,
  },

  appleText: {
    marginLeft: 8,
    color: COLORS.authTitle,
    fontSize: 15,
    fontWeight: "600",
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -4,
    marginBottom: 7,
  },

  footerText: {
    color: COLORS.authSubtitle,
    fontSize: 15,
  },

  loginLink: {
    marginLeft: 6,
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "700",
  },
});
