import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles/editItemStyles";
export default function ImageUploader({
  image,
  error,
  pickImage,
  COLORS,
}) {
  return (
    <TouchableOpacity
      style={[styles.uploadCard, error && styles.errorBorder]}
      onPress={pickImage}
      activeOpacity={0.9}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.previewImage}
          resizeMode="contain"
        />
      ) : (
        <>
          <View style={styles.uploadCircle}>
            <Ionicons name="image-outline" size={34} color={COLORS.primary} />
          </View>

          <Text style={styles.uploadTitle}>Upload Item Photo</Text>

          <Text style={styles.uploadSub}>Tap to select image</Text>
        </>
      )}

      {error && <Text style={styles.errorText}>Please upload an image.</Text>}
    </TouchableOpacity>
  );
}
