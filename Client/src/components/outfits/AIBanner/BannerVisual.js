import React from "react";
import { View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

export default function BannerVisual() {
  return (
    <View style={styles.visualContainer}>
      <View style={styles.circleLarge} />
      <View style={styles.circleSmall} />

      <Image
        source={require("../../../../assets/outfit.png")}
        style={styles.outfitImage}
        resizeMode="contain"
      />

      <Ionicons
        name="sparkles"
        size={16}
        color="#E3B64D"
        style={styles.sparkleTop}
      />

      <Ionicons
        name="sparkles"
        size={12}
        color="#F2C96B"
        style={styles.sparkleRight}
      />

      <Ionicons
        name="sparkles"
        size={11}
        color="#F2C96B"
        style={styles.sparkleBottom}
      />
    </View>
  );
}