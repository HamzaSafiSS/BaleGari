import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Card } from '../../components/ui/card';
import { MapPlaceholder } from '../../components/ui/map-placeholder';
import { NetworkBanner } from '../../components/ui/network-banner';
import { Design } from '../../constants/theme';
import { useNetworkStatus } from '../../hooks/use-network';

export default function DriverHome() {
  const [online, setOnline] = useState(true);
  const { online: netOnline } = useNetworkStatus();

  return (
    <View style={styles.container}>
      <NetworkBanner online={netOnline} />
      <MapPlaceholder label={online ? 'You are online' : 'You are offline'} />
      <Card style={styles.topCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: '700' }}>Status</Text>
          <Switch value={online} onValueChange={setOnline} trackColor={{ true: Design.primary }} />
        </View>
        <View style={{ height: 10 }} />
        <Text>Earnings today: <Text style={{ fontWeight: '700' }}>฿ 680</Text></Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#fff' }, topCard: { position: 'absolute', left: 16, right: 16, top: 24 } });
