import React, { useEffect, useMemo, useRef } from "react";
import { Animated, View, Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import BannerVisual from "./BannerVisual";
import styles from "./styles";

const BANNER_CONTENT = {
  savedOutfits: {
    title: "Get inspired with AI",
    subtitle: "Personalized outfit ideas just for you.",
    button: "Explore AI",
  },

  home: {
    badge: "AI STYLIST",
    title: "Today's AI Recommendation",
    subtitle: "Discover fresh outfit combinations picked just for you.",
    button: "Try AI",
  },

  builder: {
    badge: "SMART BUILDER",
    title: "Need inspiration?",
    subtitle: "Let AI finish your outfit with matching wardrobe items.",
    button: "Generate",
  },
};

export default function AIBanner({ variant = "savedOutfits", onPress }) {
  const isCompact = variant === "savedOutfits";
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const content = useMemo(
    () => BANNER_CONTENT[variant] || BANNER_CONTENT.savedOutfits,
    [variant],
  );

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      tension: 80,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        isCompact ? styles.compactContainer : styles.homeContainer,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      {/* Decorative blobs */}

      <View style={styles.blobTop} />

      <View style={styles.blobBottom} />

      {/* Left Content */}

      <View style={styles.content}>
        <Text style={styles.title}>{content.title}</Text>

        <Text style={styles.subtitle}>{content.subtitle}</Text>

        <Animated.View
          style={{
            transform: [{ scale }],
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{content.button}</Text>

            <Ionicons
              name="arrow-forward"
              size={16}
              color="#FFF"
              style={{
                marginLeft: 6,
              }}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Right Side Visual */}

      <BannerVisual />
    </Animated.View>
  );
}
