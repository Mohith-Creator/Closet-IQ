import React, { useEffect, useRef } from "react";
import { Animated, Easing, View, StyleSheet } from "react-native";
import {
  Ionicons,
  Feather,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Svg, {
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  Circle,
  Path,
  Rect,
  G,
  Line,
} from "react-native-svg";
// ---------------------------------------------------------------------------
// Palette — single source of truth, matches the brief exactly
// ---------------------------------------------------------------------------
export const COLORS = {
  background: "#EFE7DC",
  backgroundCenter: "#F8F4EF",
  primary: "#4B2E1F",
  primaryLight: "#8A5A3B",
  secondary: "#8A8178",
  card: "#F8F4EF",
  border: "#E5D8CA",
  text: "#111111",
  textSecondary: "#777777",
};

export const LOGO_MARK = require("../../../../assets/logo-mark.png");
export const LOGO_WORDMARK = require("../../../../assets/logo-wordmark.png");

const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// ---------------------------------------------------------------------------
// Radial gradient backdrop with soft bloom — used behind every concept
// ---------------------------------------------------------------------------
export function BackgroundGlow({ width, height, opacity = 1 }) {
  const cx = width / 2;
  const cy = height * 0.42;
  return (
    <Svg
      width={width}
      height={height}
      style={StyleSheet.absoluteFillObject}
      opacity={opacity}
    >
      <Defs>
        <RadialGradient id="bg" cx="50%" cy="42%" r="65%">
          <Stop
            offset="0%"
            stopColor={COLORS.backgroundCenter}
            stopOpacity="1"
          />
          <Stop offset="55%" stopColor={COLORS.background} stopOpacity="1" />
          <Stop offset="100%" stopColor={COLORS.background} stopOpacity="1" />
        </RadialGradient>
        <RadialGradient id="bloom" cx="50%" cy="42%" r="30%">
          <Stop offset="0%" stopColor="#FFF7EC" stopOpacity="0.55" />
          <Stop offset="100%" stopColor="#FFF7EC" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width={width} height={height} fill="url(#bg)" />
      <Circle cx={cx} cy={cy} r={width * 0.55} fill="url(#bloom)" />
    </Svg>
  );
}

// ---------------------------------------------------------------------------
// The segmented AI ring — bronze/brown arcs, warm holographic feel
// ---------------------------------------------------------------------------
function polarArc(cx, cy, r, startDeg, endDeg) {
  const s = (Math.PI / 180) * startDeg;
  const e = (Math.PI / 180) * endDeg;
  const x1 = cx + r * Math.cos(s);
  const y1 = cy + r * Math.sin(s);
  const x2 = cx + r * Math.cos(e);
  const y2 = cy + r * Math.sin(e);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

export function AIRing({ size = 320, rotate = true, style }) {
  const spin = useRef(new Animated.Value(0)).current;
  const cx = size / 2;
  const cy = size / 2;

  useEffect(() => {
    if (!rotate) return;
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 22000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotate]);

  const rotateOuter = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const rotateInner = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-300deg"],
  });

  // three concentric rings, each broken into a few soft segments
  // ---------- PERFECTLY EVEN SEGMENTS ----------

  // 6 segments
  const SEGMENTS = 3;
  const ARC = 90;
  const GAP = 30;

  const outerSegs = Array.from({ length: SEGMENTS }, (_, i) => {
    const start = i * (ARC + GAP);
    return [start, start + ARC];
  });

  const midSegs = Array.from({ length: SEGMENTS }, (_, i) => {
    const start = i * (ARC + GAP) + 40;
    return [start, start + ARC];
  });

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { transform: [{ rotate: rotateOuter }] },
        ]}
      >
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id="bronze1" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop
                offset="0%"
                stopColor={COLORS.primaryLight}
                stopOpacity="0.95"
              />
              <Stop
                offset="100%"
                stopColor={COLORS.primary}
                stopOpacity="0.35"
              />
            </LinearGradient>
          </Defs>
          {outerSegs.map(([a, b], i) => (
            <Path
              key={i}
              d={polarArc(cx, cy, size * 0.46, a, b)}
              stroke="url(#bronze1)"
              strokeWidth={size * 0.018}
              strokeLinecap="round"
              fill="none"
            />
          ))}
        </Svg>
      </Animated.View>

      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { transform: [{ rotate: rotateInner }] },
        ]}
      >
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id="bronze2" x1="0%" y1="100%" x2="100%" y2="0%">
              <Stop
                offset="0%"
                stopColor={COLORS.secondary}
                stopOpacity="0.8"
              />
              <Stop
                offset="100%"
                stopColor={COLORS.primary}
                stopOpacity="0.25"
              />
            </LinearGradient>
          </Defs>
          {midSegs.map(([a, b], i) => (
            <Path
              key={i}
              d={polarArc(cx, cy, size * 0.39, a, b)}
              stroke="url(#bronze2)"
              strokeWidth={size * 0.01}
              strokeLinecap="round"
              fill="none"
            />
          ))}
        </Svg>
      </Animated.View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Floating particles + faint connecting AI lines
