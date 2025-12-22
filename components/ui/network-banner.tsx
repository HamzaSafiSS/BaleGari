import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const NetworkBanner: React.FC<{ online: boolean }> = ({ online }) => {
  if (online) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No internet connection — some features may be limited</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFDCDC', padding: 8, alignItems: 'center' },
  text: { color: '#6B0000' },
});
