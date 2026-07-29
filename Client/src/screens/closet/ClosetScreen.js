import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { FlashList } from "@shopify/flash-list";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { getOutfits } from "../../services/outfitService";
import { getItems, toggleFavorite } from "../../services/itemService";

import SortTabs from "../../components/closet/SortTabs";
import FilterModal from "../../components/closet/FilterModal";
import ClosetStats from "../../components/closet/ClosetStats";
import CategoryChips from "../../components/closet/CategoryChips";
import ClosetItemCard from "../../components/closet/ClosetItemCard";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

import {
  CATEGORIES,
  SUB_CATEGORIES,
} from "../../constants/closet/wardrobeConstants";

export default function ClosetScreen({ navigation }) {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortType, setSortType] = useState("recent");
  const [outfitCount, setOutfitCount] = useState(0);

  const [viewMode, setViewMode] = useState("grid");

  const [filters, setFilters] = useState({
    category: "All",
    subCategories: [],
    colors: [],
    material: null,
    occasions: [],
    usage: null,
    dateAdded: null,
    favoritesOnly: false,
  });

  const [filterVisible, setFilterVisible] = useState(false);
  const categoryOptions = ["All", ...CATEGORIES];
  const loadItems = async () => {
    try {
      setLoading(true);

      const [itemsData, outfitsData] = await Promise.all([
        getItems(),
        getOutfits(),
      ]);

      setItems(itemsData || []);
      setOutfitCount(outfitsData?.length || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadItems);

    return unsubscribe;
  }, [navigation]);

  const categoryCounts = useMemo(() => {
    return {
      All: items.length,

      Tops: items.filter((i) => i.category === "Tops").length,

      Bottoms: items.filter((i) => i.category === "Bottoms").length,

      Shoes: items.filter((i) => i.category === "Shoes").length,

      Accessories: items.filter((i) => i.category === "Accessories").length,

      Outerwear: items.filter((i) => i.category === "Outerwear").length,
    };
  }, [items]);

  const stats = useMemo(() => {
    const totalItems = items.length;

    const favorites = items.filter((item) => item.favorite).length;

    const utilized = items.filter((item) => item.wearCount > 0).length;

    const utilization =
      totalItems > 0 ? Math.round((utilized / totalItems) * 100) : 0;

    return {
      totalItems,
      favorites,
      utilization,
      outfits: outfitCount,
    };
  }, [items, outfitCount]);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (selectedCategory !== "All") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      result = result.filter(
        (item) =>
          item.name?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.subCategory?.toLowerCase().includes(q) ||
          item.color?.toLowerCase().includes(q) ||
          item.material?.toLowerCase().includes(q),
      );
    }

    if (filters.subCategories.length) {
      result = result.filter((item) =>
        filters.subCategories.includes(item.subCategory),
      );
    }

    if (filters.colors.length) {
      result = result.filter((item) => filters.colors.includes(item.color));
    }

    if (filters.material) {
      result = result.filter((item) => item.material === filters.material);
    }

    if (filters.favoritesOnly) {
      result = result.filter((item) => item.favorite);
    }

    switch (sortType) {
      case "mostWorn":
        result.sort((a, b) => b.wearCount - a.wearCount);
        break;

      case "favorites":
        result = result.filter((item) => item.favorite);
        break;

      case "unused":
        result = result.filter((item) => item.wearCount === 0);
        break;

      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [items, selectedCategory, search, sortType, filters]);

  const handleFavorite = async (itemId) => {
    try {
      await toggleFavorite(itemId);

      loadItems();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <ClosetItemCard
      item={item}
      viewMode={viewMode}
      onFavorite={() => handleFavorite(item._id)}
      onPress={() =>
        navigation.navigate("EditItemDetails", {
          isEditing: true,
          itemData: item,
        })
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.title}>My Closet</Text>

        <View style={styles.headerActions}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                viewMode === "grid" && styles.toggleActive,
              ]}
              onPress={() => setViewMode("grid")}
            >
              <Ionicons
                name="grid"
                size={16}
                color={viewMode === "grid" ? COLORS.primary : COLORS.textLight}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleBtn,
                viewMode === "list" && styles.toggleActive,
              ]}
              onPress={() => setViewMode("list")}
            >
              <Ionicons
                name="list"
                size={16}
                color={viewMode === "list" ? COLORS.brown : "#8B8B8B"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* SEARCH */}

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="#999" />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search items in your closet..."
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setFilterVisible(true)}
        >
          <Feather name="sliders" size={16} color={COLORS.brown} />
        </TouchableOpacity>
      </View>

      <CategoryChips
        categories={categoryOptions}
        counts={categoryCounts}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <ClosetStats stats={stats} />
      <SortTabs selected={sortType} onChange={setSortType} />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.brown}
          style={{
            marginTop: 50,
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <FlashList
            key={viewMode}
            data={filteredItems}
            renderItem={renderItem}
            estimatedItemSize={viewMode === "grid" ? 220 : 130}
            numColumns={viewMode === "grid" ? 2 : 1}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{
              paddingHorizontal: 14,
              paddingBottom: 120,
              flexGrow: 1,
            }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons
                  name={
                    selectedCategory === "Accessories"
                      ? "watch-outline"
                      : "shirt-outline"
                  }
                  size={70}
                  color="#C7B8A6"
                />

                <Text style={styles.emptyTitle}>
                  No {selectedCategory !== "All" ? selectedCategory : "Items"}{" "}
                  Yet
                </Text>

                <Text style={styles.emptySubtitle}>
                  {selectedCategory === "Accessories"
                    ? "Add your watches, belts, bags and other accessories."
                    : selectedCategory === "Shoes"
                      ? "Add some shoes to start building outfits."
                      : selectedCategory === "Tops"
                        ? "Add shirts, t-shirts or hoodies."
                        : selectedCategory === "Bottoms"
                          ? "Add jeans, trousers or shorts."
                          : "Your closet is empty. Start by adding your first item."}
                </Text>

                <TouchableOpacity
                  style={styles.emptyBtn}
                  onPress={() => navigation.navigate("AddItem")}
                >
                  <Ionicons name="add" size={18} color="#FFF" />
                  <Text style={styles.emptyBtnText}>Add Item</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      )}

      {/* FAB */}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddItem")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* FILTER SHEET */}

      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: COLORS.text,
  },

  headerActions: {
    flexDirection: "row",
  },

  toggleContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 4,
  },

  toggleBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  toggleActive: {
    backgroundColor: COLORS.lightBrown,
  },

  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
  },

  searchBox: {
    flex: 1,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.text,
  },

  filterBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    marginLeft: 10,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  fab: {
    position: "absolute",
    right: 27,
    bottom: 115,
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.medium,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    color: COLORS.secondary,
  },

  emptyBtn: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },

  emptyBtnText: {
    marginLeft: 6,
    color: COLORS.white,
    fontWeight: "600",
  },
});
