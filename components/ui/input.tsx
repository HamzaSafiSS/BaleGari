import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Design, Fonts } from '../../constants/theme';

type Props = TextInputProps & {
  label?: string;
  placeholder?: string;
};

export const Input: React.FC<Props> = ({ label, placeholder, ...rest }) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput placeholder={placeholder} placeholderTextColor="#9AA2A9" style={styles.input} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: '#333',
    marginBottom: 6,
    fontSize: 13,
    fontFamily: Fonts?.sans as string,
  },
  input: {
    backgroundColor: Design.neutralLight,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: Design.radius.md,
    borderWidth: 1,
    borderColor: Design.border,
    fontSize: 15,
  },
});
