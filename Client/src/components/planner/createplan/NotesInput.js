import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";
import { NOTES_PLACEHOLDER } from "../../../constants/planner/plannerConstants";

export default function NotesInput({ value, onChangeText, maxLength = 200 }) {
  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons
            name="document-text-outline"
            size={22}
            color={COLORS.primary}
          />

          <Text style={styles.title}>Notes</Text>
        </View>
      </View>

      {/* Input */}

      <View style={styles.inputCard}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={NOTES_PLACEHOLDER}
          placeholderTextColor={COLORS.secondary}
          multiline
          maxLength={maxLength}
          textAlignVertical="top"
          style={styles.input}
        />

        <Text style={styles.counter}>
          {value.length}/{maxLength}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  counter: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.secondary,
  },

  inputCard: {
    minHeight: 150,
    backgroundColor: COLORS.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 34, // extra space for counter
    position: "relative",
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 24,
    padding: 0,
  },

  counter: {
    position: "absolute",
    right: 18,
    bottom: 14,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.secondary,
  },
});
