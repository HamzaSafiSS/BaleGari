import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Design } from '../../constants/theme';

const MAP_STYLE = [
    { "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
    { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] },
    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] }
];

export default function RideProgress() {
    const router = useRouter();

    useEffect(() => {
        // Simulate ride completion after 5 seconds
        const timer = setTimeout(() => {
            router.replace('/passenger/completed' as any);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const initialRegion = {
        latitude: 9.005401,
        longitude: 38.763611,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
    };

    const currentLocation = { latitude: 9.000401, longitude: 38.763611 };
    const destination = { latitude: 9.015401, longitude: 38.773611 };

    return (
        <View style={styles.container}>
            {/* Map Background */}
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={initialRegion}
                customMapStyle={MAP_STYLE}
            >
                <Marker coordinate={currentLocation}>
                    <View style={styles.driverMarker}>
                        <MaterialIcons name="navigation" size={24} color="#111" style={{ transform: [{ rotate: '45deg' }] }} />
                    </View>
                </Marker>
                <Marker coordinate={destination}>
                    <MaterialIcons name="location-on" size={36} color={Design.danger} />
                </Marker>
            </MapView>

            <SafeAreaView style={styles.overlayContainer} pointerEvents="box-none">
                {/* Top Green Header Card */}
                <View style={styles.headerCard}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.headerLabel}>Arriving at destination</Text>
                            <Text style={styles.headerValue}>4 min</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.headerLabelRight}>Distance</Text>
                            <Text style={styles.headerValue}>3.6 km</Text>
                        </View>
                    </View>

                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: '30%' }]} />
                    </View>
                </View>

                {/* Bottom Sheet Compact Driver Info */}
                <View style={styles.bottomCard}>
                    <View style={styles.dragHandle} />

                    <View style={styles.driverInfoRow}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarCircle}>
                                <Text style={styles.avatarText}>A</Text>
                            </View>
                            <View style={styles.carBadge}>
                                <MaterialIcons name="directions-car" size={12} color="#fff" />
                            </View>
                        </View>

                        <View style={styles.infoCol}>
                            <Text style={styles.driverName}>Abebe Kebede</Text>
                            <View style={styles.ratingRow}>
                                <MaterialIcons name="star" size={16} color="#FBC02D" />
                                <Text style={styles.ratingText}>4.8</Text>
                            </View>
                            <Text style={styles.carText}>Toyota Corolla - White</Text>
                            <Text style={styles.plateText}>3-AA-12345</Text>
                        </View>

                        <View style={styles.actionsCol}>
                            <TouchableOpacity style={styles.circleButton}>
                                <MaterialIcons name="call" size={20} color={Design.primary} />
                            </TouchableOpacity>
                            <View style={{ width: 12 }} />
                            <TouchableOpacity style={styles.circleButton}>
                                <MaterialIcons name="chat-bubble-outline" size={20} color={Design.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    driverMarker: {
        width: 44, height: 44,
        borderRadius: 22,
        backgroundColor: '#FBC02D',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },

    overlayContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },

    // Header Card
    headerCard: {
        backgroundColor: Design.primary,
        margin: 16,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    headerLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        marginBottom: 4,
    },
    headerLabelRight: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        marginBottom: 4,
        textAlign: 'right',
    },
    headerValue: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    progressBarBg: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 3,
        width: '100%',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 3,
    },

    // Bottom Sheet
    bottomCard: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        paddingBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    dragHandle: {
        width: 40, height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 16,
    },
    driverInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginRight: 16,
    },
    avatarCircle: {
        width: 50, height: 50,
        borderRadius: 25,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Design.primary,
    },
    carBadge: {
        position: 'absolute',
        bottom: -2, right: -2,
        backgroundColor: Design.primary,
        width: 18, height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#fff',
    },
    infoCol: {
        flex: 1,
    },
    driverName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 2,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    carText: {
        color: '#666',
        fontSize: 12,
        marginBottom: 2,
    },
    plateText: {
        fontSize: 12,
        color: Design.primary,
        fontWeight: '600',
    },
    actionsCol: {
        flexDirection: 'row',
    },
    circleButton: {
        width: 44, height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
