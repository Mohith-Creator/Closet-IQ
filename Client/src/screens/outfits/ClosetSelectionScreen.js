import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { getItems } from "../../services/itemService";

const CATEGORIES = ["Tops", "Bottoms", "Shoes", "Accessories"];

export default function ClosetSelectionScreen({ navigation, route }) {
  const initialCategory = route?.params?.category || "Tops";

  const onSelectItem = route?.params?.onSelectItem;

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await getItems();
      setItems(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = item.category === selectedCategory;

      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, search]);

  const getCategoryCount = (category) => {
    return items.filter((item) => item.category === category).length;
  };

  const handleSelect = (item) => {
    if (onSelectItem) {
      onSelectItem(item);
    }

    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => handleSelect(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.itemName} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Ionicons name="cube-outline" size={34} color="#8A5A3A" />
      </View>

      <Text style={styles.emptyTitle}>No {selectedCategory} Found</Text>

      <Text style={styles.emptySubtitle}>Add items to your closet first</Text>
    </View>
  );
  const renderListHeader = () => (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {CATEGORIES.map((category) => {
          const count = getCategoryCount(category);

          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.activeChip,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeChipText,
                ]}
              >
                {category}
              </Text>
              <View
                style={[
                  styles.countBadge,
                  selectedCategory === category && styles.activeCountBadge,
                ]}
              >
                <Text
                  style={[
                    styles.countText,
                    selectedCategory === category && styles.activeCountText,
                  ]}
                >
                  {count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerSide}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={26} color="#1A1A1A" />
        </TouchableOpacity>

        <Text style={styles.title}>Select {selectedCategory}</Text>

        <View style={styles.headerSide} />
      </View>

      {/* Search */}

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#9B938C" />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search items..."
          placeholderTextColor="#9B938C"
          style={styles.searchInput}
        />
      </View>

      {/* Grid */}

      <FlatList
        data={filteredItems}
        ListHeaderComponent={renderListHeader}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 30,
          flexGrow: filteredItems.length === 0 ? 1 : 0,
        }}
        columnWrapperStyle={
          filteredItems.length > 0
            ? {
                justifyContent: "space-between",
              }
            : null
        }
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  headerSide: {
    width: 40,
  },

  countBadge: {
    marginLeft: 6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#F6F1EB",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },

  activeCountBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  countText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#5A3218",
  },

  activeCountText: {
    color: "#FFF",
  },

  backButton: {
    width: 26,
  },

  searchContainer: {
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E8DED2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#1A1A1A",
  },

  categories: {
    paddingBottom: 16,
  },

  categoryChip: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#FFF",

    flexDirection: "row",
    alignItems: "center",

    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E8DED2",
  },

  activeChip: {
    backgroundColor: "#5A3218",
    borderColor: "#5A3218",
  },

  categoryText: {
    fontSize: 14,
    fontWeight: "600",
  },

  activeChipText: {
    color: "#FFF",
  },

  card: {
    width: "48%",
    height: 145,
    backgroundColor: "#FFF",
    borderRadius: 18,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EFE7DD",
  },

  itemName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1A1A1A",
    marginTop: 4,
  },

  image: {
    width: 95,
    height: 95,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  emptySubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#7D746A",
  },
});
