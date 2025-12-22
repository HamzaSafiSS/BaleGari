import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Design, Fonts } from '../../constants/theme';

const MAP_STYLE = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];

export default function PassengerHome() {
  const router = useRouter();

  // Addis Ababa coordinates
  const initialRegion = {
    latitude: 9.005401,
    longitude: 38.763611,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      {/* Real Map Component */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        customMapStyle={MAP_STYLE}
        showsUserLocation={true}
        showsMyLocationButton={false} // We have a custom button
        showsCompass={false}
      >
        {/* Example fake user car/marker if UserLocation is off or for branding */}
        {/* <Marker coordinate={initialRegion}>
               <View style={styles.userLocationDot}>
                  <MaterialIcons name="navigation" size={20} color="#fff" style={{ transform: [{ rotate: '45deg' }] }} />
               </View>
          </Marker> */}
      </MapView>

      {/* Top Overlay Controls */}
      <SafeAreaView style={styles.topOverlay} pointerEvents="box-none">
        {/* Drivers Badge - Keep simulation of 'drivers nearby' */}
        <View style={styles.driversBadgeWrapper}>
          <View style={styles.driversBadge}>
            <View style={styles.onlineIndicator} />
            <Text style={styles.driversBadgeText}>3 drivers nearby</Text>
          </View>
        </View>

        <View style={styles.headerRow}>
          {/* Menu Button */}
          <TouchableOpacity style={styles.circleButton} activeOpacity={0.8}>
            <MaterialIcons name="menu" size={24} color="#111" />
          </TouchableOpacity>

          {/* GPS Center Button (Right) */}
          <TouchableOpacity style={styles.circleButton} activeOpacity={0.8}>
            <MaterialIcons name="near-me" size={24} color={Design.primary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Bottom Sheet Card */}
      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />

        <TouchableOpacity
          style={styles.searchContainer}
          activeOpacity={0.9}
          onPress={() => router.push('/passenger/destination' as any)}
        >
          <MaterialIcons name="search" size={24} color="#666" style={{ marginRight: 12 }} />
          <Text style={styles.searchPlaceholder}>Where are you going?</Text>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="location-on" size={20} color={Design.primary} />
            <Text style={styles.actionButtonText}>Set on Map</Text>
          </TouchableOpacity>

          <View style={{ width: 12 }} />

          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="my-location" size={20} color={Design.primary} />
            <Text style={styles.actionButtonText}>Use GPS</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Places Section */}
        <Text style={styles.sectionHeader}>Recent Places</Text>

        <View style={styles.recentItem}>
          <View style={styles.recentIconBox}>
            <MaterialIcons name="location-pin" size={24} color="#666" />
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.recentTitle}>Bole International Airport</Text>
            <Text style={styles.recentSubtitle}>Bole, Addis Ababa</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#CCC" />
        </View>

        <View style={styles.separator} />

        <View style={styles.recentItem}>
          <View style={styles.recentIconBox}>
            <MaterialIcons name="location-pin" size={24} color="#666" />
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.recentTitle}>Meskel Square</Text>
            <Text style={styles.recentSubtitle}>Kirkos, Addis Ababa</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#CCC" />
        </View>

      </View>
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

  // Custom Marker Styling (if we enable custom markers)
  userLocationDot: {
    width: 36, height: 36,
    borderRadius: 18,
    backgroundColor: Design.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  // Top Overlay
  topOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
  },
  driversBadgeWrapper: {
    alignItems: 'center',
    marginTop: 60, // Position info badge vertically
    marginBottom: -40, // Pull header buttons up relative to this if needed, or adjust z-index
    zIndex: 1,
  },
  driversBadge: {
    backgroundColor: '#D1E7DD', // Light green pill
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  onlineIndicator: {
    width: 8, height: 8,
    borderRadius: 4,
    backgroundColor: Design.primary,
    marginRight: 6,
  },
  driversBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#064E3B',
  },

  headerRow: {
    position: 'absolute', // Float buttons independently of the centered badge
    top: 12, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  circleButton: {
    width: 48, height: 48,
    borderRadius: 12, // Squircle
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  // Bottom Sheet
  bottomSheet: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  dragHandle: {
    width: 40, height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E6E9', // Design.border
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#666',
    fontFamily: Fonts?.sans as string,
  },
  actionsRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7', // Neutral light like in screenshot
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  recentIconBox: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 2,
  },
  recentSubtitle: {
    fontSize: 13,
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 4,
    marginLeft: 52, // Indent past icon
  },
});
