import React, { useRef, useState, useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";

import COLORS from "../../../../theme/colors";

const ITEM_WIDTH = 90;
const PICKER_WIDTH = ITEM_WIDTH * 5;

// Ground truth data array remains strictly index-locked
const UK_SIZES = Array.from({ length: 23 }, (_, i) => 3 + i * 0.5); // [3.0, 3.5, ..., 14.0]

const CONVERSION = {
  UK: (v) => v.toFixed(1),
  US: (v) => (v + 1).toFixed(1),
  EU: (v) => (v + 34).toFixed(0), // EU standard usually drops decimals
};

export default function ShoeSizePicker({ value = 7, unit = "UK", onChange }) {
  const listRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [selectedSize, setSelectedSize] = useState(Number(value));

useEffect(() => {
  const numericValue = Number(value);
  setSelectedSize(numericValue);
  requestAnimationFrame(() => {
    const index = UK_SIZES.indexOf(numericValue);
    if (index >= 0) {
      listRef.current?.scrollToOffset({
        offset: index * ITEM_WIDTH,
        animated: false,
      });
    }
  });
}, [value]);

  const updateSize = async (size) => {
    console.log("Selected shoe size:", size);

    if (size === selectedSize) return;

    setSelectedSize(size);
    onChange?.(size);

    try {
      await Haptics.selectionAsync();
    } catch {}
  };

  const handleMomentumEnd = (e) => {
    const offset = e.nativeEvent.contentOffset.x;
    const index = Math.round(offset / ITEM_WIDTH);
    const size = UK_SIZES[index];
    if (size) {
      updateSize(size);
      listRef.current?.scrollToOffset({
        offset: index * ITEM_WIDTH,
        animated: true,
      });
    }
  };

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 2) * ITEM_WIDTH,
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
      (index + 2) * ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.72, 0.85, 1.15, 0.85, 0.72],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.25, 0.6, 1, 0.6, 0.25],
      extrapolate: "clamp",
    });

    const color = item === selectedSize ? COLORS.primary : "#9AA0AE";

    return (
      <Animated.View
        style={{
          width: ITEM_WIDTH,
          justifyContent: "center",
          alignItems: "center",
          opacity,
          transform: [{ scale }],
        }}
      >
        <Text
          style={{
            fontSize: 34,
            fontWeight: item === selectedSize ? "700" : "500",
            color,
          }}
        >
          {CONVERSION[unit](item)}
        </Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Picker Wheel Block */}
      <View
        style={[
          styles.pickerContainer,
          {
            height: 120,
            overflow: "hidden",
          },
        ]}
      >
        <View style={styles.selector} />

        <Animated.FlatList
          ref={listRef}
          horizontal
          data={UK_SIZES}
          keyExtractor={(item) => item.toString()}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          bounces={false}
          overScrollMode="never"
          disableIntervalMomentum
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleMomentumEnd}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {
              useNativeDriver: false,
              listener: (event) => {
                const offset = event.nativeEvent.contentOffset.x;
                const index = Math.round(offset / ITEM_WIDTH);

                const current = UK_SIZES[index];

                if (current && current !== selectedSize) {
                  setSelectedSize(current);
                }
              },
            },
          )}
          contentContainerStyle={{
            paddingHorizontal: ITEM_WIDTH * 2,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: PICKER_WIDTH,
    alignSelf: "center",
  },

  pickerContainer: {
    width: PICKER_WIDTH,
    alignSelf: "center",
  },

  selector: {
    position: "absolute",
    width: ITEM_WIDTH,
    left: ITEM_WIDTH * 2,
    top: 10,
    bottom: 10,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: "rgba(0,0,0,0.03)",
    zIndex: 5,
    pointerEvents: "none",
  },
});
