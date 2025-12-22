import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Fonts } from '../../constants/theme';

export default function PhoneLogin() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'passenger';
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Enter your phone number</Text>
          <Text style={styles.subtitle}>We'll send you a verification code</Text>

          {/* Input Section */}
          <View style={styles.inputRow}>
            {/* Country Code Selector */}
            <TouchableOpacity style={styles.countrySelector}>
              <Text style={styles.flag}>🇪🇹</Text>
              <Text style={styles.countryCode}>+251</Text>
              <MaterialIcons name="keyboard-arrow-down" size={20} color="#666" />
            </TouchableOpacity>

            {/* Phone Number Input */}
            <View style={styles.phoneInputContainer}>
              <MaterialIcons name="phone" size={20} color="#999" style={styles.phoneIcon} />
              <TextInput
                style={styles.phoneInput}
                placeholder="912 345 678"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={10}
              />
            </View>
          </View>

          <Text style={styles.disclaimer}>
            Standard SMS rates may apply. Carrier fees may vary.
          </Text>
        </View>

        {/* Footer Action */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.continueButton, !phone && styles.disabledButton]}
            onPress={() => router.push((`/auth/otp?role=${role}&phone=${phone}` as any))}
            disabled={!phone}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Send Verification Code</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 16,
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
    fontFamily: Fonts?.sans as string,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 40,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginRight: 12,
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginRight: 4,
  },
  phoneInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  phoneIcon: {
    marginRight: 12,
  },
  phoneInput: {
    flex: 1,
    fontSize: 17,
    color: '#111',
    fontWeight: '500',
    padding: 0, // Reset default padding
  },
  disclaimer: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  footer: {
    paddingVertical: 24,
  },
  continueButton: {
    backgroundColor: '#86C19F', // Matching the lighter green from screenshot
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#86C19F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
