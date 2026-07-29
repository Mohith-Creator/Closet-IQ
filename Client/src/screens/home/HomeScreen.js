import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { useAuth } from "../../context/AuthContext";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

import { getGreeting } from "../../utils/getGreeting";

import getHomeStats from "../../constants/home/homeStats";
import quickActions from "../../constants/home/quickActions";

import StatCard from "../../components/common/StatCard";
import AIBanner from "../../components/outfits/AIBanner";
import ActionCard from "../../components/common/ActionCard";
import WeatherCard from "../../components/home/WeatherCard";
import SectionHeader from "../../components/common/SectionHeader";
import TodayOutfitCard from "../../components/home/TodayOutfitCard";

import { getItems } from "../../services/itemService";
import {
  getOutfits,
  getRecommendations,
  getHomeRecommendations,
} from "../../services/outfitService";
import { HOME_OCCASIONS } from "../../constants/closet/wardrobeConstants";

export default function HomeScreen({ navigation }) {
  const { userData } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [todayOutfits, setTodayOutfits] = useState([]);
  const [stats, setStats] = useState({
    items: 0,
    outfits: 0,
    utilization: 0,
    favorites: 0,
  });

  const greetingText = getGreeting();

  useFocusEffect(
    useCallback(() => {
      loadStats();
      loadTodayOutfits();
    }, []),
  );

  const generateSuggestion = async () => {
    try {
      const response = await getRecommendations("Casual");

      const recommendations = response.recommendations ?? [];

      if (!recommendations.length) {
        return Alert.alert(
          "No Suggestions",
          "No outfit recommendations available.",
        );
      }

      navigation.navigate("AISuggestion", {
        initialOccasion: "Casual",
        initialSuggestions: recommendations,
      });
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Failed to generate AI recommendations.");
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadStats(), loadTodayOutfits()]);
    setRefreshing(false);
  }, []);

  const loadTodayOutfits = async () => {
    try {
      const savedOutfits = await getOutfits();

      const results = [];

      const usedIds = new Set();

      for (const occasion of HOME_OCCASIONS) {
        const saved = savedOutfits
          .filter((o) => o.occasion === occasion)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

        if (saved && !usedIds.has(saved._id)) {
          usedIds.add(saved._id);
          results.push(saved);
        }
      }

      const missingOccasions = HOME_OCCASIONS.filter(
        (occasion) => !results.some((outfit) => outfit.occasion === occasion),
      );

      if (missingOccasions.length) {
        const response = await getHomeRecommendations(missingOccasions);

        response.recommendations.forEach(({ occasion, recommendation }) => {
          results.push({
            _id: `${occasion}-${recommendation.id}`,
            occasion,
            generated: true,
            items: [
              recommendation.items.top,
              recommendation.items.bottom,
              recommendation.items.shoes,
              recommendation.items.accessory,
            ].filter(Boolean),
          });
        });
      }

      setTodayOutfits(results);
    } catch (error) {
      console.log(error);
    }
  };

  const loadStats = async () => {
    try {
      const items = await getItems();
      const outfits = await getOutfits();
      const utilizedItems = items.filter((item) => item.wearCount > 0).length;
      const utilization =
        items.length > 0 ? Math.round((utilizedItems / items.length) * 100) : 0;
      const favorites = items.filter((item) => item.favorite).length;
      setStats({
        items: items.length,
        outfits: outfits.length,
        utilization,
        favorites,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            {greetingText}, {userData?.name?.trim() || "Durga Sri"} 👋
          </Text>
          <TouchableOpacity
            style={styles.notification}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Feather name="bell" size={24} color={COLORS.text} />
            <View style={styles.dot} />
          </TouchableOpacity>
        </View>

        {/* WEATHER */}
        <WeatherCard />

        {/* TODAY OUTFIT */}

        <SectionHeader
          title={todayOutfits.length > 0 ? "Today's Picks" : "AI Outfit Ideas"}
          actionText={todayOutfits.length > 0 ? "View all" : undefined}
          onPress={
            todayOutfits.length > 0
              ? () => navigation.navigate("SavedOutfits")
              : undefined
          }
        />
        {todayOutfits.length > 0 ? (
          <TodayOutfitCard outfits={todayOutfits} />
        ) : (
          <View style={styles.aiBannerContainer}>
            <AIBanner variant="home" onPress={generateSuggestion} />
          </View>
        )}

        {/* QUICK ACTIONS */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          {quickActions.map((item, index) => (
            <ActionCard
              key={index}
              icon={item.icon}
              iconType={item.iconType}
              label={item.label}
              onPress={() => {
                if (item.label === "AI Suggest") {
                  generateSuggestion();
                  return;
                }
                if (item.screen) {
                  navigation.navigate(item.screen);
                }
              }}
            />
          ))}
        </View>

        {/* OVERVIEW */}
        <SectionHeader
          title="Your Closet Overview"
          actionText="See all"
          onPress={() => navigation.navigate("Closet")}
        />
        <View style={styles.statsRow}>
          {getHomeStats(stats).map((item, index) => (
            <StatCard
              key={index}
              icon={item.icon}
              value={item.value}
              label={item.label}
            />
          ))}
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
    paddingBottom: 115,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },

  greeting: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  notification: {
    position: "relative",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 20,
    backgroundColor: COLORS.danger,
    position: "absolute",
    top: 1,
    right: 2,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  aiBannerContainer: {
    marginHorizontal: -20,
    marginTop: 4,
    marginBottom: 8,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
