import { useEffect, useMemo, useRef } from "react";
import { Animated } from "react-native";

import MOTION from "../theme/motion";
import {
  timing,
  spring,
  parallel,
  sequence,
  stagger,
  delay,
} from "../utils/animationHelpers";

export default function useAuthMotion(options = {}) {
  const {
    inputCount = 4,
    animateSocial = true,
    animateFooter = true,
  } = options;

  /*
  ==========================================================
      Animated Values
  ==========================================================
  */

  const background = useRef(new Animated.Value(0)).current;
  const card = useRef(new Animated.Value(0)).current;
  const logo = useRef(new Animated.Value(0)).current;
  const title = useRef(new Animated.Value(0)).current;
  const subtitle = useRef(new Animated.Value(0)).current;
  const button = useRef(new Animated.Value(0)).current;
  const social = useRef(new Animated.Value(0)).current;
  const footer = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  /*
  ==========================================================
      Input Animations
  ==========================================================
  */

  const inputs = useRef(
    Array.from({ length: inputCount }, () => new Animated.Value(0)),
  ).current;

  /*
  ==========================================================
      Entrance Animation
  ==========================================================
  */

  useEffect(() => {
    const animations = [
      timing(background, {
        duration: MOTION.duration.background,
        easing: MOTION.easing.standard,
      }),

      sequence([delay(MOTION.delay.card), spring(card, MOTION.spring.card)]),

      sequence([delay(MOTION.delay.logo), spring(logo, MOTION.spring.logo)]),

      sequence([
        delay(MOTION.delay.title),
        timing(title, {
          duration: MOTION.duration.title,
          easing: MOTION.easing.standard,
        }),
      ]),

      sequence([
        delay(MOTION.delay.subtitle),
        timing(subtitle, {
          duration: MOTION.duration.subtitle,
          easing: MOTION.easing.standard,
        }),
      ]),

      sequence([
        delay(MOTION.delay.inputs),
        stagger(
          MOTION.duration.stagger,
          inputs.map((input) =>
            timing(input, {
              duration: MOTION.duration.input,
              easing: MOTION.easing.standard,
            }),
          ),
        ),
      ]),

      sequence([
        delay(MOTION.delay.button),
        spring(button, MOTION.spring.button),
      ]),
    ];

    if (animateSocial) {
      animations.push(
        sequence([
          delay(MOTION.delay.social),
          timing(social, {
            duration: MOTION.duration.social,
            easing: MOTION.easing.standard,
          }),
        ]),
      );
    }

    if (animateFooter) {
      animations.push(
        sequence([
          delay(MOTION.delay.footer),
          timing(footer, {
            duration: MOTION.duration.footer,
            easing: MOTION.easing.standard,
          }),
        ]),
      );
    }

    const animation = parallel(animations);

    animation.start();

    return () => animation.stop();
  }, []);

  /*
  ==========================================================
      Style Helpers
  ==========================================================
  */

  const fadeUpStyle = (value, distance = 12) => ({
    opacity: value,
    transform: [
      {
        translateY: value.interpolate({
          inputRange: [0, 1],
          outputRange: [distance, 0],
        }),
      },
    ],
  });

  /*
  ==========================================================
      Animated Styles
  ==========================================================
  */

  const backgroundStyle = useMemo(
    () => ({
      opacity: background.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: background.interpolate({
            inputRange: [0, 1],
            outputRange: [1.08, 1],
          }),
        },
      ],
    }),
    [background],
  );

  const backButtonStyle = useMemo(
    () => ({
      opacity: background,
      transform: [
        {
          translateX: background.interpolate({
            inputRange: [0, 1],
            outputRange: [-12, 0],
          }),
        },
        {
          scale: background.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }),
        },
      ],
    }),
    [background],
  );

  const cardStyle = useMemo(
    () => ({
      opacity: card,
      transform: [
        {
          translateY: card.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [40, -4, 0],
          }),
        },
        {
          scale: card.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0.96, 1.01, 1],
          }),
        },
      ],
    }),
    [card],
  );

  const logoStyle = useMemo(
    () => ({
      opacity: logo,
      transform: [
        {
          scale: logo.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0.82, 1.06, 1],
          }),
        },
      ],
    }),
    [logo],
  );

  const titleStyle = useMemo(() => fadeUpStyle(title, 10), [title]);

  const subtitleStyle = useMemo(() => fadeUpStyle(subtitle, 10), [subtitle]);

  const inputStyles = useMemo(
    () =>
      inputs.map((input) => ({
        opacity: input,
        transform: [
          {
            translateY: input.interpolate({
              inputRange: [0, 1],
              outputRange: [14, 0],
            }),
          },
        ],
      })),
    [inputs],
  );

  const getInputStyle = (index) => inputStyles[index];

  const buttonStyle = useMemo(
    () => ({
      opacity: button,
      transform: [
        {
          translateY: button.interpolate({
            inputRange: [0, 1],
            outputRange: [12, 0],
          }),
        },
        {
          scale: Animated.multiply(
            buttonScale,
            button.interpolate({
              inputRange: [0, 1],
              outputRange: [0.96, 1],
            }),
          ),
        },
      ],
    }),
    [button, buttonScale],
  );

  const socialStyle = useMemo(() => fadeUpStyle(social, 8), [social]);

  const footerStyle = useMemo(() => fadeUpStyle(footer, 8), [footer]);

  /*
  ==========================================================
      Button Press Animation
  ==========================================================
  */

  const pressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.985,
      useNativeDriver: true,
      damping: 18,
      stiffness: 260,
      mass: 0.8,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 18,
      stiffness: 260,
      mass: 0.8,
    }).start();
  };

  /*
  ==========================================================
      Exports
  ==========================================================
  */

  return {
    backgroundStyle,
    backButtonStyle,

    cardStyle,

    logoStyle,

    titleStyle,

    subtitleStyle,

    inputStyles,
    getInputStyle,

    buttonStyle,

    socialStyle,

    footerStyle,

    pressIn,
    pressOut,
  };
}
