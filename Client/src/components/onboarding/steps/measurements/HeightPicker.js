import React, { useMemo, useRef, useState, useEffect } from "react";
import { View, Text, Animated, FlatList, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

import COLORS from "../../../../theme/colors";

const ITEM_HEIGHT = 60;
const VISIBLE_ITEMS = 5;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

export default function HeightPicker({
  value = "170",
  onChange,
  min = 120,
  max = 230,
}) {
  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [unit, setUnit] = useState("cm");
  const [selectedHeight, setSelectedHeight] = useState(Number(value));

  const heights = useMemo(
    () => Array.from({ length: max - min + 1 }, (_, i) => min + i),
    [min, max],
  );

  useEffect(() => {
    setSelectedHeight(Number(value));

    requestAnimationFrame(() => {
      flatListRef.current?.scrollToOffset({
        offset: (Number(value) - min) * ITEM_HEIGHT,
        animated: false,
      });
    });
  }, []);

  const cmToFeet = (cm) => {
    const inches = cm / 2.54;
    const feet = Math.floor(inches / 12);
    const rem = Math.round(inches % 12);

    return `${feet}'${rem}"`;
  };

  const updateHeight = async (height) => {
    if (height === selectedHeight) return;

    setSelectedHeight(height);

    onChange?.(String(height));

    try {
      await Haptics.selectionAsync();
    } catch {}
  };

  const onMomentumEnd = (e) => {
    const offset = e.nativeEvent.contentOffset.y;

    const index = Math.round(offset / ITEM_HEIGHT);

    const height = heights[index];

    if (height) {
      updateHeight(height);

      flatListRef.current?.scrollToOffset({
        offset: index * ITEM_HEIGHT,
        animated: true,
      });
    }
  };

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 2) * ITEM_HEIGHT,
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
      (index + 2) * ITEM_HEIGHT,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.72, 0.85, 1.15, 0.85, 0.72],
      extrapolate: "clamp",
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.25, 0.6, 1, 0.6, 0.25],
      extrapolate: "clamp",
    });

    const color = item === selectedHeight ? COLORS.primary : "#9AA0AE";

    return (
      <Animated.View
        style={{
          height: ITEM_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
          opacity,
          transform: [{ scale }],
        }}
      >
        <Text
          style={{
            fontSize: 34,
            fontWeight: item === selectedHeight ? "800" : "500",
            color,
          }}
        >
          {unit === "cm" ? item : cmToFeet(item)}
        </Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Unit Toggle */}
      <View style={styles.toggle}>
        <Pressable
          onPress={() => setUnit("cm")}
          style={[styles.toggleBtn, unit === "cm" && styles.toggleActive]}
        >
          <Text
            style={[
              styles.toggleText,
              unit === "cm" && styles.toggleTextActive,
            ]}
          >
            CM
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setUnit("ft")}
          style={[styles.toggleBtn, unit === "ft" && styles.toggleActive]}
        >
          <Text
            style={[
              styles.toggleText,
              unit === "ft" && styles.toggleTextActive,
            ]}
          >
            FT
          </Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.pickerContainer,
          {
            height: PICKER_HEIGHT,
            overflow: "hidden",
          },
        ]}
      >
        <View style={styles.selector} />

        <Animated.FlatList
          ref={flatListRef}
          data={heights}
          keyExtractor={(item) => item.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          bounces={false}
          overScrollMode="never"
          scrollEventThrottle={16}
          onMomentumScrollEnd={onMomentumEnd}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {
              useNativeDriver: false,
              listener: (event) => {
                const offset = event.nativeEvent.contentOffset.y;
                const index = Math.round(offset / ITEM_HEIGHT);

                const current = heights[index];

                if (current && current !== selectedHeight) {
                  setSelectedHeight(current);
                }
              },
            },
          )}
          contentContainerStyle={{
            paddingTop: ITEM_HEIGHT * 2,
            paddingBottom: ITEM_HEIGHT * 2,
          }}
        />
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
  },

  step: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "700",
    letterSpacing: 1,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 8,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.secondary,
    marginTop: 8,
    marginBottom: 24,
  },

  toggle: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 30,
    padding: 4,
    marginBottom: 24,
  },

  toggleBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
  },

  toggleActive: {
    backgroundColor: COLORS.primary,
  },

  toggleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#777",
  },

  toggleTextActive: {
    color: "#FFF",
  },

  valueContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  bigValue: {
    fontSize: 52,
    fontWeight: "900",
    color: COLORS.text,
  },

  pickerWrapper: {
    height: PICKER_HEIGHT,
    justifyContent: "center",
  },

  pickerContainer: {
    height: PICKER_HEIGHT,
    overflow: "hidden",
  },

  selector: {
    position: "absolute",
    top: ITEM_HEIGHT * 2,
    left: 12,
    right: 12,
    height: ITEM_HEIGHT,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: "rgba(0,0,0,0.03)",
    zIndex: 5,
    pointerEvents: "none", // <-- important
  },

  topFade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 10,
  },

  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 10,
  },

  button: {
    marginTop: "auto",
    marginBottom: 40,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
};
