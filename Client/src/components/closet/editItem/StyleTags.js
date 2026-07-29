import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles/editItemStyles";

import COLORS from "../../../theme/colors";

export default function StyleTags({ groups, selectedStyles, toggleStyle }) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>Style Tags</Text>

      {groups.map((group) => {
        const orderedTags = [
          ...group.tags.filter((tag) => selectedStyles.includes(tag)),
          ...group.tags.filter((tag) => !selectedStyles.includes(tag)),
        ];

        return (
          <View key={group.title} style={styles.tagGroup}>
            <Text style={styles.tagGroupTitle}>{group.title}</Text>

            <View style={styles.wrap}>
              {orderedTags.map((tag) => {
                const selected = selectedStyles.includes(tag);

                return (
                  <TouchableOpacity
                    key={tag}
                    style={[styles.tagChip, selected && styles.selectedTagChip]}
                    onPress={() => toggleStyle(tag)}
                  >
                    <Ionicons
                      name={
                        selected ? "checkmark-circle" : "add-circle-outline"
                      }
                      size={15}
                      color={selected ? COLORS.primary : "#8B7B6A"}
                      style={styles.tagChipIcon}
                    />

                    <Text
                      style={[
                        styles.tagChipText,
                        selected && styles.selectedTagChipText,
                      ]}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}
