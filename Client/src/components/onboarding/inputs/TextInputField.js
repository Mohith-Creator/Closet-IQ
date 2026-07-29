import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import COLORS from "../../../theme/colors";

export default function TextInputField({
  value,
  onChangeText,
  placeholder,
  icon,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoCorrect = false,
  secureTextEntry = false,
  error,
  helperText,
  editable = true,
  maxLength,
  ...props
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          focused && styles.focused,
          error && styles.errorBorder,
          !editable && styles.disabled,
        ]}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={22}
            color={focused ? COLORS.primary : COLORS.secondary}
            style={styles.icon}
          />
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A79E94"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
          editable={editable}
          maxLength={maxLength}
          style={styles.input}
          selectionColor={COLORS.primary}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </View>
      {!!error ? (
        <Text style={styles.error}>{error}</Text>
      ) : !!helperText ? (
        <Text style={styles.helper}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 18,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },

  focused: {
    borderColor: COLORS.primary,
    backgroundColor: "#FFFCF9",
  },

  errorBorder: {
    borderColor: COLORS.error,
  },

  disabled: {
    opacity: 0.6,
  },

  icon: {
    marginRight: 6,
  },

  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
  },

  helper: {
    marginTop: 6,
    marginLeft: 4,
    fontSize: 13,
    color: COLORS.secondary,
  },

  error: {
    marginTop: 6,
    marginLeft: 4,
    fontSize: 13,
    color: COLORS.error,
  },
});
