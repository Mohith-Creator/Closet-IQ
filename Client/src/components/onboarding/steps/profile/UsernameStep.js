import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import TextInputField from "../../inputs/TextInputField";

import COLORS from "../../../../theme/colors";

export default function UsernameStep({ profile, setProfile }) {
  const username = profile.username || "";
  const isValid = username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
  const rules = [
    {
      icon: "user",
      text: "3–20 characters",
    },
    {
      label: "Aa",
      text: "Letters, numbers and underscores only",
    },
    {
      icon: "shield",
      text: "No spaces or special characters",
    },
    {
      icon: "award",
      text: "Make it unique and easy to remember!",
    },
  ];

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.headerIcon}>
            <Feather name="user" size={22} color={COLORS.primary} />
          </View>
          <Text style={styles.heading}>Create your username</Text>
        </View>
        <Text style={styles.description}>
          This will be your unique identity on ClosetIQ.{" \n "}You can always
          change it later.
        </Text>
      </View>
      <View style={{ marginTop: 32 }}>
        <TextInputField
          icon="at"
          placeholder="Enter your username"
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={(value) =>
            setProfile((prev) => ({
              ...prev,
              username: value,
            }))
          }
          rightIcon={
            isValid ? (
              <Feather name="check-circle" size={20} color={COLORS.success} />
            ) : null
          }
        />
      </View>
      <View style={styles.rules}>
        {rules.map((rule) => (
          <View key={rule.text} style={styles.ruleRow}>
            <View style={styles.iconCircle}>
              {rule.label ? (
                <Text style={styles.iconLabel}>{rule.label}</Text>
              ) : (
                <Feather name={rule.icon} size={15} color={COLORS.primary} />
              )}
            </View>
            <Text style={styles.ruleText}>{rule.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 8,
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

  rules: {
    marginTop: 28,
  },

  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F7EFE8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  iconLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primary,
  },

  ruleText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#5F5A56",
    lineHeight: 22,
  },
});