// ---------------------------------------------------------------------------
export function FloatingParticles({ width, height, count = 26 }) {
  const seeds = useRef(
    Array.from({ length: count }).map((_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.9 + height * 0.05,
      r: Math.random() * 2.5 + 1,
      delay: Math.random() * 2000,
      dur: 3000 + Math.random() * 3000,
      opacity: Math.random() * 0.35 + 0.1,
    })),
  ).current;

  const anims = useRef(seeds.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const loops = anims.map((a, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(seeds[i].delay),
          Animated.timing(a, {
            toValue: 1,
            duration: seeds[i].dur,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(a, {
            toValue: 0,
            duration: seeds[i].dur,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ),
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, []);

  // pick a handful of near neighbours to connect with faint lines
  const lines = [];
  for (let i = 0; i < seeds.length; i += 5) {
    const a = seeds[i];
    const b = seeds[(i + 3) % seeds.length];
    lines.push([a, b]);
  }

  return (
    <View style={[StyleSheet.absoluteFillObject]} pointerEvents="none">
      <Svg width={width} height={height} style={StyleSheet.absoluteFillObject}>
        {lines.map(([a, b], i) => (
          <Line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={COLORS.secondary}
            strokeWidth={0.6}
            opacity={0.12}
          />
        ))}
      </Svg>
      {seeds.map((s, i) => {
        const translateY = anims[i].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -14],
        });
        return (
          <Animated.View
            key={i}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              width: s.r * 2,
              height: s.r * 2,
              borderRadius: s.r,
              backgroundColor: COLORS.primaryLight,
              opacity: s.opacity,
              transform: [{ translateY }],
            }}
          />
        );
      })}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Frosted glass decorative orbs (glassmorphism, 15–20% transparency)
// ---------------------------------------------------------------------------
export function GlassOrb({ size, top, left, right, bottom }) {
  return (
    <View
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "rgba(248,244,239,0.18)",
        borderWidth: 1,
        borderColor: "rgba(229,216,202,0.5)",
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Minimal single-stroke outline icons — shirt, pants, shoes, watch, handbag
// ---------------------------------------------------------------------------
const iconStroke = COLORS.primary;

function IconBase({ size, opacity, children }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" opacity={opacity}>
      <G
        fill="none"
        stroke={iconStroke}
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </G>
    </Svg>
  );
}

export const ShirtIcon = ({ size = 22, opacity = 0.55 }) => (
  <Ionicons
    name="shirt-outline"
    size={size}
    color={COLORS.primary}
    style={{ opacity }}
  />
);

export const PantsIcon = ({ size = 22, opacity = 0.55 }) => (
  <MaterialCommunityIcons
    name="hanger"
    size={size}
    color={COLORS.primary}
    style={{ opacity }}
  />
);

export const ShoeIcon = ({ size = 22, opacity = 0.55 }) => (
  <Ionicons
    name="footsteps-outline"
    size={size}
    color={COLORS.primary}
    style={{ opacity }}
  />
);

export const WatchIcon = ({ size = 22, opacity = 0.55 }) => (
  <Ionicons
    name="watch-outline"
    size={size}
    color={COLORS.primary}
    style={{ opacity }}
  />
);

export const HandbagIcon = ({ size = 22, opacity = 0.55 }) => (
  <Ionicons
    name="bag-handle-outline"
    size={size}
    color={COLORS.primary}
    style={{ opacity }}
  />
);

export const FASHION_ICONS = [
  ShirtIcon,
  PantsIcon,
  ShoeIcon,
  WatchIcon,
  HandbagIcon,
];
