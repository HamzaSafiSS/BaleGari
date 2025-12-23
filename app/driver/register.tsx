/**
 * Driver Registration Screen
 *
 * Responsibilities:
 * - Collect driver information
 * - Upload ID and license documents
 *
 * Supabase (planned):
 * - Storage uploads
 * - Driver verification status
 */

import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Fonts } from "../../constants/theme";
import { supabase } from "../../lib/supabase";

export default function DriverRegister() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Economy");
  const [plateNumber, setPlateNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !phoneNumber || !plateNumber) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        Alert.alert("Error", "No authenticated user found.");
        return;
      }

      const userId = session.user.id;
      // Use email from session if available, or maybe user input if we wanted to allow override (but usually auth email is best)
      const userEmail = session.user.email;

      // Ensure user exists in public.users table to satisfy FK constraint
      const { error: userError } = await supabase.from("users").upsert({
        id: userId,
        email: userEmail,
        full_name: fullName,
        phone: phoneNumber,
        role: "driver",
      });

      if (userError) {
        console.error("Error creating user profile:", userError);
        Alert.alert(
          "Registration Failed",
          "Could not create user profile. " + userError.message
        );
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("drivers").insert({
        user_id: userId,
        vehicle_type: vehicleType,
        plate_number: plateNumber,
        is_verified: false,
        is_online: false,
      });

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation for plate_number usually
          Alert.alert(
            "Registration Failed",
            "This plate number is already registered."
          );
        } else {
          Alert.alert("Registration Failed", error.message);
        }
      } else {
        // Success
        router.replace("/driver/home");
      }
    } catch (err) {
      Alert.alert("Error", "An unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Driver Registration</Text>
            <Text style={styles.subtitle}>Complete your profile</Text>
          </View>

          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="person"
                  size={20}
                  color="#999"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor="#999"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>

            {/* Phone Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="phone"
                  size={20}
                  color="#999"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="+251 9..."
                  placeholderTextColor="#999"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Vehicle Type */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Vehicle Type</Text>
              <View style={styles.typeSelector}>
                {["Economy", "Comfort", "Van"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeOption,
                      vehicleType === type && styles.typeOptionSelected,
                    ]}
                    onPress={() => setVehicleType(type)}>
                    <Text
                      style={[
                        styles.typeText,
                        vehicleType === type && styles.typeTextSelected,
                      ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Plate Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Plate Number</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="directions-car"
                  size={20}
                  color="#999"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. A12345"
                  placeholderTextColor="#999"
                  value={plateNumber}
                  onChangeText={(text) => setPlateNumber(text.toUpperCase())}
                  autoCapitalize="characters"
                />
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.submitButton, loading && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>
                  Complete Registration
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 8,
    fontFamily: Fonts?.sans as string,
  },
  subtitle: {
    fontSize: 16,
    color: "#757575",
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },
  typeSelector: {
    flexDirection: "row",
    gap: 8,
  },
  typeOption: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  typeOptionSelected: {
    backgroundColor: "#212121",
    borderColor: "#212121",
  },
  typeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#757575",
  },
  typeTextSelected: {
    color: "#fff",
  },
  footer: {
    paddingVertical: 20,
  },
  submitButton: {
    backgroundColor: "#86C19F",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#86C19F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: "#E0E0E0",
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
