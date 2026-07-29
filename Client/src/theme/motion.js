import { Easing } from "react-native";

const MOTION = {
  duration: {
    background: 350,
    card: 450,
    logo: 450,

    title: 250,
    subtitle: 220,

    input: 180,
    button: 220,

    social: 180,
    footer: 180,

    stagger: 55,
  },

  delay: {
    card: 60,
    logo: 170,
    title: 230,
    subtitle: 290,
    inputs: 340,
    button: 620,
    social: 720,
    footer: 820,
  },

  spring: {
    card: {
      damping: 18,
      stiffness: 180,
      mass: 0.9,
    },

    logo: {
      damping: 15,
      stiffness: 220,
      mass: 0.8,
    },

    button: {
      damping: 14,
      stiffness: 220,
      mass: 0.8,
    },
  },

  easing: {
    standard: Easing.out(Easing.cubic),
  },
};

export default MOTION;
