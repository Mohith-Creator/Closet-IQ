import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/home/HomeScreen";
import ClosetScreen from "../screens/closet/ClosetScreen";
import OutfitScreen from "../screens/outfits/OutfitBuilderScreen";
import InsightsScreen from "../screens/insights/InsightsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, navigation }) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 25,
        left: 18,
        right: 18,
        height: 78,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#EDE3D9",
        borderRadius: 32,
        paddingBottom: 6,
        paddingTop: 6,
        borderWidth: 1,
        borderColor: "#E3D5C7",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 10,
      }}
    >
      {state.routes.map((route, index) => {

        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.8}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* HOME */}
            {route.name === "Home" && (
              <Ionicons
                name={isFocused ? "home" : "home-outline"}
                size={24}
                color={isFocused ? "#5B4B3A" : "#9F9489"}
              />
            )}

            {/* CLOSET */}
            {route.name === "Closet" && (
              <Ionicons
                name={isFocused ? "shirt" : "shirt-outline"}
                size={24}
                color={isFocused ? "#5B4B3A" : "#9F9489"}
              />
            )}

            {/* OUTFITS */}
            {route.name === "Outfits" && (
              <MaterialCommunityIcons
                name="hanger"
                size={24}
                color={isFocused ? "#5B4B3A" : "#9F9489"}
              />
            )}

            {/* INSIGHTS */}
            {route.name === "Insights" && (
              <Ionicons
                name={isFocused ? "stats-chart" : "stats-chart-outline"}
                size={24}
                color={isFocused ? "#5B4B3A" : "#9F9489"}
              />
            )}

            {/* PROFILE */}
            {route.name === "Profile" && (
              <Ionicons
                name={isFocused ? "person" : "person-outline"}
                size={24}
                color={isFocused ? "#5B4B3A" : "#9F9489"}
              />
            )}

            <Text
              style={{
                marginTop: 4,
                fontSize: 11,
                fontWeight: isFocused ? "700" : "500",
                color: isFocused ? "#5B4B3A" : "#9F9489",
              }}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Closet" component={ClosetScreen} />
      <Tab.Screen
        name="Outfits"
        component={OutfitScreen}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen name="Insights" component={InsightsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
