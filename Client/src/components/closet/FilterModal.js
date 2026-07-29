import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import Modal from "react-native-modal";

import {
  CATEGORIES,
  SUB_CATEGORIES,
  MATERIALS,
  OCCASIONS,
  USAGE_TYPES,
  DATE_OPTIONS,
  COLOR_SWATCHES,
  COLORS_FILTER,
} from "../../constants/closet/filterConstants";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

function FilterChip({ title, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.filterChip, active && styles.activeFilterChip]}
    >
      <Text
        style={[styles.filterChipText, active && styles.activeFilterChipText]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default function FilterModal({ visible, onClose, filters, setFilters }) {
  const toggleArray = (key, value) => {
    const exists = filters[key].includes(value);

    setFilters((prev) => ({
      ...prev,
      [key]: exists
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      subCategories: [],
      colors: [],
      material: null,
      occasions: [],
      favoritesOnly: false,
    });
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      propagateSwipe={true}
      avoidKeyboard={true}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.handle} />

        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>

          <TouchableOpacity onPress={clearFilters}>
            <Text style={styles.clear}>Clear</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        >
          <Text style={styles.sectionTitle}>Category</Text>

          <View style={styles.wrap}>
            {CATEGORIES.map((cat) => (
              <FilterChip
                key={cat}
                title={cat}
                active={filters.category === cat}
                onPress={() =>
                  setFilters((prev) => ({
                    ...prev,
                    category: cat,
                    subCategories: [],
                  }))
                }
              />
            ))}
          </View>
          <Text style={styles.sectionTitle}>Sub Category</Text>

          <View style={styles.wrap}>
            {(SUB_CATEGORIES[filters.category] || []).map((item) => (
              <FilterChip
                key={item}
                title={item}
                active={filters.subCategories.includes(item)}
                onPress={() => toggleArray("subCategories", item)}
              />
            ))}
          </View>
          <Text style={styles.sectionTitle}>Color</Text>

          <View style={styles.colorRow}>
            {COLOR_SWATCHES.map((color) => (
              <TouchableOpacity
                key={color}
                style={[styles.colorCircle, { backgroundColor: color }]}
              />
            ))}
          </View>
          <Text style={styles.sectionTitle}>Material</Text>

          <View style={styles.wrap}>
            {MATERIALS.map((material) => (
              <FilterChip
                key={material}
                title={material}
                active={filters.material === material}
                onPress={() =>
                  setFilters((prev) => ({
                    ...prev,
                    material: prev.material === material ? null : material,
                  }))
                }
              />
            ))}
          </View>
          <Text style={styles.sectionTitle}>Occasion</Text>

          <View style={styles.wrap}>
            {OCCASIONS.map((occasion) => (
              <FilterChip
                key={occasion}
                title={occasion}
                active={filters.occasions.includes(occasion)}
                onPress={() => toggleArray("occasions", occasion)}
              />
            ))}
          </View>
          <Text style={styles.sectionTitle}>Usage</Text>

          <View style={styles.wrap}>
            {USAGE_TYPES.map((type) => (
              <FilterChip
                key={type}
                title={type}
                active={filters.usage === type}
                onPress={() =>
                  setFilters((prev) => ({
                    ...prev,
                    usage: prev.usage === type ? null : type,
                  }))
                }
              />
            ))}
          </View>
          <Text style={styles.sectionTitle}>Date Added</Text>

          <View style={styles.wrap}>
            {DATE_OPTIONS.map((date) => (
              <FilterChip
                key={date}
                title={date}
                active={filters.dateAdded === date}
                onPress={() =>
                  setFilters((prev) => ({
                    ...prev,
                    dateAdded: prev.dateAdded === date ? null : date,
                  }))
                }
              />
            ))}
          </View>
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.favoriteTitle}>Favorites Only</Text>

              <Text style={styles.favoriteSub}>Show only favorites</Text>
            </View>

            <Switch
              value={filters.favoritesOnly}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  favoritesOnly: value,
                }))
              }
            />
          </View>
          <View style={styles.selectedContainer}>
            {filters.subCategories.map((item) => (
              <View key={item} style={styles.selectedChip}>
                <Text>{item}</Text>
              </View>
            ))}

            {filters.colors.map((item) => (
              <View key={item} style={styles.selectedChip}>
                <Text>{item}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.applyBtn} onPress={onClose}>
          <Text style={styles.applyText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },

  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "92%",
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  handle: {
    width: 60,
    height: 5,
    backgroundColor: COLORS.divider,
    borderRadius: 999,
    alignSelf: "center",
    marginBottom: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },

  clear: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 18,
    marginBottom: 10,
  },

  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.chipBorder,
    backgroundColor: COLORS.white,
    marginRight: 10,
    marginBottom: 10,
  },

  activeFilterChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  filterChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.chipText,
  },

  activeFilterChipText: {
    color: COLORS.white,
  },

  colorRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  colorCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.divider,
    marginRight: 12,
    marginBottom: 12,
  },

  switchRow: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  favoriteTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  favoriteSub: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },

  selectedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },

  selectedChip: {
    backgroundColor: COLORS.selectedChipBg,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    ...SHADOW.small,
  },

  applyBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 30,
    ...SHADOW.medium,
  },

  applyText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});