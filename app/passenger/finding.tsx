import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Design, Fonts } from '../../constants/theme';

const MAP_STYLE = [
  { "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] }
];

interface RideOption {
  id: string;
  name: string;
  nameLocal: string;
  price: number;
  currency: string;
  usdEstimate: string;
  time: string;
  icon: string;
}

export default function Finding() {
  const router = useRouter();
  const [selectedRide, setSelectedRide] = useState<string>('standard');

  const rideOptions: RideOption[] = [
    { id: 'economy', name: 'Economy', nameLocal: 'ቆጣቢ', price: 120, currency: 'ETB', usdEstimate: '~0.92 USD', time: '8 min', icon: 'directions-car' },
    { id: 'standard', name: 'Standard', nameLocal: 'መደበኛ', price: 180, currency: 'ETB', usdEstimate: '~1.38 USD', time: '5 min', icon: 'local-taxi' },
    { id: 'premium', name: 'Premium', nameLocal: 'ልዩ', price: 280, currency: 'ETB', usdEstimate: '~2.15 USD', time: '7 min', icon: 'stars' },
  ];

  const initialRegion = {
    latitude: 9.005401,
    longitude: 38.763611,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const origin = { latitude: 9.010401, longitude: 38.763611 };
  const destination = { latitude: 8.995401, longitude: 38.763611 };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        customMapStyle={MAP_STYLE}
        showsUserLocation={false}
      >
        <Marker coordinate={origin}>
          <View style={styles.dotMarker} />
        </Marker>
        <Marker coordinate={destination}>
          <MaterialIcons name="location-on" size={36} color={Design.danger} />
        </Marker>
      </MapView>

      <SafeAreaView style={styles.contentContainer} pointerEvents="box-none">
        {/* Top Header Card */}
        <View style={styles.headerCard}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>

          <View style={styles.tripInfo}>
            <View style={styles.connectorColumn}>
              <View style={styles.dotGreen} />
              <View style={styles.line} />
              <MaterialIcons name="location-on" size={16} color={Design.danger} />
            </View>
            <View style={styles.tripTextContainer}>
              <Text style={styles.tripText}>Current Location</Text>
              <View style={{ height: 16 }} />
              <Text style={styles.tripText}>Bole International Airport</Text>
            </View>
          </View>
        </View>

        {/* Bottom Sheet */}
        <View style={styles.bottomSheetWrapper}>
          <View style={styles.bottomSheet}>
            <View style={styles.dragHandle} />

            <ScrollView style={{ maxHeight: 400 }}>
              {rideOptions.map((option) => {
                const isSelected = selectedRide === option.id;
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[styles.rideCard, isSelected && styles.rideCardActive]}
                    onPress={() => setSelectedRide(option.id)}
                    activeOpacity={0.9}
                  >
                    <View style={styles.rideIconBox}>
                      <MaterialIcons name={option.icon as any} size={28} color="#666" />
                    </View>

                    <View style={styles.rideInfo}>
                      <View style={styles.rideTitleRow}>
                        <Text style={styles.rideName}>{option.name}</Text>
                        <Text style={styles.rideNameLocal}>{option.nameLocal}</Text>
                      </View>
                      <Text style={styles.rideTime}>{option.time}</Text>
                    </View>

                    <View style={styles.ridePriceCol}>
                      <Text style={styles.priceText}>{option.price} {option.currency}</Text>
                      <Text style={styles.usdText}>{option.usdEstimate}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Footer - Payment */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.paymentButton}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.cashIcon}>
                    <MaterialIcons name="attach-money" size={16} color="#064E3B" />
                  </View>
                  <Text style={styles.paymentText}>Cash</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => router.push('/passenger/assigned' as any)} // Proceed to next step
              >
                <Text style={styles.confirmButtonText}>Confirm {rideOptions.find(r => r.id === selectedRide)?.name}</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // Map Markers
  dotMarker: {
    width: 16, height: 16,
    borderRadius: 8,
    backgroundColor: Design.primary,
    borderWidth: 2,
    borderColor: '#fff',
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  // Header Card
  headerCard: {
    margin: 16,
    top: 0,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    width: 40, height: 40,
    backgroundColor: '#fff', // Or transparent if desired, typical interactive area
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 8,
  },
  tripInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', // Align top with back button visually? Actually better aligned with content
  },
  connectorColumn: {
    alignItems: 'center',
    marginRight: 12,
    height: 44, // Fixed height to match text spacing
    paddingTop: 4,
  },
  dotGreen: {
    width: 8, height: 8,
    borderRadius: 4,
    backgroundColor: Design.primary,
  },
  line: {
    width: 1,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
  },
  tripTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: 48, // Match connector height approx
  },
  tripText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },

  // Bottom Sheet
  bottomSheetWrapper: {
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    maxHeight: '60%', // Don't cover map completely
  },
  dragHandle: {
    width: 40, height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  rideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
  },
  rideCardActive: {
    backgroundColor: '#E8F5E9', // Light green bg
    borderColor: Design.primary,
    borderWidth: 2,
  },
  rideIconBox: {
    width: 48, height: 32, // Car shape approx
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rideInfo: {
    flex: 1,
  },
  rideTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  rideName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginRight: 8,
  },
  rideNameLocal: {
    fontSize: 14,
    color: '#888',
    fontFamily: Fonts?.sans, // Ensure it supports local chars
  },
  rideTime: {
    fontSize: 13,
    color: '#666',
  },
  ridePriceCol: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  usdText: {
    fontSize: 12,
    color: '#888',
  },

  // Footer
  footer: {
    marginTop: 12,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cashIcon: {
    width: 24, height: 24,
    borderRadius: 4,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  confirmButton: {
    backgroundColor: Design.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
