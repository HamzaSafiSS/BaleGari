import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Design, Fonts } from '../../constants/theme';

export default function VerifyEmail() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const email = (params.email as string) || 'your email';

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="mark-email-read" size={80} color={Design.primary} />
                </View>

                <Text style={styles.title}>Check your email</Text>
                <Text style={styles.subtitle}>
                    We've sent a verification link to{"\n"}
                    <Text style={styles.emailText}>{email}</Text>
                </Text>

                <Text style={styles.description}>
                    Please click the link in the email to verify your account. Once verified, you can return here to log in.
                </Text>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => router.replace('/auth/login' as any)}
                >
                    <Text style={styles.loginButtonText}>Back to Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.resendButton}
                    onPress={() => {
                        // Optional: Implement resend logic if needed
                    }}
                >
                    <Text style={styles.resendButtonText}>Didn't receive the email? Resend</Text>
                </TouchableOpacity>
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
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F0FDF4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#212121',
        marginBottom: 12,
        textAlign: 'center',
        fontFamily: Fonts?.sans as string,
    },
    subtitle: {
        fontSize: 16,
        color: '#757575',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
    },
    emailText: {
        fontWeight: 'bold',
        color: '#212121',
    },
    description: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    loginButton: {
        backgroundColor: Design.primary,
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        shadowColor: Design.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    resendButton: {
        paddingVertical: 10,
    },
    resendButtonText: {
        color: Design.primary,
        fontSize: 14,
        fontWeight: '600',
    },
});
