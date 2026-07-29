import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

export default function HelpSupportScreen({ navigation }) {
  const menu = [
    {
      icon: "mail",
      title: "Contact Support",
    },
    {
      icon: "help-circle",
      title: "Frequently Asked Questions",
    },
    {
      icon: "alert-circle",
      title: "Report a Bug",
    },
    {
      icon: "star",
      title: "Rate ClosetIQ",
    },
    {
      icon: "shield",
      title: "Privacy Policy",
    },
    {
      icon: "file-text",
      title: "Terms & Conditions",
    },
  ];

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

        <Text style={styles.headerTitle}>Help & Support</Text>

        <View style={{ width: 42 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Hero */}

        <View style={styles.heroCard}>
          <View style={styles.iconCircle}>
            <Feather name="life-buoy" size={56} color={COLORS.primary} />
          </View>

          <Text style={styles.heroTitle}>Need Help?</Text>

          <Text style={styles.heroSubtitle}>
            We're here to help you get the best experience with ClosetIQ.
          </Text>
        </View>

        {/* Menu */}

        <View style={styles.menuCard}>
          {menu.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              style={[
                styles.menuItem,
                index !== menu.length - 1 && styles.menuDivider,
              ]}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIcon}>
                  <Feather name={item.icon} size={18} color={COLORS.primary} />
                </View>

                <Text style={styles.menuText}>{item.title}</Text>
              </View>

              <Feather
                name="chevron-right"
                size={18}
                color={COLORS.helpMenuChevron}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.version}>ClosetIQ v1.0.0</Text>

        <Text style={styles.footer}>We usually respond within 24 hours.</Text>
      </ScrollView>
    </SafeAreaView>
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
    padding: 20,
    paddingBottom: 40,
  },

  heroCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    alignItems: "center",
    paddingVertical: 32,
    marginBottom: 24,
    ...SHADOW.medium,
  },

  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.heroIconBg,
    justifyContent: "center",
    alignItems: "center",
  },

  heroTitle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },

  heroSubtitle: {
    marginTop: 10,
    textAlign: "center",
    color: COLORS.secondary,
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 30,
  },

  menuCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    overflow: "hidden",
    ...SHADOW.medium,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 15,
  },

  menuDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.menuDivider,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.heroIconBg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  menuText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },

  version: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },

  footer: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 13,
    color: COLORS.secondary,
  },
});