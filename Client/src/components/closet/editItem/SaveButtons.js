import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles/editItemStyles";

export default function SaveButtons({ isEditing, handleSave, handleDelete }) {
  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        activeOpacity={0.9}
      >
        <Text style={styles.buttonText}>
          {isEditing ? "Save Changes" : "Save Item"}
        </Text>
      </TouchableOpacity>

      {isEditing && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={18} color="#D14343" />

          <Text style={styles.deleteText}>Delete Item</Text>
        </TouchableOpacity>
      )}
    </>
  );
}
