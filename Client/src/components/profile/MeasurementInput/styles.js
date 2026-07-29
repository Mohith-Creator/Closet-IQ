import { StyleSheet } from "react-native";

import COLORS from "../../../theme/colors";
import SHADOW from "../../../theme/shadows";

export default StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },

  inputContainer: {
    height: 58,

    borderRadius: 18,

    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.border,

    paddingHorizontal: 18,

    flexDirection: "row",
    alignItems: "center",

    ...SHADOW.card,
  },

  input: {
    flex: 1,

    fontSize: 16,
    fontWeight: "600",

    color: COLORS.text,
  },

  unit: {
    fontSize: 15,
    fontWeight: "700",

    color: COLORS.secondary,
  },
});
