import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const COLORS = {
  background: "#EFE7DC",
  card: "#F8F4EF",
  border: "#E8D9C9",
  primary: "#4B2E1F",
  secondary: "#8A8178",
  text: "#111",
};

const categories = [
  {
    title: "Tops",
    icon: "shirt-outline",
  },

  {
    title: "Bottoms",
    icon: "albums-outline",
  },

  {
    title: "Shoes",
    icon: "walk-outline",
  },

  {
    title: "Accessories",
    icon: "watch-outline",
  },

  {
    title: "Outerwear",
    icon: "snow-outline",
  },

  {
    title: "Others",
    icon: "cube-outline",
  },
];

export default function AddItemScreen({ navigation }) {
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      navigation.navigate("AIDetectionResults", {
        image: result.assets[0].uri,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Item</Text>
          <TouchableOpacity>
            <Feather name="maximize" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* MAIN CARD */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Add Item Manually</Text>
          <View style={styles.grid}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryCard}
                onPress={() =>
                  navigation.navigate("EditItemDetails", {
                    category: item.title,
                  })
                }
              >
                <Ionicons name={item.icon} size={22} color={COLORS.primary} />
                <Text style={styles.categoryText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={styles.or}>or</Text>
            <View style={styles.line} />
          </View>

          <Text style={styles.sectionTitle}>Add with AI</Text>

          <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
            <View style={styles.uploadIconCircle}>
              <Ionicons name="image-outline" size={34} color={COLORS.primary} />
            </View>
            <Text style={styles.uploadTitle}>Upload from Gallery</Text>
            <Text style={styles.uploadSub}>or drag & drop image here</Text>
            <Text style={styles.uploadSmall}>JPG, PNG up to 10MB</Text>
          </TouchableOpacity>

          {/* AI INFO */}

          <View style={styles.aiInfo}>
            <MaterialCommunityIcons
              name="star-four-points-outline"
              size={20}
              color={COLORS.primary}
            />

            <Text style={styles.aiText}>
              Our AI will detect the item and fill in the details for you.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },

  card: {
    marginTop: 24,
    backgroundColor: COLORS.card,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginBottom: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  categoryCard: {
    width: "31%",
    height: 92,
    borderRadius: 18,
    backgroundColor: "#F8F4EF",
    borderWidth: 1,
    borderColor: "#E7DDD2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },

  categoryText: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
  },

  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },

  or: {
    marginHorizontal: 12,
    color: "#777",
    fontSize: 13,
  },

  uploadBox: {
    height: 250,
    borderRadius: 24,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D7C6B6",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCFAF7",
  },

  uploadIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EFE4D7",
    justifyContent: "center",
    alignItems: "center",
  },

  uploadTitle: {
    marginTop: 22,
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },

  uploadSub: {
    marginTop: 6,
    color: "#777",
    fontSize: 14,
  },

  uploadSmall: {
    marginTop: 10,
    color: "#AAA",
    fontSize: 12,
  },

  aiInfo: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2E7DC",
    padding: 16,
    borderRadius: 18,
  },

  aiText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    color: "#5B4B3A",
    lineHeight: 18,
  },
});
