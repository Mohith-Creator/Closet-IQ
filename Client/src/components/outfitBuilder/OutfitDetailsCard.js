import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

import { OUTFIT_OCCASIONS } from "../../constants/closet/wardrobeConstants";

export default function OutfitDetailsCard({
  outfitName,
  setOutfitName,
  occasion,
  setOccasion,
  notes,
  setNotes,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Feather name="file-text" size={18} color={COLORS.primaryDark} />

          <Text style={styles.title}>OUTFIT DETAILS</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowLabel}>Outfit Name</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="e.g. Weekend Brunch Look"
            value={outfitName}
            onChangeText={setOutfitName}
            style={styles.input}
          />

          <TouchableOpacity style={styles.editBtn}>
            <Feather name="edit-2" size={14} color={COLORS.primaryDark} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowLabel}>Occasion</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {OUTFIT_OCCASIONS.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.chip, occasion === item && styles.activeChip]}
              onPress={() => setOccasion(item)}
            >
              <Text
                style={[
                  styles.chipText,
                  occasion === item && styles.activeChipText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.row}>
        <Text style={[styles.rowLabel, styles.notesLabel]}>Notes</Text>

        <View style={styles.notesWrapper}>
          <TextInput
            multiline
            value={notes}
            onChangeText={setNotes}
            style={styles.notes}
            placeholder="Add a note about this outfit..."
            maxLength={200}
          />

          <Text style={styles.counter}>{notes.length}/200</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.card,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },

  rowLabel: {
    width: 85,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
    paddingTop: 10,
  },

  inputWrapper: {
    flex: 1,
    position: "relative",
  },

  input: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 36,
    fontSize: 12,
    color: COLORS.text,
  },

  editBtn: {
    position: "absolute",
    right: 14,
    top: 12,
  },

  chips: {
    paddingRight: 12,
  },

  chip: {
    height: 30,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginRight: 8,
  },

  activeChip: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
    ...SHADOW.small,
  },

  chipText: {
    fontSize: 11,
    color: COLORS.text,
  },

  activeChipText: {
    color: COLORS.white,
    fontWeight: "600",
  },

  notesWrapper: {
    flex: 1,
    position: "relative",
  },

  notes: {
    height: 95,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 22,
    fontSize: 12,
    color: COLORS.text,
    textAlignVertical: "top",
  },

  counter: {
    position: "absolute",
    right: 10,
    bottom: 8,
    fontSize: 10,
    color: COLORS.placeholder,
  },
});
