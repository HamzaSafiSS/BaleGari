/**
 * Driver Earnings Screen
 *
 * Responsibilities:
 * - Display earnings summary
 * - Show completed trip history
 *
 * Supabase (planned):
 * - Fetch earnings data
 * - Trip history queries
 */

import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/ui/card";
import { Design, Fonts } from "../../constants/theme";

export default function DriverEarnings() {
  const router = useRouter();

  const dummyTrips = [
    { id: 1, name: "Tigist H.", time: "2:30 PM", dist: "5.2 km", price: "180" },
    { id: 2, name: "Dawit M.", time: "1:15 PM", dist: "7.8 km", price: "220" },
    { id: 3, name: "Sara B.", time: "11:45 AM", dist: "3.5 km", price: "150" },
    {
      id: 4,
      name: "Yonas T.",
      time: "10:30 AM",
      dist: "12.1 km",
      price: "320",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Green Header Section */}
      <View style={styles.headerContainer}>
        <SafeAreaView edges={["top"]}>
          {/* Nav Bar */}
          <View style={styles.navBar}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.navTitle}>Earnings</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Today's Earnings Main Display */}
          <View style={styles.mainStats}>
            <Text style={styles.mainLabel}>Today's Earnings</Text>
            <Text style={styles.mainAmount}>
              1,250 <Text style={styles.currency}>ETB</Text>
            </Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Summary Cards Row */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <MaterialIcons
                name="calendar-today"
                size={16}
                color="#757575"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.summaryLabel}>This Week</Text>
            </View>
            <Text style={styles.summaryAmount}>8,400 ETB</Text>
          </View>

          <View style={{ width: 12 }} />

          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <MaterialIcons
                name="trending-up"
                size={16}
                color="#757575"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.summaryLabel}>This Month</Text>
            </View>
            <Text style={styles.summaryAmount}>32,500 ETB</Text>
          </View>
        </View>

        {/* Trips List Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Trips</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Trips List */}
        <View style={styles.tripList}>
          {dummyTrips.map((trip) => (
            <Card key={trip.id} style={styles.tripCard}>
              {/* Icon */}
              <View style={styles.tripIconBox}>
                <MaterialIcons
                  name="directions-car"
                  size={20}
                  color="#757575"
                />
              </View>

              {/* Info */}
              <View style={styles.tripInfo}>
                <Text style={styles.tripPassenger}>{trip.name}</Text>
                <Text style={styles.tripMeta}>
                  {trip.time} • {trip.dist}
                </Text>
              </View>

              {/* Price */}
              <Text style={styles.tripPrice}>{trip.price} ETB</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FA", // Light grey background for content
  },
  headerContainer: {
    backgroundColor: Design.primary,
    paddingBottom: 48, // Extract space for overlap if needed, or just padding
    paddingHorizontal: 20,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  navTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  mainStats: {
    marginTop: 24,
  },
  mainLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginBottom: 4,
  },
  mainAmount: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: -0.5,
    fontFamily: Fonts?.sans,
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  contentContainer: {
    flex: 1,
    marginTop: -24, // Overlap effect
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  summaryRow: {
    flexDirection: "row",
    marginBottom: 32,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    color: "#757575",
    fontSize: 13,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
  },
  seeAllText: {
    color: Design.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  tripList: {
    gap: 12,
  },
  tripCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
    shadowOpacity: 0.02,
  },
  tripIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  tripInfo: {
    flex: 1,
  },
  tripPassenger: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 4,
  },
  tripMeta: {
    fontSize: 12,
    color: "#757575",
  },
  tripPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: Design.primary,
  },
});
