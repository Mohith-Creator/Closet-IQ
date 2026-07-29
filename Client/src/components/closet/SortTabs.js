import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

import { SORT_TABS } from "../../constants/closet/sortTabs";

export default function SortTabs({ selected, onChange }) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {SORT_TABS.map((tab) => {
          const isActive = selected === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.85}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => onChange(tab.key)}
            >
              <Text style={[styles.tabText, isActive && styles.activeText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  tabsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 6,
  },

  tab: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
  },

  activeTab: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.secondary,
  },

  activeText: {
    color: COLORS.white,
  },
});