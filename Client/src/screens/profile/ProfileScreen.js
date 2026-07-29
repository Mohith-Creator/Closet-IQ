import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import { useAuth } from "../../context/AuthContext";

import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

import COLORS from "../../theme/colors";
import SHADOW from "../../theme/shadows";

import { getItems } from "../../services/itemService";
import { getOutfits } from "../../services/outfitService";

import profileMenu from "../../constants/profile/profileMenu";
import getProfileStats from "../../constants/profile/profileStats";

import MenuItem from "../../components/profile/MenuItem";
import ConfirmationModal from "../../components/common/ConfirmationModal";

export default function ProfileScreen({ navigation }) {
  const { userData } = useAuth();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [stats, setStats] = useState({
    items: 0,
    outfits: 0,
    utilization: 0,
    favorites: 0,
  });

  const loadStats = async () => {
    try {
      const items = await getItems();
      const favorites = items.filter((item) => item.favorite).length;
      const outfits = await getOutfits();
      const utilizedItems = items.filter((item) => item.wearCount > 0).length;
      const utilization =
        items.length > 0 ? Math.round((utilizedItems / items.length) * 100) : 0;
      setStats({
        items: items.length,
        outfits: outfits.length,
        utilization,
        favorites,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, []),
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.topIcon}
              onPress={() => navigation.navigate("Notifications")}
            >
              <Ionicons
                name="notifications-outline"
                size={20}
                color={COLORS.text}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topIcon}>
              <Ionicons name="settings-outline" size={20} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* PROFILE CARD */}

        <View style={styles.profileCard}>
          {userData?.avatar ? (
            <Image source={{ uri: userData.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {userData?.name
                  ? userData.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()
                  : "U"}
              </Text>
            </View>
          )}
          <View style={styles.userInfo}>
            <Text style={styles.name}>{userData?.name || "User"}</Text>
            <Text style={styles.username}>
              @{userData?.username || "username"}
            </Text>
            <Text style={styles.email}>{userData?.email || "No Email"}</Text>
          </View>
        </View>

        {/* STATS */}

        <Text style={styles.sectionTitle}>My Stats</Text>
        <View style={styles.statsCard}>
          {getProfileStats(stats).map((item, index) => (
            <View key={index} style={styles.statItem}>
              <View style={styles.statIcon}>
                {item.type === "mc" ? (
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={20}
                    color={COLORS.primary}
                  />
                ) : (
                  <Ionicons name={item.icon} size={20} color={COLORS.primary} />
                )}
              </View>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* MENU */}

        <Text style={styles.sectionTitle}>Accounts</Text>
        <View style={styles.menuContainer}>
          {profileMenu.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              icon={item.icon}
              type={item.type}
              isLast={index === profileMenu.length - 1}
              onPress={() => {
                if (item.screen) {
                  navigation.navigate(item.screen, item.params);
                }
              }}
            />
          ))}
        </View>

        {/* BUTTONS */}

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setLogoutModalVisible(true)}
        >
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color={COLORS.primary}
          />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        <View style={styles.versionCard}>
          <Text style={styles.versionInfo}>
            ClosetIQ • Version 1.0.0 • Made with ❤️
          </Text>
        </View>
      </ScrollView>
      <ConfirmationModal
        visible={logoutModalVisible}
        icon="log-out"
        iconType="feather"
        title="Log Out"
        message="Are you sure you want to log out of ClosetIQ?"
        confirmText="Log Out"
        cancelText="Cancel"
        confirmType="danger"
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={() => {
          setLogoutModalVisible(false);
          handleLogout();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 90,
  },

  /* Header */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
  },

  headerIcons: {
    flexDirection: "row",
  },

  topIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.small,
  },

  /* Profile Card */

  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 22,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.medium,
  },

  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: COLORS.profileAvatarBg,
    borderWidth: 2,
    borderColor: COLORS.profileAvatarBorder,

    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.primary,
  },

  userInfo: {
    flex: 1,
    marginLeft: 18,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  username: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },

  email: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.secondary,
  },

  /* Section */

  sectionTitle: {
    marginTop: 28,
    marginBottom: 14,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: 0.3,
  },

  /* Stats */

  statsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    ...SHADOW.medium,
  },

  statItem: {
    alignItems: "center",
    flex: 1,
  },

  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.profileStatIconBg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  statValue: {
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 2,
  },

  statLabel: {
    marginTop: 5,
    fontSize: 12,
    color: COLORS.secondary,
    textAlign: "center",
  },

  /* Menu */

  menuContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 6,
    overflow: "hidden",
    ...SHADOW.medium,
  },

  /* Logout */

  logoutBtn: {
    height: 56,
    marginTop: 24,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.medium,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
    marginLeft: 8,
  },

  /* Optional Version Card */

  versionCard: {
    marginTop: 18,
    alignItems: "center",
    paddingVertical: 10,
  },

  versionInfo: {
    fontSize: 13,
    color: COLORS.secondary,
    fontWeight: "500",
    textAlign: "center",
  },

  footer: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.profileFooterText,
  },
});
