import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../theme/colors";

export default function OutfitCardPreview({
  outfit,
  height = 175,
  backgroundColor = "#F7EBDD",
  style,
}) {
  const top = outfit?.items?.find(
    (item) => item.category === "Top" || item.category === "Tops",
  );

  const bottom = outfit?.items?.find(
    (item) => item.category === "Bottom" || item.category === "Bottoms",
  );

  const shoes = outfit?.items?.find((item) => item.category === "Shoes");

  const accessory = outfit?.items?.find(
    (item) => item.category === "Accessory" || item.category === "Accessories",
  );

  const topSize = height * 0.64;
  const bottomSize = height * 0.63;
  const shoeSize = height * 0.46;
  const accessorySize = height * 0.23;

  const topOffset = height * 0.03;
  const bottomOffset = height * 0.29;

  const shoeLeft = height * 0.1;
  const shoeBottom = 0;

  const accessoryRight = height * 0.1;
  const accessoryBottom = height * 0.1;

  const bottomRight = -(height * 0.085);

  const renderItem = (item, icon, style) => {
    if (!item?.image) {
      return <Ionicons name={icon} size={24} color={COLORS.muted} />;
    }

    return (
      <Image source={{ uri: item.image }} style={style} resizeMode="contain" />
    );
  };

  return (
    <View
      style={[
        styles.container,
        style,
        {
          height,
          backgroundColor,
        },
      ]}
    >
      <View
        style={[
          styles.top,
          {
            top: topOffset,
          },
        ]}
      >
        {renderItem(top, "shirt-outline", {
          width: topSize,
          height: topSize,
        })}
      </View>

      <View
        style={[
          styles.bottom,
          {
            top: bottomOffset,
            right: bottomRight,
          },
        ]}
      >
        {renderItem(bottom, "apps-outline", {
          width: bottomSize,
          height: bottomSize,
        })}
      </View>

      <View
        style={[
          styles.shoes,
          {
            left: shoeLeft,
            bottom: shoeBottom,
          },
        ]}
      >
        {renderItem(shoes, "footsteps-outline", {
          width: shoeSize,
          height: shoeSize,
        })}
      </View>

      {accessory?.image && (
        <View
          style={[
            styles.accessory,
            {
              right: accessoryRight,
              bottom: accessoryBottom,
            },
          ]}
        >
          <Image
            source={{ uri: accessory.image }}
            style={{
              width: accessorySize,
              height: accessorySize,
            }}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    margin: 5,
  },

  top: {
    position: "absolute",
    left: 0,
    zIndex: 2,
  },

  bottom: {
    position: "absolute",
    zIndex: 1,
  },

  shoes: {
    position: "absolute",
  },

  accessory: {
    position: "absolute",
  },
});
