import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import OutfitListCard from "./OutfitListCard";
import EmptyOutfitState from "./EmptyOutfitState";

import COLORS from "../../../theme/colors";

export default function OutfitList({
  outfits = [],
  loading,
  selectedOutfit,
  onSelect,
  onCreateOutfit,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Outfit</Text>

      {loading ? (
        <Text style={styles.loading}>Loading outfits...</Text>
      ) : outfits.length === 0 ? (
        <EmptyOutfitState onCreateOutfit={onCreateOutfit} />
      ) : (
        <FlatList
          data={outfits}
          keyExtractor={(item) => item._id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <OutfitListCard
              outfit={item}
              selected={selectedOutfit?._id === item._id}
              onPress={onSelect}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
  },

  row: {
    justifyContent: "space-between",
  },

  loading: {
    textAlign: "center",
    paddingVertical: 30,
    color: COLORS.secondary,
  },
});
