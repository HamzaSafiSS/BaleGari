import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/ui/card';
import { MapPlaceholder } from '../../components/ui/map-placeholder';

export default function DriverRide() {
  return (
    <View style={styles.container}>
      <MapPlaceholder label="Navigate to pickup" />
      <Card style={styles.floating}>
        <Text style={{ fontWeight: '700' }}>Pickup in 3 minutes</Text>
        <Text style={{ color: '#6B7280', marginTop: 8 }}>Passenger: Meseret • 0.8 km</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 }, floating: { position: 'absolute', left: 16, right: 16, bottom: 24 } });
