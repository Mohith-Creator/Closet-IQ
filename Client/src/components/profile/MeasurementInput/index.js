import React from "react";
import { View, Text, TextInput } from "react-native";

import styles from "./styles";

export default function MeasurementInput({
  label,
  value,
  onChangeText,
  unit = "cm",
  keyboardType = "numeric",
  placeholder = "0",
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#AAA"
          keyboardType={keyboardType}
          style={styles.input}
        />

        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
}