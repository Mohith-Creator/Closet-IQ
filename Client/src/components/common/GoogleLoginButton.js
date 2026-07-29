import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { auth } from "../../../firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
WebBrowser.maybeCompleteAuthSession();

export default function GoogleLoginButton({ onLoginSuccess }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "776507594077-m6bh0qad75efcr60efqrnu2olpu5vhc2.apps.googleusercontent.com",
    androidClientId:
      "776507594077-eaamutu7e63k1941ur3stpoqdeac5omu.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.authentication;

      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential).then((res) => {
        const user = res.user;

        onLoginSuccess({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
      });
    }
  }, [response]);

  return (
    <TouchableOpacity
      style={styles.googleBtn}
      onPress={() => promptAsync({ useProxy: true })}
    >
      <Text style={styles.googleText}>Google</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  googleBtn: {
    backgroundColor: "#EFE7E1",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  googleText: {
    fontWeight: "500",
  },
});
