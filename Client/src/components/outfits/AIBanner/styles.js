import { StyleSheet } from "react-native";

import COLORS from "../../../theme/colors";
import SHADOW from "../../../theme/shadows";

export default StyleSheet.create({
  /* Banner */

  container: {
    marginHorizontal: 20,
    marginBottom: 18,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: "#FAF1E8",
    justifyContent: "center",
    overflow: "hidden",
    ...SHADOW.card,
  },

  /* Background */

  blobTop: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    top: -55,
    right: -45,
    backgroundColor: "#FFF7F0",
    opacity: 0.9,
  },

  blobBottom: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    left: -30,
    bottom: -35,
    backgroundColor: "#F5E5D6",
    opacity: 0.75,
  },

  /* Content */

  content: {
    width: "58%",
    zIndex: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.secondary,
  },

  /* Button */

  button: {
    marginTop: 12,
    width: 126,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.small,
  },

  buttonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFF",
  },

  /* Illustration */

  visualContainer: {
    position: "absolute",
    right: -6,
    top: 8,
    bottom: -4,
    width: 170,
    justifyContent: "center",
    alignItems: "center",
  },

  outfitImage: {
    width: 145,
    height: 145,
  },

  /* Circles */

  circleLarge: {
    position: "absolute",
    width: 140,
    height: 118,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 70,
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 90,
    backgroundColor: "rgba(255,255,255,0.55)",
    right: 8,
    top: 10,
  },

  circleSmall: {
    position: "absolute",
    width: 82,
    height: 70,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 55,
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 35,
    backgroundColor: "rgba(244,227,210,0.75)",
    left: 26,
    bottom: 14,
  },

  /* Sparkles */

  sparkleTop: {
    position: "absolute",
    top: 16,
    right: 36,
  },

  sparkleRight: {
    position: "absolute",
    top: 60,
    right: 14,
  },

  sparkleBottom: {
    position: "absolute",
    bottom: 28,
    left: 42,
    zIndex: 3,
  },
});
