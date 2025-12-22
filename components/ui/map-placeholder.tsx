import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Design } from '../../constants/theme';

export const MapPlaceholder: React.FC<{ style?: any; label?: string }> = ({ style, label = 'Map' }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{label} (Map Placeholder)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Design.neutralLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Design.radius.lg,
    marginVertical: Design.spacing.sm,
  },
  text: {
    color: '#555',
  },
});
