import React, { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

import COLORS from "../../theme/colors";

const DURATION = 2500;
const SCREEN_WIDTH = Dimensions.get("window").width;
export default function Snackbar({
  visible,
  message,
  icon = "checkmark-circle",
  onHide,
}) {
  const position = useRef(new Animated.ValueXY({ x: 0, y: -80 })).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const hideSnackbar = useCallback(() => {
    Animated.parallel([
      Animated.timing(position, {
        toValue: { x: 0, y: -80 },
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();

      position.setValue({ x: 0, y: -80 });
      opacity.setValue(0);
    });
  }, [opacity, position, onHide]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dx) > 15 || Math.abs(gesture.dy) > 15;
      },
      onPanResponderMove: (_, gesture) => {
        position.setValue({
          x: gesture.dx,
          y: Math.min(gesture.dy, 0),
        });
      },
      onPanResponderRelease: (_, gesture) => {
        const dismiss = gesture.dy < -40 || gesture.dx > 60 || gesture.dx < -60;

        if (dismiss) {
          hideSnackbar();
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (!visible) return;
    Animated.parallel([
      Animated.timing(position, {
        toValue: { x: 0, y: 0 },
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      hideSnackbar();
    }, DURATION);

    return () => clearTimeout(timer);
  }, [visible, hideSnackbar, position, opacity]);

  if (!visible) {
    return null;
  }

  return (
    <SafeAreaView pointerEvents="box-none" style={styles.safeArea}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.container,
          {
            opacity,
            transform: [{ translateX: position.x }, { translateY: position.y }],
          },
        ]}
      >
        <Ionicons name={icon} size={22} color="#FFF" />

        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: "center",
  },

  container: {
    marginTop: 12,
    width: SCREEN_WIDTH - 32,
    maxWidth: 420,
    minHeight: 52,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },

  message: {
    flexShrink: 1,
    marginLeft: 10,
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
});
