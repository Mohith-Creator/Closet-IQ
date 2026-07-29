import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Alert,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

import Snackbar from "../../components/common/Snackbar";
import AIBanner from "../../components/outfits/AIBanner";
import SortModal from "../../components/common/SortModal";
import ActionSheet from "../../components/common/ActionSheet";
import SavedOutfitCard from "../../components/outfits/SavedOutfitCard";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import EmptyOutfitsState from "../../components/outfits/EmptyOutfitsState";
import EmptySearchState from "../../components/outfits/EmptySearchState";

import { replacePlanOutfit } from "../../services/plannerService";
import { getOutfits, deleteOutfit } from "../../services/outfitService";

export default function SavedOutfitsScreen({ navigation, route }) {
  const [search, setSearch] = useState("");
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarIcon, setSnackbarIcon] = useState("checkmark-circle");
  const [refreshing, setRefreshing] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedOutfits, setSelectedOutfits] = useState([]);
  const [replacingOutfit, setReplacingOutfit] = useState(false);
  const [bulkDeleteVisible, setBulkDeleteVisible] = useState(false);

  const planId = route.params?.planId;
  const plannerMode = route.params?.plannerMode ?? false;

  useFocusEffect(
    useCallback(() => {
      loadOutfits();
    }, []),
  );

  const showSnackbar = ({ message, icon = "checkmark-circle" }) => {
    setSnackbarMessage(message);
    setSnackbarIcon(icon);
    setSnackbarVisible(true);
  };

  const loadOutfits = async () => {
    try {
      setLoading(true);
      const data = await getOutfits();
      setOutfits(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await loadOutfits();
      setSelectedOutfits([]);
      setSelectionMode(false);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const enterSelectionMode = (id) => {
    setSelectionMode(true);
    setSelectedOutfits([id]);
  };

  const toggleSelect = (id) => {
    setSelectedOutfits((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];

      if (updated.length === 0) {
        setSelectionMode(false);
      }

      return updated;
    });
  };

  const toggleSelectAll = () => {
    if (selectedOutfits.length === displayedOutfits.length) {
      setSelectedOutfits([]);
      setSelectionMode(false);
    } else {
      setSelectedOutfits(displayedOutfits.map((o) => o._id));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOutfit(id);
      showSnackbar({
        message: "Outfit deleted successfully",
        icon: "trash-outline",
      });
      setOutfits((prev) => prev.filter((outfit) => outfit._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const confirmBulkDelete = async () => {
    setBulkDeleteVisible(false);
    try {
      await Promise.all(selectedOutfits.map((id) => deleteOutfit(id)));
      setOutfits((prev) =>
        prev.filter((item) => !selectedOutfits.includes(item._id)),
      );
      showSnackbar({
        message: `${selectedOutfits.length} outfit${
          selectedOutfits.length > 1 ? "s" : ""
        } deleted`,
        icon: "trash-outline",
      });
      setSelectedOutfits([]);
      setSelectionMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOutfitPress = async (outfit) => {
    try {
      setReplacingOutfit(true);
      const response = await replacePlanOutfit(planId, outfit._id);
      navigation.reset({
        index: 1,
        routes: [
          { name: "Planner" },
          {
            name: "PlanDetails",
            params: {
              plan: response.plan,
              snackbar: {
                message: "Outfit replaced successfully",
                icon: "checkmark-circle",
              },
            },
          },
        ],
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to replace outfit.");
    } finally {
      setReplacingOutfit(false);
    }
  };

  const displayedOutfits = outfits.filter((outfit) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    return (
      outfit.name?.toLowerCase().includes(query) ||
      outfit.occasion?.toLowerCase().includes(query)
    );
  });

  const renderOutfit = ({ item }) => (
    <SavedOutfitCard
      item={item}
      navigation={navigation}
      selectionMode={selectionMode}
      selectedOutfits={selectedOutfits}
      toggleSelect={toggleSelect}
      onLongPress={() => enterSelectionMode(item._id)}
      handleDelete={handleDelete}
      onRefresh={loadOutfits}
      onPress={plannerMode ? () => handleOutfitPress(item) : undefined}
      onSuccess={showSnackbar}
      replacingOutfit={replacingOutfit}
    />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Snackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        icon={snackbarIcon}
        onHide={() => setSnackbarVisible(false)}
      />

      <View style={styles.contentContainer}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.goBack()}
            >
              <Feather
                name="chevron-left"
                size={22} // was 24
                color={COLORS.text}
              />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {plannerMode ? "Choose Outfit" : "Saved Outfits"}
              </Text>
              {!plannerMode && (
                <Text style={styles.subtitle}>
                  All your saved looks in one place ✨
                </Text>
              )}
            </View>
          </View>
          {plannerMode && (
            <Text style={styles.helperText}>
              Select an outfit to replace the deleted one.
            </Text>
          )}
        </View>

        {/* SEARCH */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={18}
              color={COLORS.secondary}
            />

            <TextInput
              placeholder="Search saved outfits..."
              value={search}
              onChangeText={setSearch}
              editable={!replacingOutfit}
              style={styles.input}
              placeholderTextColor="#999"
            />

            {search.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearch("")}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={18} color="#B0B0B0" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.filterButton}
            disabled={replacingOutfit}
            onPress={() => setSortVisible(true)}
          >
            <Ionicons
              name="options-outline"
              size={20} // was 22
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Outfit Grid */}

        <FlatList
          data={displayedOutfits}
          keyExtractor={(item) => item._id}
          renderItem={renderOutfit}
          numColumns={2}
          refreshing={refreshing}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={
            displayedOutfits.length > 0 ? styles.row : undefined
          }
          contentContainerStyle={[
            styles.listContent,
            displayedOutfits.length === 0 && styles.emptyListContent,
          ]}
          ListHeaderComponent={
            <>
              {displayedOutfits.length > 0 && (
                <>
                  <AIBanner
                    variant="savedOutfits"
                    onPress={() => navigation.navigate("AISuggestion")}
                  />
                  <View style={styles.selectionHeader}>
                    {!selectionMode ? (
                      <Text style={styles.outfitTitle}>Outfits</Text>
                    ) : (
                      <>
                        <TouchableOpacity
                          style={styles.selectionLeft}
                          activeOpacity={0.8}
                          onPress={() => {
                            setSelectionMode(false);
                            setSelectedOutfits([]);
                          }}
                        >
                          <View style={styles.selectionCircle}>
                            <Ionicons name="checkmark" size={14} color="#FFF" />
                          </View>

                          <View style={styles.selectionTextContainer}>
                            <Text style={styles.selectionTitle}>Select</Text>

                            <Text style={styles.selectionSubtitle}>
                              {selectedOutfits.length} selected
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <View style={styles.selectionActions}>
                          <TouchableOpacity onPress={toggleSelectAll}>
                            <Text style={styles.selectAllText}>
                              {selectedOutfits.length ===
                              displayedOutfits.length
                                ? "Deselect All"
                                : "Select All"}
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => setBulkDeleteVisible(true)}
                          >
                            <Ionicons
                              name="trash-outline"
                              size={18}
                              color="#C05640"
                            />
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </View>
                </>
              )}
            </>
          }
          ListEmptyComponent={
            search.trim().length > 0 ? (
              <EmptySearchState search={search} onClear={() => setSearch("")} />
            ) : (
              <EmptyOutfitsState navigation={navigation} />
            )
          }
        />
      </View>

      <ActionSheet
        visible={menuVisible}
        title="Outfit Options"
        onClose={() => setMenuVisible(false)}
        options={[
          {
            key: "select",
            label: "Select Outfits",
            icon: "checkmark-circle-outline",
            onPress: () => setSelectionMode(true),
          },
        ]}
      />

      <SortModal
        visible={sortVisible}
        title="Sort Outfits"
        selected={sortOption}
        onClose={() => setSortVisible(false)}
        options={[
          {
            key: "newest",
            label: "Newest First",
          },
          {
            key: "oldest",
            label: "Oldest First",
          },
        ]}
        onSelect={(key) => {
          setSortOption(key);

          if (key === "newest") {
            setOutfits((prev) =>
              [...prev].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
              ),
            );
          } else {
            setOutfits((prev) =>
              [...prev].sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
              ),
            );
          }
        }}
      />

      <ConfirmationModal
        visible={bulkDeleteVisible}
        title={`Delete ${selectedOutfits.length} Outfit${
          selectedOutfits.length > 1 ? "s" : ""
        }?`}
        message="This action cannot be undone."
        icon="trash-outline"
        destructive
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setBulkDeleteVisible(false)}
        onConfirm={confirmBulkDelete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  contentContainer: {
    flex: 1,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    justifyContent: "space-between",
  },

  listContent: {
    paddingBottom: 120,
  },

  emptyListContent: {
    flexGrow: 1,
    paddingBottom: 60,
  },

  /* ---------------- HEADER ---------------- */

  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 12, // was 14
    paddingBottom: 6, // was 8
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconButton: {
    width: 38, // was 42
    height: 38, // was 42
    borderRadius: 19, // was 21
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.card,
  },

  titleContainer: {
    flex: 1,
    marginHorizontal: 12, // was 16
  },

  title: {
    fontSize: 24, // was 28
    fontWeight: "700",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 2, // was 4
    fontSize: 13, // was 14
    lineHeight: 18, // was 20
    color: COLORS.secondary,
  },

  helperText: {
    marginTop: 8, // was 14
    fontSize: 13, // was 14
    lineHeight: 18, // was 20
    color: COLORS.secondary,
  },

  /* ---------------- SEARCH ---------------- */

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
  },

  searchContainer: {
    flex: 1,
    height: 44, // Reduced from 52
    backgroundColor: COLORS.card,
    borderRadius: 12, // Reduced from 16
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12, // Reduced from 16
    ...SHADOW.card,
  },

  input: {
    flex: 1,
    marginLeft: 8, // Reduced from 10
    fontSize: 14, // Reduced from 15
    color: COLORS.text,
  },

  clearButton: {
    marginLeft: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  filterButton: {
    width: 44, // Reduced from 52
    height: 44, // Reduced from 52
    marginLeft: 10, // Reduced from 12
    borderRadius: 12, // Reduced from 16
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.card,
  },

  /* ---------------- SELECTION ---------------- */

  selectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 18,
  },

  outfitTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },

  selectionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  selectionCircle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.small,
  },

  selectionTextContainer: {
    marginLeft: 12,
  },

  selectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  selectionSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: COLORS.secondary,
  },

  selectionActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  selectAllText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },

  deleteIcon: {
    marginLeft: 18,
  },

  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginLeft: 14,
    backgroundColor: "#FBE9E6",
    justifyContent: "center",
    alignItems: "center",
  },

  /* ---------------- LIST ---------------- */

  row: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  listContent: {
    paddingBottom: 120,
  },
});
