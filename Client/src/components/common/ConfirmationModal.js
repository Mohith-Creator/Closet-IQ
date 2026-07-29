import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import COLORS from "../../theme/colors";

export default function ConfirmationModal({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon = "help-circle-outline",
  iconType = "ion",
  destructive = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View
            style={[styles.iconCircle, destructive && styles.destructiveCircle]}
          >
            {iconType === "mc" ? (
              <MaterialCommunityIcons
                name={icon}
                size={32}
                color={destructive ? "#E74C3C" : COLORS.primary}
              />
            ) : iconType === "feather" ? (
              <Feather
                name={icon}
                size={32}
                color={destructive ? "#E74C3C" : COLORS.primary}
              />
            ) : (
              <Ionicons
                name={icon}
                size={32}
                color={destructive ? "#E74C3C" : COLORS.primary}
              />
            )}
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, destructive && styles.deleteButton]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  container: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },

  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F4F2EF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  destructiveCircle: {
    backgroundColor: "#FDECEC",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },

  message: {
    fontSize: 15,
    color: COLORS.secondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 26,
  },

  buttons: {
    flexDirection: "row",
    width: "100%",
  },

  cancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  confirmButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },

  deleteButton: {
    backgroundColor: "#E74C3C",
  },

  cancelText: {
    fontWeight: "600",
    color: COLORS.text,
  },

  confirmText: {
    fontWeight: "700",
    color: "#FFF",
  },
});