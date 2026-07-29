import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../../../styles/editItemStyles";

export default function ItemNameInput({ value, error, onChange }) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>
        Item Name
        <Text style={error ? styles.required : styles.normalRequired}>
          {" *"}
        </Text>
      </Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Enter item name"
        placeholderTextColor="#A39A90"
        autoCapitalize="words"
        style={[styles.input, error && styles.errorBorder]}
      />

      {error && (
        <Text style={styles.errorText}>Please enter an item name.</Text>
      )}
    </View>
  );
}
