import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Design, Fonts } from '../../constants/theme';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary', style, textStyle, disabled }) => {
  const bgColor = variant === 'primary' ? Design.primary : variant === 'secondary' ? Design.neutralLight : 'transparent';
  const color = variant === 'primary' ? '#fff' : '#111';
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, { backgroundColor: bgColor }, style, disabled && styles.disabled]}
    >
      <Text style={[styles.text, { color }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: Design.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts?.sans as string,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});
