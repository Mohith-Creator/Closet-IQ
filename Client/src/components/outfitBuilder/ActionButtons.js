import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

export default function ActionButtons({
  onSave,
  onGenerate,
  canSave,
  editMode = false,
}) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.saveBtn, !canSave && styles.disabledBtn]}
        onPress={onSave}
        disabled={!canSave}
      >
        <Feather
          name={editMode ? "edit-3" : "save"}
          size={16}
          color={COLORS.white}
        />
        <Text style={styles.saveText}>
          {editMode ? "Update Outfit" : "Save Outfit"}
        </Text>
      </TouchableOpacity>

      {!editMode && (
        <TouchableOpacity style={styles.aiBtn} onPress={onGenerate}>
          <Feather name="zap" size={16} color={COLORS.primary} />
          <Text style={styles.aiText}>Generate AI</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const buttonBase = {
  flex: 1,
  height: 50,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 12,
  ...SHADOW.small,
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  saveBtn: {
    ...buttonBase,
    backgroundColor: COLORS.primary,
  },

  disabledBtn: {
    opacity: 0.45,
  },

  aiBtn: {
    ...buttonBase,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },

  saveText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.white,
  },

  aiText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },
});