import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/ui/card';
import { MapPlaceholder } from '../../components/ui/map-placeholder';

export default function InProgress() {
  return (
    <View style={styles.container}>
      <MapPlaceholder label="Ride in progress" />
      <Card style={styles.floating}>
        <Text style={{ fontWeight: '700' }}>Remaining: 3.4 km • 7 mins</Text>
        <Text style={{ color: '#6B7280', marginTop: 8 }}>Route is displayed on the map</Text>
        <View style={{ height: 10 }} />
        <Text style={{ color: '#E53935', fontWeight: '700' }}>Emergency</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#fff' }, floating: { position: 'absolute', left: 16, right: 16, bottom: 24 } });
