import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Easing,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import logo from "../../../assets/logo1.png";

import COLORS from "../../theme/colors";

export default function WelcomeScreen({ navigation }) {
  const float = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(80)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const featureAnim = useRef(
    [...Array(3)].map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    Animated.spring(cardAnim, {
      toValue: 0,
      friction: 9,
      tension: 60,
      useNativeDriver: true,
    }).start();
    Animated.sequence([
      Animated.delay(700), // Wait for the door animation

      Animated.stagger(
        280, // Slower gap between each feature
        featureAnim.map((anim) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 700,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ),
      ),
    ]).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: -8,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const sparkleStyle = {
    opacity: sparkleAnim,
    transform: [
      {
        scale: sparkleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1.2],
        }),
      },
    ],
  };

  const Feature = ({ icon, title, desc }) => (
    <View style={styles.featureRow}>
      <View style={styles.iconBox}>{icon}</View>
      <View style={styles.textBox}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDesc}>{desc}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Card */}
      <Animated.View
        style={[
          styles.door,
          {
            opacity: cardAnim.interpolate({
              inputRange: [0, 50],
              outputRange: [1, 0],
            }),
            transform: [
              {
                translateY: cardAnim,
              },
              {
                scale: cardAnim.interpolate({
                  inputRange: [0, 50],
                  outputRange: [1, 0.97],
                }),
              },
            ],
          },
        ]}
      >
        {/* Decorative Sparkles */}
        <View style={styles.sparkleContainer}>
          <Animated.View style={sparkleStyle}>
            <Text style={styles.sparkleSmall}>✦</Text>
          </Animated.View>
        </View>
        <View style={styles.sparkleContainerRight}>
          <Animated.View style={sparkleStyle}>
            <Text style={styles.sparkleBig}>✦</Text>
          </Animated.View>
          <Animated.View style={sparkleStyle}>
            <Text style={styles.sparkleSmall}>✦</Text>
          </Animated.View>
        </View>

        {/* App Logo */}
        <View style={styles.logoContainer}>
          <Animated.View
            style={{
              transform: [{ translateY: float }],
            }}
          >
            <Image
              source={logo}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Build your digital wardrobe. Discover your perfect outfit.
        </Text>

        {/* Feature List */}
        <View style={styles.features}>
          <Animated.View
            style={{
              opacity: featureAnim[0],
              transform: [
                {
                  translateY: featureAnim[0].interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, 0],
                  }),
                },
              ],
            }}
          >
            <Feature
              icon={
                <MaterialCommunityIcons
                  name="creation"
                  size={20}
                  color="#5A3E2B"
                />
              }
              title="AI Outfit Suggestions"
              desc="Smart recommendations based on weather, occasion & your style"
            />
          </Animated.View>
          <Animated.View
            style={{
              opacity: featureAnim[1],
              transform: [
                {
                  translateY: featureAnim[1].interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, 0],
                  }),
                },
              ],
            }}
          >
            <Feature
              icon={<Feather name="calendar" size={18} color="#5A3E2B" />}
              title="Plan Your Outfits"
              desc="Plan ahead for your week, events and special occasions"
            />
          </Animated.View>
          <Animated.View
            style={{
              opacity: featureAnim[2],
              transform: [
                {
                  translateY: featureAnim[2].interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, 0],
                  }),
                },
              ],
            }}
          >
            <Feature
              icon={<Feather name="bar-chart-2" size={18} color="#5A3E2B" />}
              title="Insights & Analytics"
              desc="Track your usage, discover insights and make the most of your closet"
            />
          </Animated.View>
        </View>

        {/* Sign Up Button */}
        <Animated.View
          style={{
            width: "100%",
            transform: [{ scale: buttonScale }],
            marginTop: 82,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={() =>
              Animated.spring(buttonScale, {
                toValue: 0.97,
                useNativeDriver: true,
              }).start()
            }
            onPressOut={() =>
              Animated.spring(buttonScale, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
              }).start()
            }
            onPress={() => navigation.navigate("Signup")}
          >
            <LinearGradient
              colors={["#7B5A43", "#5A3E2B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Let's Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Login Link */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={styles.loginLink}>Log in</Text>
          </Text>
        </TouchableOpacity>

        {/* Bottom Fade */}
        <LinearGradient
          pointerEvents="none"
          colors={["transparent", "#FAF8F6"]}
          style={styles.fade}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.authBackground,
  },

  door: {
    flex: 1,
    marginTop: 75,
    marginHorizontal: 8,
    backgroundColor: COLORS.authCard,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    paddingTop: 60,
    paddingHorizontal: 21,
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E9DED4",
    shadowColor: "#3E2A1D",
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 14,
  },

  sparkleContainer: {
    position: "absolute",
    left: 35,
    top: 88,
  },

  sparkleContainerRight: {
    position: "absolute",
    right: 40,
    top: 80,
  },

  sparkleSmall: {
    fontSize: 10,
    color: "#C4A484",
    opacity: 0.7,
  },

  sparkleBig: {
    fontSize: 14,
    color: "#B08968",
    marginTop: 6,
  },

  fade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },

  logoContainer: {
    marginTop: -18,
    marginBottom: 10,
  },

  logoImage: {
    width: 150,
    height: 150,
  },

  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginTop: -8,
    marginBottom: 50,
    color: "#7A7A7A",
    paddingHorizontal: 30,
    lineHeight: 20,
  },

  features: {
    width: "100%",
    marginTop: 16,
    gap: 22,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E8DFD7",
    backgroundColor: "#F7F3EF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    shadowColor: "#8B6A52",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 4,
  },

  textBox: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E2E2E",
  },

  featureDesc: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
    color: "#7A7A7A",
  },

  button: {
    width: "100%",
    paddingVertical: 17,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5A3E2B",
    borderWidth: 1,
    borderColor: "#7B5A43",
    shadowColor: "#5A3E2B",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 12,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.4,
    color: "#FFFDFB",
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    width: "100%",
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2D7CC",
  },

  orText: {
    marginHorizontal: 14,
    color: "#9E8E80",
    fontSize: 12,
    letterSpacing: 1.4,
    fontWeight: "600",
  },

  loginText: {
    marginTop: 16,
    fontSize: 14,
    textAlign: "center",
    color: "#050505",
  },

  loginLink: {
    fontWeight: "600",
    color: "#000000",
  },
});
