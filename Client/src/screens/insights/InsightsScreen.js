import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

export default function InsightsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.iconCircle}>
            <Feather name="bar-chart-2" size={60} color={COLORS.primary} />
          </View>

          <View style={styles.badge}>
            <Feather name="clock" size={14} color={COLORS.white} />
            <Text style={styles.badgeText}>Coming Soon</Text>
          </View>
        </View>

        <Text style={styles.title}>Wardrobe Insights</Text>

        <Text style={styles.subtitle}>
          Gain valuable insights into your wardrobe usage, outfit habits,
          favorite styles, and clothing trends to make smarter fashion
          decisions.
        </Text>

        <View style={styles.featuresCard}>
          <Feature icon="pie-chart" title="Wardrobe Usage Analytics" />
          <Feature icon="trending-up" title="Style & Wear Trends" />
          <Feature icon="award" title="Most Worn Items" />
          <Feature icon="activity" title="Personal Style Score" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Feature({ icon, title }) {
  return (
    <View style={styles.featureRow}>
      <View style={styles.featureIcon}>
        <Feather name={icon} size={18} color={COLORS.primary} />
      </View>
      <Text style={styles.featureText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 100,
  },

  heroCard: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 24,
    paddingVertical: 36,
    alignItems: "center",
    ...SHADOW.medium,
  },

  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.heroIconBg,
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  badgeText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 6,
  },

  title: {
    marginTop: 28,
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 14,
    textAlign: "center",
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.secondary,
    paddingHorizontal: 6,
  },

  featuresCard: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
    ...SHADOW.small,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.heroIconBg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  featureText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
});
