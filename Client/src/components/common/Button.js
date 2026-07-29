import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

export default function Button({
  title,

  onPress,

  loading = false,
  disabled = false,

  icon,

  variant = "primary",
}) {
  const primary = variant === "primary";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.button,
        primary ? styles.primary : styles.secondary,

        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={primary ? COLORS.white : COLORS.primary} />
      ) : (
        <>
          <Text
            style={[
              styles.title,
              primary ? styles.primaryText : styles.secondaryText,
            ]}
          >
            {title}
          </Text>

          {icon && (
            <Feather
              name={icon}
              size={18}
              color={primary ? COLORS.white : COLORS.primary}
              style={{ marginLeft: 8 }}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 58,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    ...SHADOW.medium,
  },

  primary: {
    backgroundColor: COLORS.primary,
  },

  secondary: {
    backgroundColor: COLORS.white,

    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },

  disabled: {
    opacity: 0.6,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  primaryText: {
    color: COLORS.white,
  },

  secondaryText: {
    color: COLORS.primary,
  },
});
