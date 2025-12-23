import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Design, Fonts } from '../constants/theme';
import { useLocalization } from '../hooks/use-localization';

export default function Welcome() {
  const router = useRouter();
  const [locale, setLocale] = React.useState<'en' | 'am' | 'om'>('en');
  const { t } = useLocalization(locale);

  return (
    <View style={styles.container}>
      {/* Brand Section */}
      <View style={styles.brandContainer}>
        <View style={styles.logoContainer}>
          <MaterialIcons name="directions-car" size={48} color="#fff" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>GO</Text>
          </View>
        </View>
        <Text style={styles.title}>BaleGari</Text>
        <Text style={styles.subtitle}>{t('slogan')}</Text>

        {/* Localization Toggles (Optional, keeping small access) */}
        <View style={styles.localeRow}>
          {['en', 'am', 'om'].map((l) => (
            <TouchableOpacity key={l} onPress={() => setLocale(l as any)} style={{ padding: 8 }}>
              <Text style={[styles.utilsText, locale === l && styles.activeLocale]}>{l.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Choose how you want to use BaleGari</Text>

      {/* Role Selection Cards */}
      <View style={styles.cardsContainer}>
        {/* Passenger Card */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => router.push('/auth/login?role=passenger' as any)}
        >
          <View style={[styles.iconBox, { backgroundColor: '#E0F2F1' }]}>
            <MaterialIcons name="person" size={28} color={Design.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{t('continue_passenger')}</Text>
            <Text style={styles.cardSubtitle}>Book rides instantly</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 16 }} />

        {/* Driver Card */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => router.push('/auth/login?role=driver' as any)}
        >
          <View style={[styles.iconBox, { backgroundColor: '#FFF8E1' }]}>
            <MaterialIcons name="drive-eta" size={28} color="#F57F17" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{t('continue_driver')}</Text>
            <Text style={styles.cardSubtitle}>Earn money driving</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: Design.primary,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    elevation: 8,
    shadowColor: Design.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  badge: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: '#FFC107',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
    fontFamily: Fonts?.sans as string,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 16,
  },
  localeRow: {
    flexDirection: 'row',
  },
  utilsText: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  activeLocale: {
    color: Design.primary,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#616161',
    textAlign: 'center',
    marginBottom: 24,
  },
  cardsContainer: {
    paddingHorizontal: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#757575',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9E9E9E',
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: Design.primary,
    fontWeight: '600',
  },
});
