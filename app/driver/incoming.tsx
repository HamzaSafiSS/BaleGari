import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/ui/card';
import { MapPlaceholder } from '../../components/ui/map-placeholder';
import { Design, Fonts } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function Incoming() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (timeLeft === 0) return; // In real app, auto-decline or hide
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAccept = () => {
    router.push('/driver/ride' as any);
  };

  const handleDecline = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Map Background */}
      <View style={styles.mapContainer}>
        <MapPlaceholder />

        {/* Simulated Route Markers (Visual only for now) */}
        <View style={styles.markerContainer}>
          <View style={[styles.marker, { backgroundColor: Design.primary }]}>
            <MaterialIcons name="person-pin" size={32} color="#fff" />
          </View>
        </View>
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Top Countdown Pill */}
        <View style={styles.topBar}>
          <View style={styles.timerPill}>
            <Text style={styles.timerText}>
              <Text style={{ fontWeight: 'bold' }}>{timeLeft}s</Text> to respond
            </Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={handleDecline}>
            <MaterialIcons name="close" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Bottom Request Card */}
        <View style={styles.bottomContainer}>
          <Card style={styles.requestCard}>
            {/* Header: Passenger & Price */}
            <View style={styles.cardHeader}>
              <View style={styles.passengerRow}>
                <View style={styles.avatar}>
                  <MaterialIcons name="person" size={24} color={Design.primary} />
                </View>
                <View>
                  <Text style={styles.passengerName}>Tigist H.</Text>
                  <View style={styles.ratingRow}>
                    <MaterialIcons name="star" size={14} color="#FFC107" />
                    <Text style={styles.ratingText}>4.7</Text>
                  </View>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>180 ETB</Text>
                <Text style={styles.priceLabel}>Estimated fare</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Route Details */}
            <View style={styles.routeDetails}>
              {/* Pickup */}
              <View style={styles.routeItem}>
                <View style={styles.timelineContainer}>
                  <View style={[styles.dot, { backgroundColor: Design.primary }]} />
                  <View style={styles.line} />
                </View>
                <View style={styles.routeTextContainer}>
                  <Text style={styles.routeLabel}>PICKUP</Text>
                  <Text style={styles.routeAddress}>Bole Road, near Edna Mall</Text>
                  <Text style={styles.routeMeta}>3 min away</Text>
                </View>
              </View>

              {/* Dropoff */}
              <View style={styles.routeItem}>
                <View style={styles.timelineContainer}>
                  <View style={[styles.dot, { backgroundColor: Design.danger }]} />
                  {/* No line after dropoff */}
                </View>
                <View style={styles.routeTextContainer}>
                  <Text style={styles.routeLabel}>DROP-OFF</Text>
                  <Text style={styles.routeAddress}>Meskel Square</Text>
                  <Text style={styles.routeMeta}>2.1 km</Text>
                </View>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.declineButton]}
                onPress={handleDecline}
                activeOpacity={0.8}
              >
                <Text style={styles.declineText}>Decline</Text>
              </TouchableOpacity>

              <View style={{ width: 16 }} />

              <TouchableOpacity
                style={[styles.actionButton, styles.acceptButton]}
                onPress={handleAccept}
                activeOpacity={0.8}
              >
                <Text style={styles.acceptText}>Accept Ride</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the timer pill
    alignItems: 'flex-start',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  timerPill: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  timerText: {
    fontSize: 14,
    color: '#212121',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bottomContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  requestCard: {
    padding: 20,
    borderRadius: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: '#E8F5E9',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 2,
    fontFamily: Fonts?.sans,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Design.primary,
    marginBottom: 2,
  },
  priceLabel: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginBottom: 16,
  },
  routeDetails: {
    marginBottom: 24,
  },
  routeItem: {
    flexDirection: 'row',
    marginBottom: 0,
    minHeight: 60,
  },
  timelineContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 0,
    shadowColor: '#000',
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 4,
  },
  routeTextContainer: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#9E9E9E',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  routeAddress: {
    fontSize: 15,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 2,
  },
  routeMeta: {
    fontSize: 13,
    color: Design.primary,
  },
  actionRow: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButton: {
    backgroundColor: '#FFEBEE',
  },
  declineText: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: Design.primary,
    shadowColor: Design.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  acceptText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
