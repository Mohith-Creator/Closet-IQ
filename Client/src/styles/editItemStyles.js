import { StyleSheet } from "react-native";
import COLORS from "../theme/colors";

const styles = StyleSheet.create({
  // Screen Layout
  
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },

  section: {
    marginTop: 24,
  },

  // Upload Image

  uploadCard: {
    marginTop: 24,
    height: 220,
    borderRadius: 26,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D8C8B8",
    backgroundColor: "#FCFAF7",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  previewImage: {
    width: "100%",
    height: "100%",
  },

  uploadCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#EFE4D7",
    justifyContent: "center",
    alignItems: "center",
  },

  uploadTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },

  uploadSub: {
    marginTop: 6,
    color: "#777",
    fontSize: 13,
  },

  // Text Inputs

  label: {
    marginBottom: 14,
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  input: {
    height: 58,
    backgroundColor: "#FFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E6DDD4",
    paddingHorizontal: 18,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },

  notes: {
    minHeight: 130,
    backgroundColor: "#FFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E6DDD4",
    paddingHorizontal: 18,
    paddingTop: 18,
    fontSize: 15,
    color: "#222",
    textAlignVertical: "top",
  },

  // Dropdowns

  dropdown: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E6DDD4",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dropdownLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  dropdownIcon: {
    marginRight: 12,
  },

  dropdownText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  dropdownMenu: {
    marginTop: 8,
    backgroundColor: "#FFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E8DED2",
    overflow: "hidden",
  },

  dropdownItem: {
    height: 52,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1ECE6",
  },

  dropdownItemText: {
    color: "#111",
    fontSize: 14,
  },

  // (Sub Category, Fit, Sleeve, Season)

  optionChip: {
    flexDirection: "row",
    alignItems: "center",
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E7DDD2",
    marginRight: 10,
    marginBottom: 10,
  },

  selectedOptionChip: {
    backgroundColor: "#F8EFE6",
    borderColor: "#C58F5A",
  },

  optionChipIcon: {
    marginRight: 8,
  },

  optionChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },

  selectedOptionChipText: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  // Color Selector

  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  colorCard: {
    width: "31.3%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 10,
    marginRight: "3.05%",
    marginBottom: 8,
  },

  selectedColorCard: {
    backgroundColor: "#F5E8DB",
    borderColor: "#E8D2BE",
  },

  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  colorCardText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    color: "#444",
  },

  selectedColorCardText: {
    color: "#111",
    fontWeight: "600",
  },

  // Occasion Cards

  occasionCard: {
    width: "31.3%",
    height: 76,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: "3.05%",
    marginBottom: 10,
  },

  selectedOccasionCard: {
    backgroundColor: "#F8EFE6",
    borderColor: "#C58F5A",
    borderWidth: 1.5,
  },

  occasionText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
    textAlign: "center",
  },

  selectedOccasionText: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  // Style Tags

  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  tagGroup: {
    marginBottom: 22,
  },

  tagGroupTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 14,
    marginTop: 4,
  },

  tagChip: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E7DDD2",
    marginRight: 10,
    marginBottom: 10,
  },

  selectedTagChip: {
    backgroundColor: "#F8EFE6",
    borderColor: "#C58F5A",
  },

  tagChipIcon: {
    marginRight: 6,
  },

  tagChipText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
  },

  selectedTagChipText: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  // Action Buttons

  button: {
    marginTop: 36,
    height: 58,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  deleteButton: {
    marginTop: 22,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
  },

  deleteText: {
    marginLeft: 8,
    color: "#D14343",
    fontSize: 15,
    fontWeight: "600",
  },

  // Validation

  required: {
    color: "#E53935",
    fontWeight: "700",
  },

  normalRequired: {
    color: "#333", 
    fontWeight: "600",
  },

  errorBorder: {
    borderColor: "#E53935",
    borderWidth: 1.5,
  },

  errorWrap: {
    borderWidth: 1.5,
    borderColor: "#E53935",
    borderRadius: 14,
    padding: 8,
  },

  errorText: {
    color: "#E53935",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 2,
  },
});

export default styles;