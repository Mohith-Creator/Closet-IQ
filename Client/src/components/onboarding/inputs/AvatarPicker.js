import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";
import SHADOW from "../../../theme/shadows";

export default function AvatarPicker({
  image,
  name = "",
  onPress,
  editable = true,
  label = "Add profile photo",
}) {
  const getInitials = (fullName = "") => {
    if (!fullName.trim()) return "";
    return fullName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.avatarContainer}>
          {image ? (
            <Image
              source={{ uri: image }}
              resizeMode="cover"
              style={styles.avatar}
            />
          ) : getInitials(name) ? (
            <View style={styles.placeholder}>
              <Text style={styles.initials}>{getInitials(name)}</Text>
            </View>
          ) : (
            <Image
              source={require("../../../../assets/avatar.avif")}
              resizeMode="cover"
              style={styles.avatar}
            />
          )}
        </View>
        {editable && (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.cameraButton}
            onPress={onPress}
          >
            <Feather name="camera" size={18} color="#FFF" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 36,
  },

  wrapper: {
    width: 170,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
  },

  initials: {
    fontSize: 46,
    fontWeight: "700",
    color: COLORS.white,
  },

  avatarContainer: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.white,
    overflow: "hidden",
    ...SHADOW.card,
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 81,
  },

  placeholder: {
    width: "100%",
    height: "100%",
    borderRadius: 85,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraButton: {
    position: "absolute",
    bottom: 1,
    right: 8,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: COLORS.background,
    ...SHADOW.small,
  },

  label: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.secondary,
  },
});
