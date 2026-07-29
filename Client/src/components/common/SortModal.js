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

export default function SortModal({
  visible,
  title = "Sort",
  subtitle,
  options = [],
  selected,
  onSelect,
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

  const handleSelect = (key) => {
    onClose?.();

    setTimeout(() => {
      onSelect?.(key);
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

            <Text style={styles.title}>{title}</Text>

            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

            {options.map((option, index) => (
              <View key={option.key}>
                <Pressable
                  onPress={() => handleSelect(option.key)}
                  style={({ pressed }) => [
                    styles.option,
                    pressed && styles.optionPressed,
                  ]}
                >
                  <Ionicons
                    name={
                      selected === option.key
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={22}
                    color={
                      selected === option.key
                        ? COLORS.primary
                        : COLORS.secondary
                    }
                    style={styles.radio}
                  />

                  <Text
                    style={[
                      styles.optionText,
                      selected === option.key && styles.selectedOptionText,
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
    marginTop: 6,
    marginBottom: 18,
    textAlign: "center",
    color: COLORS.secondary,
    fontSize: 14,
  },

  option: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 16,
  },

  optionPressed: {
    backgroundColor: COLORS.background,
  },

  radio: {
    width: 30,
  },

  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
  },

  selectedOptionText: {
    fontWeight: "700",
    color: COLORS.primary,
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