/**
 * Active Ride Screen
 *
 * Responsibilities:
 * - Show current ride details
 * - Start and end ride flow
 *
 * Supabase (planned):
 * - Ride lifecycle updates
 * - Live location streaming
 */

import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "../../components/ui/card";
import { MapPlaceholder } from "../../components/ui/map-placeholder";
import { Design } from "../../constants/theme";

type RideStatus = "pickup" | "inprogress";

export default function DriverRide() {
  const router = useRouter();
  const [status, setStatus] = useState<RideStatus>("pickup");

  const handleAction = () => {
    if (status === "pickup") {
      setStatus("inprogress");
    } else {
      // Complete trip
      router.replace("/driver/home" as any);
    }
  };

  const isPickup = status === "pickup";

  return (
    <View style={styles.container}>
      {/* Map Background */}
      <View style={styles.mapContainer}>
        <MapPlaceholder />

        {/* Navigation Markers */}
        <View style={styles.navArrowContainer}>
          <View style={styles.navArrowCircle}>
            <MaterialIcons
              name="navigation"
              size={24}
              color="#000"
              style={{ transform: [{ rotate: "45deg" }] }}
            />
          </View>
        </View>

        {/* Destination Pin (Simulated position) */}
        {!isPickup && (
          <View style={{ position: "absolute", top: "30%", right: "20%" }}>
            <MaterialIcons
              name="location-pin"
              size={40}
              color={Design.danger}
            />
          </View>
        )}
      </View>

      {/* Top Banner */}
      <View style={styles.topBanner}>
        <SafeAreaView>
          <View style={styles.bannerContent}>
            <MaterialIcons
              name="navigation"
              size={24}
              color="#fff"
              style={styles.bannerIcon}
            />
            <View>
              <Text style={styles.bannerTitle}>
                {isPickup ? "Navigating to pickup" : "Trip in progress"}
              </Text>
              <Text style={styles.bannerSubtitle}>
                {isPickup ? "3 min • 1.2 km away" : "12 min • 5.2 km remaining"}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* Bottom Interface */}
      <SafeAreaView style={styles.bottomSafeArea}>
        <View style={styles.bottomContainer}>
          <Card style={styles.rideCard}>
            {/* Drag Handle */}
            <View style={styles.dragHandle} />

            {/* Passenger Info & Actions */}
            <View style={styles.passengerHeader}>
              <View style={styles.passengerInfo}>
                <View style={styles.avatar}>
                  <MaterialIcons name="person" size={24} color="#757575" />
                </View>
                <View>
                  <Text style={styles.passengerName}>Tigist Haile</Text>
                  <Text style={styles.passengerRole}>Passenger</Text>
                </View>
              </View>

              <View style={styles.contactActions}>
                <TouchableOpacity style={styles.contactButton}>
                  <MaterialIcons name="call" size={22} color={Design.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactButton}>
                  <MaterialIcons
                    name="chat-bubble-outline"
                    size={22}
                    color={Design.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Location Details (Dynamic) */}
            <View style={styles.locationContainer}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: isPickup ? Design.primary : Design.danger,
                  },
                ]}
              />
              <View>
                <Text style={styles.locationLabel}>
                  {isPickup ? "PICKUP LOCATION" : "DROP-OFF"}
                </Text>
                <Text style={styles.locationAddress}>
                  {isPickup ? "Bole Road, near Edna Mall" : "Meskel Square"}
                </Text>
              </View>
            </View>

            {/* Main Action Button */}
            <TouchableOpacity
              style={[styles.mainButton, !isPickup && styles.completeButton]}
              onPress={handleAction}
              activeOpacity={0.8}>
              <Text style={styles.mainButtonText}>
                {isPickup ? "I've Arrived" : "Complete Trip"}
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  navArrowContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -24,
    marginTop: -24,
  },
  navArrowCircle: {
    width: 48,
    height: 48,
    backgroundColor: "#FFC107",
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  topBanner: {
    backgroundColor: Design.primary,
    paddingTop: 8, // Simulate status bar height padding if safe area doesn't handle fully
    paddingBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bannerIcon: {
    marginRight: 12,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 2,
  },
  bannerSubtitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomSafeArea: {
    flex: 1,
    justifyContent: "flex-end",
    pointerEvents: "box-none", // Allow touches to pass through empty areas to map
  },
  bottomContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  rideCard: {
    padding: 20,
    borderRadius: 24,
    // More shadow for floating feel
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  dragHandle: {
    width: 32,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  passengerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  passengerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: "#F5F5F5",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  passengerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 2,
  },
  passengerRole: {
    fontSize: 14,
    color: "#757575",
  },
  contactActions: {
    flexDirection: "row",
  },
  contactButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF9F6", // Light beige/gray bg
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#9E9E9E",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  locationAddress: {
    fontSize: 15,
    fontWeight: "500",
    color: "#212121",
  },
  mainButton: {
    backgroundColor: Design.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Design.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  completeButton: {
    backgroundColor: Design.danger, // Red for ending trip
    shadowColor: Design.danger,
  },
  mainButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
