import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Design } from '../../constants/theme';

export default function Completed() {
  const router = useRouter();
  const [rating, setRating] = useState(0);

  return (
    <View style={styles.container}>
      {/* Green Header */}
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View style={styles.checkCircle}>
              <MaterialIcons name="check" size={32} color={Design.primary} />
            </View>
            <Text style={styles.headerTitle}>Ride Completed!</Text>
            <Text style={styles.headerSubtitle}>Thanks for riding with BaleGari</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Trip Summary Card */}
        <View style={styles.card}>
          {/* Route */}
          <View style={styles.routeContainer}>
            {/* Pickup */}
            <View style={styles.stopRow}>
              <View style={styles.dotGreen} />
              <View style={styles.stopTextCol}>
                <Text style={styles.stopLabel}>Pickup</Text>
                <Text style={styles.stopAddress}>Bole Road, Addis Ababa</Text>
              </View>
            </View>

            {/* Connector */}
            <View style={styles.connectorLine} />

            {/* Destination */}
            <View style={styles.stopRow}>
              <View style={styles.dotRed} />
              <View style={styles.stopTextCol}>
                <Text style={styles.stopLabel}>Destination</Text>
                <Text style={styles.stopAddress}>Meskel Square</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <MaterialIcons name="timeline" size={16} color="#666" style={{ marginRight: 6 }} />
              <Text style={styles.statText}>5.2 km</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="schedule" size={16} color="#666" style={{ marginRight: 6 }} />
              <Text style={styles.statText}>18 min</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="attach-money" size={16} color={Design.primary} style={{ marginRight: 2 }} />
              <Text style={[styles.statText, { color: Design.primary, fontWeight: 'bold' }]}>180 ETB</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Payment Method */}
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Payment method</Text>
            <View style={styles.paymentValue}>
              <MaterialIcons name="money" size={16} color={Design.primary} style={{ marginRight: 6 }} />
              <Text style={styles.paymentText}>Cash</Text>
            </View>
          </View>
        </View>

        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingTitle}>How was your ride with Abebe Kebede?</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <MaterialIcons
                  name={star <= rating ? "star" : "star-border"}
                  size={40}
                  color={star <= rating ? "#FBC02D" : "#E0E0E0"}
                  style={{ marginHorizontal: 4 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Footer Button */}
      <SafeAreaView style={styles.footer}>
        <TouchableOpacity
          style={styles.rateButton}
          onPress={() => router.push('/passenger' as any)} // Return to home
        >
          <Text style={styles.rateButtonText}>Rate your driver</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: Design.primary,
    paddingBottom: 80, // Space for card overlap
    paddingTop: 20,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  checkCircle: {
    width: 64, height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },

  scrollContent: {
    paddingHorizontal: 16,
    marginTop: -60, // Overlap header
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 32,
  },

  // Route
  routeContainer: {
    marginBottom: 4,
  },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align visually clearly
  },
  dotGreen: {
    width: 10, height: 10,
    borderRadius: 5,
    backgroundColor: Design.primary,
    marginTop: 6,
    marginRight: 12,
  },
  dotRed: {
    width: 10, height: 10,
    borderRadius: 5, // Circle pin style for consistency with screenshot which uses simple dots/icons usually
    backgroundColor: Design.danger, // Or Design.secondary? Red usually. 
    borderWidth: 2,
    borderColor: '#fff', // Hollow effect or icon? Screenshot shows red pin icon. Let's stick to dot for simplicity or Icon if needed. Used dot in CSS.
    marginTop: 6,
    marginRight: 12,
  },
  connectorLine: {
    width: 1,
    height: 30, // Fixed height or flex?
    backgroundColor: '#E0E0E0',
    marginLeft: 4.5, // Center with 10px dot
    marginVertical: 2,
  },
  stopTextCol: {
    flex: 1,
  },
  stopLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  stopAddress: {
    fontSize: 15,
    color: '#111',
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  // Payment
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#888',
  },
  paymentValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 14,
    color: '#111',
    fontWeight: '600',
  },

  // Rating
  ratingSection: {
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 16,
    textAlign: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // Footer Button
  footer: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: '#F5F5F5', // Match bg
    padding: 16,
  },
  rateButton: {
    backgroundColor: Design.primary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  rateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
