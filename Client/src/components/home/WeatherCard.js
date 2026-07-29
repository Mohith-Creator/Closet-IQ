import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";
import { WEATHER_API_KEY } from "../../config/constants";

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Loading...");

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") return;

      const location = await Location.getCurrentPositionAsync({});

      const { latitude, longitude } = location.coords;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`,
      );

      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setCity(data.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Ionicons
          name="partly-sunny-outline"
          size={34}
          color={COLORS.warning}
        />

        <View style={styles.weatherInfo}>
          <Text style={styles.temp}>
            {weather?.main?.temp ? `${Math.round(weather.main.temp)}°C` : "--"}
          </Text>

          <Text style={styles.weatherText}>
            {weather?.weather?.[0]?.description || "Loading"}
          </Text>
        </View>
      </View>

      <View>
        <Text style={styles.city}>{city}</Text>

        <Text style={styles.weatherText}>{new Date().toDateString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    padding: 20,
    backgroundColor: COLORS.softCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 26,
    ...SHADOW.card,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  weatherInfo: {
    marginLeft: 10,
  },

  temp: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.text,
  },

  city: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "right",
  },

  weatherText: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.secondary,
  },
});