import { Animated } from "react-native";

/**
 * Timing Animation
 */
export const timing = (value, config) =>
  Animated.timing(value, {
    toValue: 1,
    useNativeDriver: true,
    ...config,
  });

/**
 * Spring Animation
 */
export const spring = (value, config) =>
  Animated.spring(value, {
    toValue: 1,
    useNativeDriver: true,
    ...config,
  });

/**
 * Delay
 */
export const delay = (time) => Animated.delay(time);

/**
 * Parallel
 */
export const parallel = (animations) => Animated.parallel(animations);

/**
 * Sequence
 */
export const sequence = (animations) => Animated.sequence(animations);

/**
 * Stagger
 */
export const stagger = (time, animations) => Animated.stagger(time, animations);
