import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import COLORS from "../../theme/colors";
import { deletePlan } from "../../services/plannerService";
import OutfitPreview from "../../components/planner/planners/OutfitPreview";

export default function PlanDetailsScreen({ route, navigation }) {
  const { plan } = route.params;

  const outfit = plan.outfit;
  const isOutfitMissing = !outfit;

  const formattedDate = new Date(plan.date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleEdit = () => {
    navigation.navigate("CreatePlan", {
      mode: "edit",
      plan,
    });
  };

  const handleDelete = () => {
    Alert.alert("Delete Plan", "Are you sure you want to delete this plan?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deletePlan(plan._id);

            navigation.navigate("Planner", {
              snackbar: {
                message: "Plan deleted successfully",
                icon: "checkmark-circle",
              },
            });
          } catch {
            Alert.alert("Error", "Failed to delete plan.");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.title}>Planned Outfit</Text>

        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <OutfitPreview outfit={outfit} style={styles.preview} />

        {isOutfitMissing ? (
          <>
            <Text style={styles.sectionTitle}>Choose a Replacement</Text>
            <TouchableOpacity
              style={styles.replaceButton}
              onPress={() =>
                navigation.navigate("SavedOutfits", {
                  plannerMode: true,
                  planId: plan._id,
                })
              }
            >
              <Ionicons name="swap-horizontal" size={18} color="#FFF" />

              <Text style={styles.replaceText}>Replace Outfit</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.outfitName}>{outfit.name}</Text>
        )}
        {isOutfitMissing && (
          <View style={styles.warningCard}>
            <Ionicons name="warning-outline" size={22} color={COLORS.warning} />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.warningTitle}>Outfit Removed</Text>

              <Text style={styles.warningText}>
                This outfit has been deleted. Choose another saved outfit to
                keep this plan.
              </Text>
            </View>
          </View>
        )}

        <View style={styles.infoSection}>
          <InfoRow icon="calendar-outline" text={formattedDate} />

          {plan.occasion ? (
            <InfoRow icon="sparkles-outline" text={plan.occasion} />
          ) : null}

          {plan.weather ? (
            <InfoRow icon="sunny-outline" text={plan.weather} />
          ) : null}

          {plan.timeOfDay ? (
            <InfoRow icon="time-outline" text={plan.timeOfDay} />
          ) : null}
        </View>

        {plan.notes ? (
          <>
            <Text style={styles.sectionTitle}>Notes</Text>

            <View style={styles.notesCard}>
              <Text style={styles.notes}>{plan.notes}</Text>
            </View>
          </>
        ) : null}

        {plan.reminder?.enabled ? (
          <>
            <Text style={styles.sectionTitle}>Reminder</Text>

            <View style={styles.reminderCard}>
              <Ionicons
                name="notifications-outline"
                size={18}
                color={COLORS.primary}
              />

              <Text style={styles.reminderText}>
                {plan.reminder.minutesBefore} minutes before
              </Text>
            </View>
          </>
        ) : null}

        <View style={styles.actions}>
          {!isOutfitMissing && (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Ionicons
                name="create-outline"
                size={18}
                color={COLORS.primary}
              />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.deleteButton,
              isOutfitMissing && styles.fullWidthButton,
            ]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={18} color="#C0392B" />

            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, text }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={18} color={COLORS.primary} />

      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  preview: {
    marginBottom: 24,
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  outfitName: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 22,
  },

  infoSection: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 24,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  infoText: {
    marginLeft: 12,
    fontSize: 15,
    color: COLORS.text,
    flex: 1,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 14,
  },

  notesCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },

  notes: {
    fontSize: 15,
    color: COLORS.secondary,
    lineHeight: 24,
  },

  reminderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 28,
  },

  reminderText: {
    marginLeft: 12,
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: "600",
  },

  warningCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.warningBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },

  warningTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.warning,
  },

  warningText: {
    marginTop: 4,
    color: COLORS.secondary,
    lineHeight: 20,
  },

  replaceButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  replaceText: {
    marginLeft: 8,
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },

  actions: {
    flexDirection: "row",
    marginTop: 6,
  },

  editButton: {
    flex: 1,
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 8,
  },

  deleteButton: {
    flex: 1,
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E74C3C",
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 8,
  },

  fullWidthButton: {
    flex: 1,
    marginLeft: 0,
  },

  editText: {
    marginLeft: 8,
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "700",
  },

  deleteText: {
    marginLeft: 8,
    color: "#C0392B",
    fontSize: 15,
    fontWeight: "700",
  },
});
