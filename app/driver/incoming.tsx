import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

export default function Incoming() {
  return (
    <View style={styles.container}>
      <Card>
        <Text style={{ fontWeight: '700', fontSize: 18 }}>Incoming ride request</Text>
        <Text style={{ marginTop: 6 }}>Pickup: 0.8 km • Drop: 5.4 km</Text>
        <View style={{ height: 12 }} />
        <View style={{ flexDirection: 'row' }}>
          <Button title="Reject" variant="ghost" style={{ flex: 1, marginRight: 8 }} />
          <Button title="Accept" style={{ flex: 1 }} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 18, backgroundColor: '#fff' } });
