import "react-native-gesture-handler";

import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import SplashScreen from "./src/screens/auth/SplashScreen";

function RootNavigator() {
  const { setUserData } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const response = await fetch(
            "https://closet-iq-production.up.railway.app/api/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                name: firebaseUser.displayName || "",
              }),
            },
          );
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.log("Backend login error:", error);
        }
      } else {
        setUserData(null);
      }
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, [setUserData]);

  if (loading || !splashFinished) {
    return <SplashScreen onFinish={() => setSplashFinished(true)} />;
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
