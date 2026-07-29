import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { useAuth } from "../context/AuthContext";
import { updateAvatar } from "../services/userService";

export default function useAvatarUpload() {
  const { userData, setUserData } = useAuth();

  const [avatar, setAvatar] = useState(userData?.avatar || "");
  const [uploading, setUploading] = useState(false);

  const uploadAvatar = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        alert("Photo permission is required.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.9,
      });

      if (result.canceled) return;

      const image = result.assets[0];

      // Show preview immediately
      setAvatar(image.uri);

      setUploading(true);

      const updatedUser = await updateAvatar(image);

      setUserData(updatedUser);
      console.log(image);
      // Replace local uri with Cloudinary url
      setAvatar(updatedUser.avatar);

      return updatedUser;
    } catch (error) {
      console.log(error);

      alert("Unable to upload avatar.");
    } finally {
      setUploading(false);
    }
  };

  return {
    avatar,
    uploading,
    uploadAvatar,
  };
}
