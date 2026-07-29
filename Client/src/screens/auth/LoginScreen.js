import React, { useState } from "react";
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
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../firebase";

import logo from "../../../assets/logo1.png";

import useAuthMotion from "../../hooks/useAuthMotion";

import { useAuth } from "../../context/AuthContext";
import { login, googleLogin } from "../../services/authService";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

import Snackbar from "../../components/common/Snackbar";
import GoogleLoginButton from "../../components/common/GoogleLoginButton";

export default function LoginScreen({ navigation }) {
  const { setUserData } = useAuth();

  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    inputCount: 2,
    animateSocial: true,
    animateFooter: true,
  });

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      return showSnackbar("Please enter your email and password.");
    }
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const user = result.user;
      const token = await user.getIdToken();
      await AsyncStorage.setItem("token", token);
      const data = await login({
        uid: user.uid,
        name: user.displayName || "",
        email: user.email,
      });
      setUserData(data);
      showSnackbar("Login successful!", "success");
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
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.card, motion.cardStyle]}>
            <Animated.View style={motion.logoStyle}>
              <Image source={logo} style={styles.logo} resizeMode="contain" />
            </Animated.View>

            <Animated.View style={motion.titleStyle}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Continue your style journey.</Text>
            </Animated.View>

            {/* EMAIL */}

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
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </Animated.View>

            {/* PASSWORD */}

            <Animated.View
              style={[styles.inputContainer, motion.getInputStyle(1)]}
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
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  <Feather
                    name={secure ? "eye-off" : "eye"}
                    size={18}
                    color="#6B4F3B"
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>

            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() => navigation.navigate("Forgot")}
            >
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Part 2 starts here */}
            {/* Login Button */}

            <Animated.View
              style={[
                {
                  width: "100%",
                  marginTop: 14,
                },
                motion.buttonStyle,
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                disabled={loading}
                onPressIn={motion.pressIn}
                onPressOut={motion.pressOut}
                onPress={handleLogin}
              >
                <LinearGradient
                  colors={["#7B5A43", "#5A3E2B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.loginButton}
                >
                  {loading ? (
                    <>
                      <ActivityIndicator color="#FFF" />

                      <Text style={styles.loginButtonText}>Logging In...</Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.loginButtonText}>Log In</Text>

                      <Feather name="arrow-right" color="#FFF" size={18} />
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

            {/* Social */}
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
                <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.replace("Signup")}
                >
                  <Text style={styles.signupLink}>Sign Up</Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
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
    marginTop: 6,
    marginBottom: 18,
  },

  inputContainer: {
    width: "100%",
    marginBottom: 12,
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

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: 2,
    marginBottom: 14,
  },

  forgot: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
  },

  loginButton: {
    width: "100%",
    height: 52,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.primaryButton,
  },

  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 8,
  },

  divider: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.authDivider,
  },

  orText: {
    marginHorizontal: 14,
    color: COLORS.authDividerText,
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 1,
  },

  socialRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  googleWrapper: {
    flex: 1,
    marginRight: 10,
  },

  appleButton: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.authInputBorder,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 2,
    marginBottom: 2,
  },

  footerText: {
    color: COLORS.authSubtitle,
    fontSize: 14,
  },

  signupLink: {
    marginLeft: 6,
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});
