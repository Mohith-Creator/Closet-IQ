import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../../../styles/editItemStyles";

export default function NotesInput({ value, updateField }) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>Notes</Text>

      <TextInput
        multiline
        value={value}
        placeholder="Add anything useful about this item..."
        placeholderTextColor="#A39A90"
        style={styles.notes}
        onChangeText={(text) => updateField("notes", text)}
      />
    </View>
  );
}
