import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";

import ProfileSetup from "../screens/onboarding/ProfileSetup";
import StylePreferences from "../screens/onboarding/StylePreferences";
import BodyMeasurements from "../screens/onboarding/BodyMeasurements";

import AddItemScreen from "../screens/closet/AddItemScreen";
import EditItemDetailsScreen from "../screens/closet/EditItemDetailsScreen";
import AIDetectionResultsScreen from "../screens/closet/AIDetectionResultsScreen";

import AISuggestionScreen from "../screens/outfits/AISuggestionScreen";
import SavedOutfitsScreen from "../screens/outfits/SavedOutfitsScreen";
import ClosetSelectionScreen from "../screens/outfits/ClosetSelectionScreen";

import PlannerScreen from "../screens/planner/PlannerScreen";
import EmptyPlanScreen from "../screens/planner/EmptyPlanScreen";
import CreatePlanScreen from "../screens/planner/CreatePlanScreen";
import PlanDetailsScreen from "../screens/planner/PlanDetailsScreen";

import MeasurementsScreen from "../screens/profile/Measurements";
import HelpSupportScreen from "../screens/profile/HelpSupportScreen";
import NotificationScreen from "../screens/profile/NotificationScreen";
import PersonalInformation from "../screens/profile/PersonalInformation";
import ProfileStylePreferences from "../screens/profile/ProfileStylePreferences";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { userData } = useAuth();

  if (!userData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userData.isOnboarded ? (
        <>
          <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
          <Stack.Screen name="StylePreferences" component={StylePreferences} />
          <Stack.Screen name="BodyMeasurements" component={BodyMeasurements} />
        </>
      ) : (
        <>
          {/* BottomTabs */}
          <Stack.Screen name="MainApp" component={BottomTabs} />

          {/* Closet */}
          <Stack.Screen name="AddItem" component={AddItemScreen} />
          <Stack.Screen
            name="EditItemDetails"
            component={EditItemDetailsScreen}
          />
          <Stack.Screen
            name="AIDetectionResults"
            component={AIDetectionResultsScreen}
          />

          {/* Planner */}
          <Stack.Screen name="Planner" component={PlannerScreen} />
          <Stack.Screen name="EmptyPlan" component={EmptyPlanScreen} />
          <Stack.Screen name="CreatePlan" component={CreatePlanScreen} />
          <Stack.Screen name="PlanDetails" component={PlanDetailsScreen} />

          {/* Oufits */}
          <Stack.Screen name="AISuggestion" component={AISuggestionScreen} />
          <Stack.Screen
            name="ClosetSelection"
            component={ClosetSelectionScreen}
          />
          <Stack.Screen
            name="SavedOutfits"
            component={SavedOutfitsScreen}
            options={{
              headerShown: false,
            }}
          />

          {/* Profile */}
          <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
          <Stack.Screen name="Measurements" component={MeasurementsScreen} />
          <Stack.Screen
            name="PersonalInformation"
            component={PersonalInformation}
          />
          <Stack.Screen
            name="ProfileStylePreferences"
            component={ProfileStylePreferences}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
