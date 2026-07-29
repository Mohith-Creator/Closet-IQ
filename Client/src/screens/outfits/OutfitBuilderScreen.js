import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View, Alert } from "react-native";

import Snackbar from "../../components/common/Snackbar";
import OutfitCanvas from "../../components/outfitBuilder/OutfitCanvas";
import ActionButtons from "../../components/outfitBuilder/ActionButtons";
import HeaderSection from "../../components/outfitBuilder/HeaderSection";
import StyleScoreCard from "../../components/outfitBuilder/StyleScoreCard";
import ClosetCarousel from "../../components/outfitBuilder/ClosetCarousel";
import OutfitDetailsCard from "../../components/outfitBuilder/OutfitDetailsCard";

import { getItems } from "../../services/itemService";
import {
  createOutfit,
  updateOutfit,
  getRecommendations,
} from "../../services/outfitService";

import COLORS from "../../theme/colors";

export default function OutfitBuilderScreen({ navigation, route }) {
  const [items, setItems] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [outfit, setOutfit] = useState({
    top: null,
    bottom: null,
    shoes: null,
    accessory: null,
  });
  const [outfitName, setOutfitName] = useState("");
  const [occasion, setOccasion] = useState("Casual");
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarIcon, setSnackbarIcon] = useState("checkmark-circle");
  const editMode = route?.params?.editMode || false;
  const editingOutfit = route?.params?.outfit;

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (!editMode || !editingOutfit) return;

    setOutfitName(editingOutfit.name || "");
    setOccasion(editingOutfit.occasion || "Casual");
    setNotes(editingOutfit.notes || "");

    const top =
      editingOutfit.items?.find((item) => item.category === "Tops") || null;

    const bottom =
      editingOutfit.items?.find((item) => item.category === "Bottoms") || null;

    const shoes =
      editingOutfit.items?.find((item) => item.category === "Shoes") || null;

    const accessory =
      editingOutfit.items?.find((item) => item.category === "Accessories") ||
      null;

    setOutfit({
      top,
      bottom,
      shoes,
      accessory,
    });
  }, [editMode, editingOutfit]);

  const loadItems = async () => {
    try {
      const data = await getItems();
      setItems(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const showSnackbar = ({ message, icon = "checkmark-circle" }) => {
    setSnackbarMessage(message);
    setSnackbarIcon(icon);
    setSnackbarVisible(true);
  };

  const filteredItems = selectedSlot
    ? items.filter((item) => item.category === selectedSlot)
    : items;

  const handleSelectItem = (item) => {
    setHistory((prev) => [...prev, outfit]);
    switch (item.category) {
      case "Tops":
        setOutfit((prev) => ({
          ...prev,
          top: item,
        }));
        break;

      case "Bottoms":
        setOutfit((prev) => ({
          ...prev,
          bottom: item,
        }));
        break;

      case "Shoes":
        setOutfit((prev) => ({
          ...prev,
          shoes: item,
        }));
        break;

      case "Accessories":
        setOutfit((prev) => ({
          ...prev,
          accessory: item,
        }));
        break;

      default:
        break;
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const previous = history[history.length - 1];

    setOutfit(previous);

    setHistory((prev) => prev.slice(0, -1));
  };

  const handleSlotSelect = (category) => {
    setSelectedSlot(category);

    navigation.navigate("ClosetSelection", {
      category,
      onSelectItem: handleSelectItem,
    });
  };

  const calculateStyleScore = () => {
    let score = 0;

    if (outfit.top) score += 30;
    if (outfit.bottom) score += 30;
    if (outfit.shoes) score += 20;
    if (outfit.accessory) score += 20;

    return score;
  };

  const styleScore = calculateStyleScore();

  const saveOutfit = async () => {
    try {
      const selectedItems = [
        outfit.top?._id,
        outfit.bottom?._id,
        outfit.shoes?._id,
        outfit.accessory?._id,
      ].filter(Boolean);

      if (!outfitName.trim()) {
        showSnackbar({
          message: "Please enter an outfit name",
          icon: "information-circle-outline",
        });

        return;
      }

      if (selectedItems.length < 2) {
        showSnackbar({
          message: "Select at least 2 items",
          icon: "information-circle-outline",
        });

        return;
      }

      if (editMode) {
        await updateOutfit(editingOutfit._id, {
          name: outfitName,
          occasion,
          notes,
          items: selectedItems,
        });
      } else {
        await createOutfit({
          name: outfitName,
          occasion,
          notes,
          items: selectedItems,
        });
      }

      showSnackbar({
        message: editMode
          ? "Outfit updated successfully"
          : "Outfit saved successfully",
        icon: "checkmark-circle",
      });

      setTimeout(() => {
        navigation.navigate("SavedOutfits");
      }, 800);
    } catch (error) {
      console.log(error);

      if (error.status === 409 || error.response?.status === 409) {
        const data = error.response?.data;

        showSnackbar({
          message: `Already saved as "${data.existingName}"`,
          icon: "information-circle-outline",
        });

        return;
      }

      showSnackbar({
        message: "Failed to save outfit",
        icon: "alert-circle-outline",
      });
    }
  };
  const canSave = outfitName.trim() && outfit.top && outfit.bottom;
  const generateAI = async () => {
    try {
      if (!occasion) {
        showSnackbar({
          message: "Please select an occasion",
          icon: "information-circle-outline",
        });
        return;
      }

      const response = await getRecommendations(occasion, 1, 5);

      const recommendations = response?.recommendations ?? [];

      if (!recommendations.length) {
        showSnackbar({
          message: `No ${occasion} outfit recommendations found`,
          icon: "information-circle-outline",
        });
        return;
      }

      navigation.navigate("AISuggestion", {
        initialOccasion: occasion,
        initialSuggestions: recommendations,
      });
    } catch (error) {
      console.log(error);

      showSnackbar({
        message: "Failed to generate AI recommendations",
        icon: "alert-circle-outline",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Snackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        icon={snackbarIcon}
        onHide={() => setSnackbarVisible(false)}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <HeaderSection navigation={navigation} />

        <OutfitCanvas
          outfit={outfit}
          selectedSlot={selectedSlot}
          availableCount={filteredItems.length}
          onSelectSlot={handleSlotSelect}
          onUndo={handleUndo}
        />
        <StyleScoreCard
          hasOutfit={!!outfit.top && !!outfit.bottom}
          score={styleScore}
          outfit={outfit}
        />
        <ClosetCarousel
          selectedSlot={selectedSlot}
          items={filteredItems}
          onSelectItem={handleSelectItem}
          onViewAll={() => {
            navigation.navigate("ClosetSelection", {
              category: selectedSlot || "Tops",
              onSelectItem: handleSelectItem,
            });
          }}
        />

        <OutfitDetailsCard
          outfitName={outfitName}
          setOutfitName={setOutfitName}
          occasion={occasion}
          setOccasion={setOccasion}
          notes={notes}
          setNotes={setNotes}
        />

        <ActionButtons
          editMode={editMode}
          canSave={canSave}
          onSave={saveOutfit}
          onGenerate={generateAI}
        />
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
    paddingHorizontal: 16,
    paddingBottom: 85,
  },
});
