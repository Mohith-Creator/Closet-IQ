import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

export default function NotificationScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 42 }} />
      </View>

      <View style={styles.content}>
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.iconCircle}>
            <Feather name="bell" size={60} color={COLORS.primary} />
          </View>
          <View style={styles.badge}>
            <Feather name="check-circle" size={14} color={COLORS.white} />
            <Text style={styles.badgeText}>You're all caught up</Text>
          </View>
        </View>

        <Text style={styles.title}>No Notifications Yet</Text>

        <Text style={styles.subtitle}>
          Important updates about your wardrobe, outfit planner, AI styling, and
          account activity will appear here.
        </Text>

        {/* Preview Card */}
        <View style={styles.featuresCard}>
          <Feature icon="calendar" title="Planner Reminders" />
          <Feature icon="cpu" title="AI Outfit Suggestions" />
          <Feature icon="gift" title="New Features & Updates" />
          <Feature icon="refresh-cw" title="Wardrobe Insights" />
        </View>
      </View>
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

  header: {
    height: 60,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.small,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
    alignItems: "center",
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
    color: COLORS.secondary,
    lineHeight: 24,
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