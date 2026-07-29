import React from "react";
import { View, Text, StyleSheet } from "react-native";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

const DotRating = ({ value, active }) => (
  <View style={styles.dotsContainer}>
    {[1, 2, 3, 4, 5].map((dot) => (
      <View
        key={dot}
        style={[
          styles.dot,
          active && dot <= value ? styles.activeDot : styles.inactiveDot,
        ]}
      />
    ))}
  </View>
);

const MetricRow = ({ title, value, active }) => (
  <View style={styles.metricRow}>
    <Text style={styles.metricTitle}>{title}</Text>

    <DotRating value={value} active={active} />
  </View>
);

export default function StyleScoreCard({ hasOutfit, score, outfit }) {
  const balance =
    outfit?.top && outfit?.bottom ? 5 : outfit?.top || outfit?.bottom ? 3 : 0;

  const colorHarmony = outfit?.top && outfit?.bottom ? 4 : 0;

  const versatility = score >= 80 ? 5 : score >= 60 ? 4 : score >= 40 ? 3 : 2;

  const weatherFit = outfit?.top && outfit?.bottom ? 4 : 2;
  return (
    <View style={styles.card}>
      {/* Header */}
      <Text style={styles.heading}>STYLE SCORE</Text>

      <View style={styles.content}>
        {/* Left Side */}
        <View style={styles.scoreSection}>
          <Text style={styles.score}>
            {hasOutfit ? score : "--"}

            <Text style={styles.outOf}>/100</Text>
          </Text>
        </View>

        {/* Right Side */}
        <View style={styles.metricsSection}>
          <MetricRow title="Balance" value={balance} active={hasOutfit} />

          <MetricRow
            title="Color Harmony"
            value={colorHarmony}
            active={hasOutfit}
          />

          <MetricRow
            title="Versatility"
            value={versatility}
            active={hasOutfit}
          />

          <MetricRow
            title="Weather Fit"
            value={weatherFit}
            active={hasOutfit}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.card,
  },

  heading: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },

  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  scoreSection: {
    width: 100,
  },

  score: {
    fontSize: 42,
    fontWeight: "800",
    color: COLORS.primaryDark,
    lineHeight: 44,
  },

  outOf: {
    fontSize: 20,
    color: COLORS.secondary,
    fontWeight: "600",
  },

  metricsSection: {
    width: 180,
  },

  metricTitle: {
    width: 85,
    fontSize: 11,
    color: COLORS.text,
  },

  metricRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  dotsContainer: {
    flexDirection: "row",
    marginLeft: 18,
    gap: 6,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },

  activeDot: {
    backgroundColor: COLORS.primaryDark,
  },

  inactiveDot: {
    backgroundColor: COLORS.inactive,
  },
});
