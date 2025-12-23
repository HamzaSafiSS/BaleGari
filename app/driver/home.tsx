import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/ui/card';
import { MapPlaceholder } from '../../components/ui/map-placeholder';
import { Design, Fonts } from '../../constants/theme';

export default function DriverHome() {
  const [online, setOnline] = useState(false);
  const router = useRouter();

  const toggleOnline = () => {
    setOnline(!online);
    // In a real app, this would trigger location updates
  };

  return (
    <View style={styles.container}>
      {/* Map Background */}
      <View style={styles.mapContainer}>
        <MapPlaceholder />
        {/* Offline Overlay Tint */}
        {!online && <View style={styles.offlineOverlay} />}
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="menu" size={24} color="#212121" />
          </TouchableOpacity>
          
          <View style={styles.statusPill}>
            <View style={[styles.statusDot, { backgroundColor: online ? Design.primary : '#757575' }]} />
            <Text style={styles.statusText}>{online ? 'Online' : 'Offline'}</Text>
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="account-balance-wallet" size={24} color={Design.primary} />
          </TouchableOpacity>
        </View>

        {/* Dynamic Content */}
        {!online ? (
          /* Offline State - Bottom Sheet */
          <View style={styles.bottomContainer}>
            <Card style={styles.statsCard}>
                
              {/* Stats Row */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <MaterialIcons name="account-balance-wallet" size={24} color={Design.primary} style={{ marginBottom: 4 }} />
                  <Text style={styles.statValue}>1250</Text>
                  <Text style={styles.statLabel}>ETB Today</Text>
                </View>
                
                <View style={styles.divider} />

                <View style={styles.statItem}>
                  <MaterialIcons name="trending-up" size={24} color={Design.primary} style={{ marginBottom: 4 }} />
                  <Text style={styles.statValue}>8</Text>
                  <Text style={styles.statLabel}>Trips</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.statItem}>
                  <MaterialIcons name="star" size={24} color="#FFC107" style={{ marginBottom: 4 }} />
                  <Text style={styles.statValue}>4.9</Text>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>
              </View>

              <View style={{ height: 20 }} />

              {/* Go Online Button */}
              <TouchableOpacity style={styles.goOnlineButton} onPress={toggleOnline} activeOpacity={0.8}>
                <MaterialIcons name="power-settings-new" size={24} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.goOnlineText}>Go Online</Text>
              </TouchableOpacity>
            </Card>
          </View>
        ) : (
          /* Online State - Top Status Card */
          <View style={styles.topContainer}>
             {/* Simulate Incoming Request Button (For Demo) */}
             <TouchableOpacity 
                style={styles.demoButton} 
                onPress={() => router.push('/driver/incoming' as any)}
             >
                <Text style={{ color: '#fff', fontSize: 12 }}>Simulate Incoming</Text>
             </TouchableOpacity>
          </View>
        )}
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
  offlineOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16, // Adjust for status bar if needed
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
  },
  bottomContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  statsCard: {
    padding: 16,
    borderRadius: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  divider: {
    width: 0, 
    // width: 1,
    // height: '60%',
    // backgroundColor: '#EEEEEE',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginVertical: 4,
    fontFamily: Fonts?.sans,
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
  },
  goOnlineButton: {
    backgroundColor: Design.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: Design.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  goOnlineText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  demoButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
  }
});
