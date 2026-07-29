import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Easing,
  Image,
} from "react-native";

import {
  COLORS,
  BackgroundGlow,
  AIRing,
  FloatingParticles,
  GlassOrb,
  FASHION_ICONS,
  LOGO_MARK,
  LOGO_WORDMARK,
} from "./components/SplashShared";

const { width, height } = Dimensions.get("window");

// -----------------------------------------------------------------------
// CONCEPT 2 — "Luxury fashion, wardrobe orbit"
// Same warm bronze ring, but the five garment icons sit on a slow orbit
// path around it, catching soft glow as they pass. Slightly richer
// composition than Concept 1 — this is the "fashion brand" variant.
// -----------------------------------------------------------------------
export default function SplashConceptTwo({ onFinish }) {
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const ringOpacity = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const tagOpacity = useRef(new Animated.Value(0)).current;
  const tagTranslate = useRef(new Animated.Value(12)).current;
  const orbit = useRef(new Animated.Value(0)).current;
  const exitGlow = useRef(new Animated.Value(0)).current;

  const orbitRadius = 175;

  useEffect(() => {
    Animated.parallel([
      // Background
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),

      // Ring appears slightly after background
      Animated.sequence([
        Animated.delay(150),
        Animated.timing(ringOpacity, {
          toValue: 1,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      // Logo
      Animated.sequence([
        Animated.delay(250),
        Animated.parallel([
          Animated.spring(logoScale, {
            toValue: 1,
            friction: 7,
            tension: 80,
            useNativeDriver: true,
          }),
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]),

      // Tagline
      Animated.sequence([
        Animated.delay(500),
        Animated.parallel([
          Animated.timing(tagTranslate, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(tagOpacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
        ]),
      ]),

      // Orbit starts after logo is visible
      Animated.sequence([
        Animated.delay(700),
        Animated.timing(orbit, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Exit
    setTimeout(() => {
      Animated.timing(exitGlow, {
        toValue: 1,
        duration: 700,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(() => onFinish?.());
    }, 2300);
  }, []);

  const exitScale = exitGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 26],
  });
  const exitOpacity = exitGlow.interpolate({
    inputRange: [0, 0.15, 1],
    outputRange: [0, 1, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{ opacity: bgOpacity, ...StyleSheet.absoluteFillObject }}
      >
        <BackgroundGlow width={width} height={height} />
      </Animated.View>

      <FloatingParticles width={width} height={height} count={28} />

      <GlassOrb size={110} top={height * 0.08} left={-40} />
      <GlassOrb size={70} bottom={height * 0.16} right={-25} />

      <View style={styles.center}>
        <Animated.View style={{ opacity: ringOpacity }}>
          <AIRing size={300} />
        </Animated.View>

        {/* five garment icons orbiting the ring, each offset around the circle */}
        {FASHION_ICONS.map((Icon, i) => {
          const baseAngle = (360 / FASHION_ICONS.length) * i;
          const angle = orbit.interpolate({
            inputRange: [0, 1],
            outputRange: [`${baseAngle}deg`, `${baseAngle + 360}deg`],
          });
          return (
            <Animated.View
              key={i}
              style={{
                position: "absolute",
                width: orbitRadius * 2,
                height: orbitRadius * 2,
                alignItems: "center",
                transform: [{ rotate: angle }],
              }}
            >
              <View style={{ position: "absolute", top: 0 }}>
                <Icon size={20} opacity={0.5} />
              </View>
            </Animated.View>
          );
        })}

        <View style={styles.logoWrap}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              },
            ]}
          >
            <Image
              source={LOGO_MARK}
              resizeMode="contain"
              style={styles.logoMark}
            />

            <Image
              source={LOGO_WORDMARK}
              resizeMode="contain"
              style={styles.logoWordmark}
            />
          </Animated.View>
          <Animated.View
            style={{
              opacity: tagOpacity,
              transform: [{ translateY: tagTranslate }],
              alignItems: "center",
              marginTop: 14,
            }}
          >
            <Text style={styles.tagline}>Your AI Fashion Companion</Text>
          </Animated.View>
        </View>
      </View>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.exitGlow,
          { opacity: exitOpacity, transform: [{ scale: exitScale }] },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  logoWrap: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoMark: {
    width: 64,
    height: 64,
    marginBottom: 10,
  },
  logoWordmark: {
    width: 155,
    height: 50,
    marginBottom: -12,
  },
  tagline: {
    fontSize: 10,
    letterSpacing: 0.6,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  exitGlow: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    top: height * 0.42 - 20,
    left: width / 2 - 20,
    backgroundColor: COLORS.backgroundCenter,
  },
});
