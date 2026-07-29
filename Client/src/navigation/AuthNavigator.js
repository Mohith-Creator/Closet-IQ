import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../screens/auth/WelcomeScreen";
import Login from "../screens/auth/LoginScreen";
import Signup from "../screens/auth/SignupScreen";
import Forgot from "../screens/auth/ForgotPassword";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Forgot" component={Forgot} />
    </Stack.Navigator>
  );
}
