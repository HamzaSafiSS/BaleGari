import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Design } from '../../constants/theme';

const MAP_STYLE = [
  { "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] }
];

export default function Assigned() {
  const router = useRouter();

  const driverLocation = {
    latitude: 9.000401,
    longitude: 38.763611,
  };

  const initialRegion = {
    latitude: 9.005401,
    longitude: 38.763611,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <View style={styles.container}>
      {/* Map Background */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        customMapStyle={MAP_STYLE}
      >
        <Marker coordinate={driverLocation}>
          <View style={styles.driverMarker}>
            <MaterialIcons name="navigation" size={24} color="#111" style={{ transform: [{ rotate: '45deg' }] }} />
          </View>
        </Marker>
      </MapView>

      <SafeAreaView style={styles.overlayContainer} pointerEvents="box-none">
        {/* Top ETA Card */}
        <View style={styles.etaCard}>
          <View style={styles.etaInfo}>
            <Text style={styles.etaLabel}>Driver arriving in</Text>
            <Text style={styles.etaTime}>4 min</Text>
          </View>
          <View style={styles.etaActions}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="share" size={20} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="security" size={20} color={Design.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Sheet Driver Info */}
        <View style={styles.bottomSheetWrapper}>
          <View style={styles.bottomSheet}>
            <View style={styles.dragHandle} />

            <View style={styles.driverRow}>
              {/* Avatar */}
              <View style={styles.avatarContainer}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>A</Text>
                </View>
                <View style={styles.carBadge}>
                  <MaterialIcons name="directions-car" size={12} color="#fff" />
                </View>
              </View>

              {/* Info */}
              <View style={styles.infoCol}>
                <Text style={styles.driverName}>Abebe Kebede</Text>
                <View style={styles.ratingRow}>
                  <MaterialIcons name="star" size={16} color="#FBC02D" />
                  <Text style={styles.ratingText}>4.8</Text>
                </View>
                <Text style={styles.carText}>Toyota Corolla - White</Text>
                <View style={styles.plateBadge}>
                  <Text style={styles.plateText}>3-AA-12345</Text>
                </View>
              </View>

              {/* Communications - Vertical Stack */}
              <View style={styles.commsCol}>
                <TouchableOpacity style={styles.commButton}>
                  <MaterialIcons name="call" size={22} color={Design.primary} />
                </TouchableOpacity>
                <View style={{ height: 12 }} />
                <TouchableOpacity style={styles.commButton}>
                  <MaterialIcons name="chat-bubble-outline" size={22} color={Design.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ height: 24 }} />

            {/* Status Bar */}
            <View style={styles.statusContainer}>
              <View style={styles.statusHeader}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Driver is on the way</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '40%' }]} />
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity style={styles.rejectButton} onPress={() => router.back()}>
                <Text style={styles.rejectButtonText}>Reject</Text>
              </TouchableOpacity>

              <View style={{ width: 16 }} />

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => router.push('/passenger/completed' as any)}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
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
  driverMarker: {
    width: 44, height: 44,
    borderRadius: 22,
    backgroundColor: '#FBC02D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  overlayContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  // ETA Card
  etaCard: {
    margin: 16,
    marginTop: 16, // Ensure space from top
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  etaInfo: {
    flex: 1,
  },
  etaLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  etaTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  etaActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 44, height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },

  // Bottom Sheet
  bottomSheetWrapper: {
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  dragHandle: {
    width: 40, height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align tops of cols
    marginBottom: 8,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatarCircle: {
    width: 56, height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Design.primary,
  },
  carBadge: {
    position: 'absolute',
    bottom: 0, right: 0,
    backgroundColor: Design.primary,
    width: 20, height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  infoCol: {
    flex: 1,
    paddingRight: 8,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#333',
    fontSize: 14,
  },
  carText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 6,
  },
  plateBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  plateText: {
    fontSize: 12,
    color: Design.primary,
    fontWeight: '600',
  },
  commsCol: {
    flexDirection: 'column',
    alignItems: 'center',
    // Removed height: '100%' which was causing layout issues
    justifyContent: 'flex-start',
    marginTop: 4,
  },
  commButton: {
    width: 44, height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Status
  statusContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 16,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusDot: {
    width: 10, height: 10,
    borderRadius: 5,
    backgroundColor: Design.primary,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Design.primary,
    borderRadius: 3,
  },

  // Actions
  actionButtonsRow: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 8, // Added bottom margin for safety
  },
  rejectButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  rejectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: Design.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
