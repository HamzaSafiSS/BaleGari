import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/ui/card';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.avatar} />
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontWeight: '700' }}>Meseret Bekele</Text>
            <Text style={{ color: '#6B7280' }}>+251 912 345 678</Text>
          </View>
        </View>
        <View style={{ height: 12 }} />
        <Text style={{ fontWeight: '700' }}>Ride history</Text>
        <View style={{ height: 8 }} />
        <Text>No recent rides (mock data)</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 18, backgroundColor: '#fff' }, avatar: { width: 64, height: 64, borderRadius: 12, backgroundColor: '#E6F6ED' } });
