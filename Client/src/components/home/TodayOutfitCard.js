import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40;
const ITEM_WIDTH = CARD_WIDTH + 16;

export default function TodayOutfitCard({ outfits = [] }) {
  if (!outfits.length) return null;
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View>
      <FlatList
        horizontal
        data={outfits}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH}
        snapToAlignment="start"
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        keyExtractor={(item) =>
          `${item.occasion}-${item.generated ? "ai" : "saved"}-${item._id}`
        }
        onScroll={({ nativeEvent }) => {
          const index = Math.min(
            outfits.length - 1,
            Math.max(0, Math.round(nativeEvent.contentOffset.x / ITEM_WIDTH)),
          );

          if (index !== currentIndexRef.current) {
            currentIndexRef.current = index;
            setCurrentIndex(index);
          }
        }}
        scrollEventThrottle={16}
        renderItem={({ item: outfit }) => (
          <View style={[styles.card, { width: CARD_WIDTH }]}>
            <View style={styles.header}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{outfit.occasion}</Text>
              </View>

              {outfit.generated && (
                <View style={styles.aiBadge}>
                  <Text style={styles.aiText}>AI Generated</Text>
                </View>
              )}
            </View>

            <View style={styles.grid}>
              {outfit.items?.[0] && (
                <Image
                  source={{ uri: outfit.items[0].image }}
                  style={styles.top}
                />
              )}

              {outfit.items?.[1] && (
                <Image
                  source={{ uri: outfit.items[1].image }}
                  style={styles.bottom}
                />
              )}

              {outfit.items?.[2] && (
                <Image
                  source={{ uri: outfit.items[2].image }}
                  style={styles.shoes}
                />
              )}

              {outfit.items?.[3] && (
                <Image
                  source={{ uri: outfit.items[3].image }}
                  style={styles.accessory}
                />
              )}
            </View>
          </View>
        )}
      />

      <View style={styles.pagination}>
        {outfits.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.todayOutfitCard,
    borderRadius: 24,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.todayOutfitBorder,
    ...SHADOW.card,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  aiBadge: {
    backgroundColor: "#EEF6FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  aiText: {
    color: "#2563EB",
    fontSize: 11,
    fontWeight: "700",
  },

  tag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.todayOutfitTagBg,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 6,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D8D2CB",
    marginHorizontal: 4,
  },

  activeDot: {
    width: 22,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.todayOutfitTagText,
  },

  grid: {
    marginTop: 0,
    height: 300,
    position: "relative",
  },

  top: {
    position: "absolute",
    left: 10,
    top: 10,
    width: 180,
    height: 170,
    zIndex: 999,
    resizeMode: "contain",
    transform: [{ scale: 1.25 }],
  },

  bottom: {
    position: "absolute",
    right: 10,
    top: 25,
    width: 145,
    height: 220,
    resizeMode: "contain",
    transform: [{ scale: 1.2 }],
  },

  accessory: {
    position: "absolute",
    right: 80,
    top: 5,
    width: 38,
    height: 38,
    resizeMode: "contain",
  },

  shoes: {
    position: "absolute",
    left: 50,
    bottom: 25,
    width: 150,
    height: 90,
    resizeMode: "contain",
    transform: [{ scale: 1.3 }],
  },
});
