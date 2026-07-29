import React from "react";
import { View, Text, StyleSheet } from "react-native";

import TextInputField from "../onboarding/inputs/TextInputField";

import COLORS from "../../theme/colors";

export default function MeasurementSection({
  fields,
  measurements,
  setMeasurements,
}) {
  return (
    <View style={styles.grid}>
      {fields.map((field) => (
        <View
          key={field.key}
          style={[styles.inputContainer, field.half && styles.half]}
        >
          <Text style={styles.label}>{field.label || field.placeholder}</Text>
          <TextInputField
            icon={field.icon}
            placeholder={field.placeholder}
            keyboardType="numeric"
            value={measurements[field.key]}
            onChangeText={(value) =>
              setMeasurements((prev) => ({
                ...prev,
                [field.key]: value,
              }))
            }
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  inputContainer: {
    width: "100%",
    marginBottom: 18,
  },

  half: {
    width: "48%",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
    marginLeft: 2,
  },
});
