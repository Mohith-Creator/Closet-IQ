import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  Animated,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../theme/colors";

export default function ActionSheet({
  visible,
  title,
  subtitle,
  options = [],
  onClose,
}) {
  const translateY = useRef(new Animated.Value(500)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 500,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleOptionPress = (option) => {
    onClose?.();

    setTimeout(() => {
      option.onPress?.();
    }, 180);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayOpacity,
          },
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <SafeAreaView edges={["bottom"]}>
            <View style={styles.handle} />

            {title && <Text style={styles.title}>{title}</Text>}

            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

            {options.map((option, index) => (
              <View key={option.key}>
                <Pressable
                  disabled={option.disabled}
                  onPress={() => handleOptionPress(option)}
                  style={({ pressed }) => [
                    styles.option,
                    pressed && styles.optionPressed,
                    option.disabled && styles.disabledOption,
                  ]}
                >
                  {option.icon ? (
                    <Ionicons
                      name={option.icon}
                      size={22}
                      color={option.color || COLORS.text}
                      style={styles.icon}
                    />
                  ) : (
                    <View style={styles.iconPlaceholder} />
                  )}

                  <Text
                    style={[
                      styles.optionText,
                      {
                        color: option.color || COLORS.text,
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>

                {index !== options.length - 1 && (
                  <View style={styles.separator} />
                )}
              </View>
            ))}

            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && styles.optionPressed,
              ]}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </SafeAreaView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  sheet: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },

  handle: {
    alignSelf: "center",
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D7D7D7",
    marginBottom: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.secondary,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 18,
  },

  option: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 16,
  },

  optionPressed: {
    backgroundColor: "#F5F3EF",
  },

  disabledOption: {
    opacity: 0.45,
  },

  icon: {
    width: 30,
  },

  iconPlaceholder: {
    width: 30,
  },

  optionText: {
    fontSize: 16,
    fontWeight: "600",
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginLeft: 46,
  },

  cancelButton: {
    marginTop: 14,
    height: 54,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },

  cancelText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
  },
});