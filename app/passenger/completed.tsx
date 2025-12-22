import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

export default function Completed() {
  return (
    <View style={styles.container}>
      <Card>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Ride Summary</Text>
        <Text style={{ marginTop: 8 }}>Distance: 6.8 km</Text>
        <Text>Time: 18 mins</Text>
        <Text style={{ marginTop: 8, fontWeight: '700' }}>Total: 150 ETB (Cash)</Text>
        <Text style={{ marginTop: 12, fontWeight: '700' }}>Rate Driver</Text>
        <View style={{ height: 8 }} />
        <TextInput placeholder="Leave a short feedback" style={{ backgroundColor: '#F5F6F8', padding: 10, borderRadius: 8 }} />
        <View style={{ height: 10 }} />
        <Button title="Done" />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 18, backgroundColor: '#fff' } });
