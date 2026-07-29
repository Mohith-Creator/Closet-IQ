import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

import AI_SUGGESTION_TABS from "../../constants/ai/SuggestionTabs";

import AIEmptyState from "../../components/outfits/AIEmptyState";
import AISuggestionCard from "../../components/outfits/AISuggestionCard";

import { createOutfit, getRecommendations } from "../../services/outfitService";

export default function AISuggestionScreen({ route, navigation }) {
  const [selectedTab, setSelectedTab] = useState("Casual");
  const [outfit, setOutfit] = useState(route.params?.outfit);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecommendations, setTotalRecommendations] = useState(0);
  const [recommendations, setRecommendations] = useState(
    route.params?.outfit
      ? [
          {
            id: 1,
            ...route.params.outfit,
          },
        ]
      : [],
  );

  const loadSuggestions = async (occasion = selectedTab, pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await getRecommendations(occasion, pageNumber, 5);
      setTotalRecommendations(response.totalRecommendations);
      setRecommendations(response.recommendations);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const response = await loadSuggestions(selectedTab, page + 1);
      if (response.hasMore) {
        setPage(page + 1);
      } else {
        setPage(1);
        await loadSuggestions(selectedTab, 1);
      }
    } finally {
      setRefreshing(false);
    }
  };

  const saveOutfit = async (outfitData) => {
    try {
      const itemIds = [
        outfitData.items?.top?._id,
        outfitData.items?.bottom?._id,
        outfitData.items?.shoes?._id,
        outfitData.items?.accessory?._id,
      ].filter(Boolean);

      await createOutfit({
        name: `AI Outfit ${Date.now()}`,
        items: itemIds,
        occasion: outfitData.occasion ?? selectedTab,
      });

      Alert.alert("Success", "Outfit saved successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPage(1);
    loadSuggestions(selectedTab, 1);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>

          <Text style={styles.title}>AI Suggestions</Text>

          <Ionicons name="sparkles-outline" size={24} color={COLORS.primary} />
        </View>

        <View style={styles.heroBanner}>
          <View style={styles.heroIcon}>
            <Ionicons
              name="sparkles-outline"
              size={22}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Outfit ideas generated from your wardrobe.
            </Text>

            <Text style={styles.heroSub}>
              {totalRecommendations} personalized recommendations
            </Text>
          </View>
        </View>

        {/* Tabs */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingRight: 15,
          }}
          style={styles.tabsContainer}
        >
          {AI_SUGGESTION_TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={async () => {
                try {
                  setLoading(true);
                  setSelectedTab(tab);
                  setPage(1); // Reset page
                  await loadSuggestions(tab, 1);
                } catch (error) {
                  console.log(error);
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Suggestions */}

        <View style={styles.listContainer}>
          {loading ? (
            <AIEmptyState
              title="Generating outfits..."
              subtitle="Creating personalized recommendations"
            />
          ) : (
            recommendations.map((item) => (
              <AISuggestionCard
                key={item.id}
                recommendation={item}
                onUse={() => saveOutfit(item)}
              />
            ))
          )}
        </View>

        {/* Bottom Card */}

        <View style={styles.preferenceCard}>
          <View style={styles.preferenceIcon}>
            <Ionicons name="sparkles-outline" size={18} color={COLORS.white} />
          </View>

          <View style={styles.preferenceContent}>
            <Text style={styles.preferenceTitle}>
              Want personalized suggestions?
            </Text>

            <Text style={styles.preferenceSub}>
              Tell us your style preferences.
            </Text>

            <TouchableOpacity style={styles.preferenceBtn}>
              <Ionicons
                name="options-outline"
                size={16}
                color={COLORS.primary}
              />
              <Text style={styles.preferenceBtnText}>Update Preferences</Text>
            </TouchableOpacity>
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

  content: {
    paddingBottom: 40,
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },

  heroBanner: {
    marginHorizontal: 20,
    marginTop: 8,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.weatherBg,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.weatherBorder,
    ...SHADOW.card,
  },

  heroIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.iconBtnBg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  heroContent: {
    flex: 1,
  },

  heroTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    lineHeight: 22,
  },

  heroSub: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.secondary,
  },

  tabsContainer: {
    marginTop: 20,
  },

  tab: {
    height: 42,
    paddingHorizontal: 18,
    borderRadius: 22,
    justifyContent: "center",
    backgroundColor: COLORS.softCard,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  activeTab: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.chipText,
  },

  activeTabText: {
    color: COLORS.white,
  },

  listContainer: {
    marginTop: 18,
    paddingHorizontal: 20,
    gap: 14,
  },

  preferenceCard: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.card,
  },

  preferenceIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    alignSelf: "flex-start",
    marginTop: 2,
  },

  preferenceContent: {
    flex: 1,
  },

  preferenceTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    lineHeight: 22,
  },

  preferenceSub: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.secondary,
  },

  preferenceBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginTop: 12,
    paddingHorizontal: 16,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    gap: 6,
  },

  preferenceBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },
});
