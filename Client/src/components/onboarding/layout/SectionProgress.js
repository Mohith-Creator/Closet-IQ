import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";

const SECTIONS = ["Personal", "Measurements", "Style"];

export default function SectionProgress({ currentSection = 0 }) {
  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View
          style={[
            styles.progress,
            {
              width: `${(currentSection / (SECTIONS.length - 1)) * 100}%`,
            },
          ]}
        />
      </View>

      {SECTIONS.map((section, index) => {
        const completed = index < currentSection;
        const active = index === currentSection;

        return (
          <View key={section} style={styles.step}>
            <View
              style={[
                styles.circle,
                completed && styles.completedCircle,
                active && styles.activeCircle,
              ]}
            >
              {completed ? (
                <Feather name="check" size={11} color={COLORS.white} />
              ) : active ? (
                <View style={styles.activeDot} />
              ) : null}
            </View>

            <Text
              style={[
                styles.label,
                completed && styles.completedLabel,
                active && styles.activeLabel,
              ]}
            >
              {section}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: 16,
    marginBottom: 32,
  },

  track: {
    position: "absolute",

    top: 10,
    left: "12%",
    right: "12%",

    height: 3,

    backgroundColor: COLORS.border,

    borderRadius: 2,

    zIndex: 0,
  },

  progress: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },

  step: {
    flex: 1,
    alignItems: "center",
    zIndex: 2,
  },

  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,

    backgroundColor: "#DDD5CC",

    justifyContent: "center",
    alignItems: "center",
  },

  activeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,

    backgroundColor: COLORS.primary,
  },

  completedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,

    backgroundColor: COLORS.primary,
  },

  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,

    backgroundColor: COLORS.white,
  },

  label: {
    marginTop: 10,

    fontSize: 12,
    fontWeight: "600",

    color: COLORS.secondary,
    textAlign: "center",
  },

  activeLabel: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  completedLabel: {
    color: COLORS.text,
  },
});