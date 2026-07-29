import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { analyzeItem } from "../../services/itemService";

const COLORS = {
  background: "#F7F4EF",
  card: "#FFFFFF",
  border: "#E8DDD2",
  brown: "#4A2C1F",
  secondary: "#73675D",
  chip: "#F2ECE5",
  green: "#22C55E",
};

export default function AIDetectionResultsScreen({ navigation, route }) {
  const image = route.params.image;

  const [loading, setLoading] = useState(true);

  const [aiData, setAiData] = useState(null);

  useEffect(() => {
    runAnalysis();
  }, []);

  const runAnalysis = async () => {
    try {
      const result = await analyzeItem(image);

      setAiData(result.analysis);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const confidence = useMemo(() => {
    if (!aiData?.confidence?.overall) return 0;

    return Math.round(aiData.confidence.overall * 100);
  }, [aiData]);

  const renderChip = (label, icon) => (
    <View key={label} style={styles.chip}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={14}
          color={COLORS.brown}
          style={{ marginRight: 6 }}
        />
      )}

      <Text style={styles.chipText}>{label}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={COLORS.brown} />

          <Text style={styles.loadingTitle}>Analyzing your clothing...</Text>

          <Text style={styles.loadingSub}>
            Gemini AI is identifying your item.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color={COLORS.brown} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>AI Detection</Text>

          <View style={{ width: 24 }} />
        </View>

        {/* IMAGE CARD */}

        <View style={styles.imageCard}>
          <Image
            source={{ uri: image }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        {/* TITLE */}

        <Text style={styles.itemName}>{aiData?.name}</Text>

        <Text style={styles.category}>
          {aiData?.category} • {aiData?.subCategory}
        </Text>

        {/* CONFIDENCE */}

        <View style={styles.confidenceCard}>
          <View style={styles.confidenceTop}>
            <Text style={styles.confidenceTitle}>AI Confidence</Text>

            <Text style={styles.confidenceValue}>{confidence}%</Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${confidence}%`,
                },
              ]}
            />
          </View>
        </View>

        {/* DETAILS */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Primary Color</Text>

            <Text style={styles.infoValue}>{aiData?.primaryColor ?? "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Material</Text>

            <Text style={styles.infoValue}>{aiData?.material ?? "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Pattern</Text>

            <Text style={styles.infoValue}>{aiData?.pattern ?? "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fit</Text>

            <Text style={styles.infoValue}>{aiData?.fit ?? "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sleeve</Text>

            <Text style={styles.infoValue}>{aiData?.sleeveType ?? "-"}</Text>
          </View>
        </View>

        {/* COLORS */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colors</Text>

          <View style={styles.chips}>
            {aiData?.colors?.map((c) => renderChip(c, "palette"))}
          </View>
        </View>

        {/* OCCASIONS */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Occasions</Text>

          <View style={styles.chips}>
            {aiData?.occasion?.map((o) => renderChip(o, "briefcase"))}
          </View>
        </View>

        {/* SEASONS */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seasons</Text>

          <View style={styles.chips}>
            {aiData?.season?.map((s) => renderChip(s, "weather-sunny"))}
          </View>
        </View>

        {/* STYLES */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Style Tags</Text>

          <View style={styles.chips}>
            {aiData?.tags?.styles?.map((s) => renderChip(s, "tag"))}
          </View>
        </View>

        {/* FEATURES */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>

          <View style={styles.chips}>
            {aiData?.tags?.features?.map((f) =>
              renderChip(f, "star-four-points"),
            )}
          </View>
        </View>

        {/* DESCRIPTION */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Description</Text>

          <Text style={styles.description}>{aiData?.description}</Text>
        </View>

        {/* BUTTONS */}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            navigation.navigate("EditItemDetails", {
              image,
              aiData,
            })
          }
        >
          <Text style={styles.primaryText}>Continue & Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryText}>Retake Photo</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
  },

  /* ---------------- Header ---------------- */

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.brown,
  },

  /* ---------------- Loading ---------------- */

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  loadingTitle: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.brown,
  },

  loadingSub: {
    marginTop: 8,
    textAlign: "center",
    color: COLORS.secondary,
    fontSize: 14,
    lineHeight: 22,
  },

  /* ---------------- Image ---------------- */

  imageCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,

    alignItems: "center",
    justifyContent: "center",

    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 4,
  },

  image: {
    width: "100%",
    height: 250,
  },

  /* ---------------- Item ---------------- */

  itemName: {
    marginTop: 22,
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.brown,
  },

  category: {
    marginTop: 6,
    fontSize: 15,
    color: COLORS.secondary,
  },

  /* ---------------- Confidence ---------------- */

  confidenceCard: {
    marginTop: 24,

    backgroundColor: COLORS.card,

    borderRadius: 20,

    padding: 18,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  confidenceTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  confidenceTitle: {
    fontWeight: "600",
    fontSize: 15,
    color: COLORS.secondary,
  },

  confidenceValue: {
    fontWeight: "700",
    color: COLORS.green,
    fontSize: 16,
  },

  progressBackground: {
    marginTop: 14,

    height: 10,

    backgroundColor: "#ECECEC",

    borderRadius: 999,

    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.green,
    borderRadius: 999,
  },

  /* ---------------- Sections ---------------- */

  section: {
    marginTop: 24,

    backgroundColor: COLORS.card,

    borderRadius: 20,

    padding: 18,

    borderWidth: 1,

    borderColor: COLORS.border,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.brown,
    marginBottom: 16,
  },

  /* ---------------- Details ---------------- */

  infoRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: 8,
  },

  infoLabel: {
    fontSize: 15,

    color: COLORS.secondary,
  },

  infoValue: {
    fontSize: 15,

    fontWeight: "600",

    color: COLORS.brown,

    maxWidth: "55%",

    textAlign: "right",
  },

  /* ---------------- Chips ---------------- */

  chips: {
    flexDirection: "row",

    flexWrap: "wrap",
  },

  chip: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: COLORS.chip,

    paddingHorizontal: 14,

    paddingVertical: 9,

    borderRadius: 30,

    marginRight: 10,

    marginBottom: 10,
  },

  chipText: {
    color: COLORS.brown,

    fontWeight: "600",

    fontSize: 13,
  },

  /* ---------------- Description ---------------- */

  description: {
    color: COLORS.secondary,

    lineHeight: 24,

    fontSize: 15,
  },

  /* ---------------- Buttons ---------------- */

  primaryButton: {
    marginTop: 30,

    height: 56,

    borderRadius: 18,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: COLORS.brown,
  },

  primaryText: {
    color: "#FFF",

    fontWeight: "700",

    fontSize: 16,
  },

  secondaryButton: {
    marginTop: 14,

    height: 56,

    borderRadius: 18,

    justifyContent: "center",

    alignItems: "center",

    borderWidth: 1,

    borderColor: COLORS.border,

    backgroundColor: COLORS.card,

    marginBottom: 30,
  },

  secondaryText: {
    color: COLORS.brown,

    fontWeight: "600",

    fontSize: 15,
  },
});