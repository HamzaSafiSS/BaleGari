import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/ui/card';

export default function Earnings() {
  return (
    <View style={styles.container}>
      <Card>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Earnings today</Text>
        <Text style={{ marginTop: 8, fontSize: 22, fontWeight: '700' }}>฿ 680</Text>
        <View style={{ height: 12 }} />
        <Text>Ride history (mock)</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 18, backgroundColor: '#fff' } });
