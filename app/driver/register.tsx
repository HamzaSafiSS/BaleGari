import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

export default function DriverRegister() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Card>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Driver Registration</Text>
        <Text style={{ marginTop: 8 }}>Step 1 of 3 — Personal info</Text>
        <View style={{ height: 12 }} />
        <Button title="Continue" onPress={() => router.push('/driver/home' as any)} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 18, backgroundColor: '#fff' } });
