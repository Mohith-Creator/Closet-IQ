import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

const EXPLANATION_ICONS = {
  "preferred-style": "shirt-outline",
  "favorite-colors": "color-palette-outline",
  "preferred-fit": "body-outline",
  occasion: "calendar-outline",
  "style-harmony": "sparkles-outline",
  "color-harmony": "color-filter-outline",
  season: "sunny-outline",
  material: "layers-outline",
};

export default function AISuggestionCard({ recommendation, onUse }) {
  const { items, scores, explanation = [] } = recommendation;

  const overallScore = scores?.overall?.score ?? 0;
  const compatibilityScore = scores?.compatibility?.score ?? 0;
  const personalizationScore = scores?.personalization?.score ?? 0;

  const primaryExplanation = explanation[0];

  return (
    <View style={styles.card}>
      <View style={styles.contentRow}>
        {/* Preview */}

        <View style={styles.preview}>
          <View style={styles.topSlot}>
            {items?.top && (
              <Image
                source={{ uri: items.top.image }}
                style={styles.topImage}
                resizeMode="contain"
              />
            )}
          </View>

          <View style={styles.bottomSlot}>
            {items?.bottom && (
              <Image
                source={{ uri: items.bottom.image }}
                style={styles.bottomImage}
                resizeMode="contain"
              />
            )}
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.sideSlot}>
              {items?.shoes && (
                <Image
                  source={{ uri: items.shoes.image }}
                  style={styles.smallImage}
                  resizeMode="contain"
                />
              )}
            </View>

            <View style={styles.sideSlot}>
              {items?.accessory && (
                <Image
                  source={{ uri: items.accessory.image }}
                  style={styles.smallImage}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        </View>

        {/* Details */}

        <View style={styles.details}>
          <View style={styles.scoreBadge}>
            <Ionicons name="sparkles" size={12} color={COLORS.white} />

            <Text style={styles.scoreText}>{overallScore}/100</Text>
          </View>

          <Text style={styles.title}>AI Recommendation</Text>

          <Text style={styles.description}>
            {primaryExplanation?.message ??
              "Generated from your wardrobe and preferences."}
          </Text>

          {/* Reasons */}

          <View style={styles.reasonContainer}>
            {explanation.slice(0, 3).map((reason) => (
              <View key={reason.type} style={styles.reasonRow}>
                <Ionicons
                  name={
                    EXPLANATION_ICONS[reason.type] ?? "checkmark-circle-outline"
                  }
                  size={15}
                  color={COLORS.primary}
                />

                <Text style={styles.reasonText}>
                  {reason.title} • +{reason.score}
                </Text>
              </View>
            ))}
          </View>

          {/* Metrics */}

          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{compatibilityScore}</Text>

              <Text style={styles.metricLabel}>Compatibility</Text>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metric}>
              <Text style={styles.metricValue}>{personalizationScore}</Text>

              <Text style={styles.metricLabel}>Personal</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={onUse}>
            <Text style={styles.buttonText}>Save Outfit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.card,
  },

  contentRow: {
    flexDirection: "row",
  },

  preview: {
    width: 135,
    height: 175,
    backgroundColor: COLORS.previewBg,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: "space-between",
  },

  topSlot: {
    alignItems: "center",
  },

  bottomSlot: {
    alignItems: "center",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sideSlot: {
    width: "48%",
    alignItems: "center",
  },

  topImage: {
    width: 72,
    height: 55,
  },

  bottomImage: {
    width: 72,
    height: 60,
  },

  smallImage: {
    width: 46,
    height: 42,
  },

  details: {
    flex: 1,
    marginLeft: 14,
  },

  scoreBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    height: 24,
    borderRadius: 12,
  },

  scoreText: {
    marginLeft: 4,
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
  },

  title: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },

  description: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.secondary,
  },

  reasonContainer: {
    marginTop: 12,
  },

  reasonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  reasonText: {
    marginLeft: 8,
    fontSize: 12,
    color: COLORS.secondary,
    flexShrink: 1,
  },

  metricsRow: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 4,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },

  metric: {
    flex: 1,
    alignItems: "center",
  },

  metricValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },

  metricLabel: {
    marginTop: 2,
    fontSize: 11,
    color: COLORS.secondary,
  },

  metricDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 8,
  },

  button: {
    marginTop: 12,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "600",
  },
});
