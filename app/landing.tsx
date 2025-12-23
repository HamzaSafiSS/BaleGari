import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    ImageBackground,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Fonts } from '../constants/theme';

const { width, height } = Dimensions.get('window');

export default function Landing() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.replace('/welcome');
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/welcome-bg.png')}
                style={styles.background}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.overlay}>
                    {/* Header Section */}
                    <View style={styles.header}>
                        <Text style={styles.brand}>BaleGari</Text>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>We Value</Text>
                            <Text style={styles.title}>Your Time</Text>
                            <View style={styles.underline} />
                        </View>
                    </View>

                    {/* Spacer to push content to bottom */}
                    <View style={{ flex: 1 }} />

                    {/* Footer Section */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.8}
                            onPress={handleGetStarted}
                        >
                            <View style={styles.buttonContent}>
                                <Text style={styles.buttonIcon}>↗</Text>
                                <Text style={styles.buttonText}>Get Started</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F2F7', // Match the light blue in the image
    },
    background: {
        flex: 1,
        width: width,
        height: height,
    },
    overlay: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    header: {
        marginTop: Platform.OS === 'ios' ? 20 : 40,
    },
    brand: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0A2540',
        marginBottom: 40,
        fontFamily: Fonts?.sans as string,
        letterSpacing: -0.5,
        alignSelf: 'flex-end',
    },
    titleContainer: {
        marginTop: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: '900',
        color: '#0A2540',
        lineHeight: 52,
        fontFamily: Fonts?.sans as string,
    },
    underline: {
        width: 120,
        height: 4,
        backgroundColor: '#4CAF50',
        marginTop: 8,
    },
    footer: {
        marginBottom: 40,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
        alignSelf: 'flex-start',
        borderWidth: 2,
        borderColor: '#3D5AFE',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonIcon: {
        fontSize: 18,
        color: '#000',
        marginRight: 8,
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        fontFamily: Fonts?.sans as string,
    },
});
