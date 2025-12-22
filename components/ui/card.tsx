import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import { Design } from '../../constants/theme';

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const Card: React.FC<CardProps> = ({ children, style }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }).start();
  }, [opacity]);

  return <Animated.View style={[styles.card, style, { opacity }]}>{children}</Animated.View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: Design.radius.lg,
    padding: Design.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
});
