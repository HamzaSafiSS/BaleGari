import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

export const Icon: React.FC<{ name: React.ComponentProps<typeof MaterialIcons>['name']; size?: number; color?: string }> = ({ name, size = 20, color = '#111' }) => {
  return (
    <View>
      <MaterialIcons name={name} size={size} color={color} />
    </View>
  );
};
