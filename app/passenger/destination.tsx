import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Design, Fonts } from '../../constants/theme';

export default function Destination() {
  const router = useRouter();

  const suggestions = [
    { id: '1', title: 'Bole International Airport', subtitle: 'Bole Sub City, Addis Ababa', dist: '8.5 km' },
    { id: '2', title: 'Meskel Square', subtitle: 'Kirkos Sub City, Addis Ababa', dist: '3.2 km' },
    { id: '3', title: 'Merkato Market', subtitle: 'Addis Ketema, Addis Ababa', dist: '5.8 km' },
    { id: '4', title: 'Sheraton Addis Hotel', subtitle: 'Taitu Street, Addis Ababa', dist: '4.1 km' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Set Destination</Text>
        </View>

        {/* Input Block */}
        <View style={styles.inputCard}>
          {/* Visual Connector */}
          <View style={styles.connectorColumn}>
            <View style={styles.dotGreen} />
            <View style={styles.line} />
            <MaterialIcons name="location-on" size={20} color={Design.danger} />
          </View>

          <View style={styles.inputsColumn}>
            {/* Current Location - Read Only */}
            <View style={styles.inputWrapper}>
              <MaterialIcons name="near-me" size={18} color={Design.primary} style={{ marginRight: 8 }} />
              <Text style={styles.inputTextReadOnly}>Current Location</Text>
            </View>

            <View style={styles.separator} />

            {/* Destination Input - Focused */}
            <View style={[styles.inputWrapper, styles.inputWrapperActive]}>
              <MaterialIcons name="search" size={20} color="#666" style={{ marginRight: 8 }} />
              <TextInput
                placeholder="Where to?"
                placeholderTextColor="#999"
                style={styles.textInput}
                autoFocus
              />
            </View>
          </View>
        </View>

        {/* Recent & Suggested List */}
        <Text style={styles.sectionHeader}>Recent & Suggested</Text>

        <ScrollView style={styles.listContainer} keyboardShouldPersistTaps="handled">
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.listItem}
              onPress={() => router.push('/passenger/finding' as any)}
              activeOpacity={0.7}
            >
              <View style={styles.iconBox}>
                <MaterialIcons name="location-on" size={24} color="#666" />
              </View>
              <View style={styles.textColumn}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.distText}>{item.dist}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    fontFamily: Fonts?.sans as string,
  },

  // Input Card
  inputCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff', // Or slightly off-white if desired
    // shadow could be added but screenshot looks clean flat/bordered
  },
  connectorColumn: {
    position: 'absolute',
    top: 28, left: 24, bottom: 28,
    alignItems: 'center',
    zIndex: 10,
    width: 20,
  },
  dotGreen: {
    width: 10, height: 10,
    borderRadius: 5,
    backgroundColor: Design.primary, // Green dot
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
    // dashed border style simulated by View is hard, solid is fine
  },

  inputsColumn: {
    marginLeft: 32, // Space for connector
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
  },
  inputWrapperActive: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: Design.primary, // Active green border
  },
  inputTextReadOnly: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#111',
    padding: 0,
  },
  separator: {
    height: 12,
  },

  // List
  sectionHeader: {
    marginLeft: 20,
    marginTop: 8,
    marginBottom: 12,
    fontSize: 14,
    color: '#888',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#fff',
    borderRadius: 12, // card style in screenshot? looks like cards.
    marginBottom: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  iconBox: {
    width: 44, height: 44,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textColumn: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  distText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
});
