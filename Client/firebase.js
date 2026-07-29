  import { initializeApp } from "firebase/app";
  import { initializeAuth, getReactNativePersistence } from "firebase/auth";
  import AsyncStorage from "@react-native-async-storage/async-storage";

  const firebaseConfig = {
    apiKey: "AIzaSyCAonF_g9_EEGZR9alAa3lIbT7wQbNC9lM",
    authDomain: "closetiq-93222.firebaseapp.com",
    projectId: "closetiq-93222",
    storageBucket: "closetiq-93222.appspot.com",
    messagingSenderId: "776507594077",
    appId: "1:776507594077:web:946a7e7794d69ce9e5c4b4",
  };

  const app = initializeApp(firebaseConfig);

  export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
