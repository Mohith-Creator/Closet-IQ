import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import AvatarPicker from "../../inputs/AvatarPicker";

import COLORS from "../../../../theme/colors";

export default function AvatarStep({ avatar, onUploadAvatar }) {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.headerIcon}>
            <Feather name="user" size={20} color={COLORS.primary} />
          </View>

          <Text style={styles.heading}>Add a profile photo</Text>
        </View>

        <Text style={styles.description}>
          Upload a photo to personalize your ClosetIQ profile. You can always
          change it later.
        </Text>
      </View>

      <View style={styles.content}>
        <AvatarPicker
          image={avatar}
          editable
          label="Tap to upload your photo"
          onPress={onUploadAvatar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 8,
    marginBottom: 32,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F7EFE8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  heading: {
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    includeFontPadding: false,
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.secondary,
  },

  content: {
    marginTop: 20,
    alignItems: "center",
  },
});
