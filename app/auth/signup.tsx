import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Design, Fonts } from '../../constants/theme';
import { supabase } from '../../lib/supabase';

export default function Signup() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const role = (params.role as string) || 'passenger';

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!fullName || !email || !phone || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            // 1. Sign up with Supabase Auth (Simplified for troubleshooting)
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) {
                console.error('Signup Error:', authError);
                Alert.alert('Signup Error', `${authError.message} (Code: ${authError.status})`);
                setLoading(false);
                return;
            }

            const { user, session } = authData;
            console.log('Auth Signup Result:', { user: !!user, session: !!session });

            if (user) {
                // TRIGGER OTP EMAIL IMMEDIATELY:
                // This ensures the user gets their code right away without waiting for resend.
                console.log('Signup successful, triggering OTP email...');
                await supabase.auth.signInWithOtp({
                    email,
                    options: { shouldCreateUser: false }
                });

                // FORCE VERIFICATION FLOW:
                // If the user signed up and got a session (auto-login), we sign them out 
                // to ensure they must verify their email before they can actually use the app.
                if (session) {
                    console.log('Session detected, signing out for verification flow...');
                    await supabase.auth.signOut();
                }

                // Redirect to OTP screen unconditionally to handle the code from their email
                router.replace(`/auth/otp?email=${email}&role=${role}` as any);
                return;
            }
        } catch (err) {
            Alert.alert('Error', 'An unexpected error occurred');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <MaterialIcons name="arrow-back" size={24} color="#111" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Sign up to get started as a {role}</Text>

                        {/* Full Name */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Full Name</Text>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="person" size={20} color="#999" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChangeText={setFullName}
                                />
                            </View>
                        </View>

                        {/* Email */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="email" size={20} color="#999" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="name@example.com"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                        </View>

                        {/* Phone */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Phone Number</Text>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="phone" size={20} color="#999" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="+251 9..."
                                    keyboardType="phone-pad"
                                    value={phone}
                                    onChangeText={setPhone}
                                />
                            </View>
                        </View>

                        {/* Password */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="lock" size={20} color="#999" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="••••••••"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Footer Action */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.signupButton, loading && styles.disabledButton]}
                            onPress={handleSignup}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.signupButtonText}>Sign Up</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.loginLinkContainer}>
                            <Text style={styles.loginLinkText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.push(`/auth/login?role=${role}` as any)}>
                                <Text style={styles.loginLinkHighlight}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    header: {
        marginTop: 16,
        marginBottom: 24,
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
    },
    subtitle: {
        fontSize: 16,
        color: '#757575',
        marginBottom: 32,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#212121',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#111',
    },
    footer: {
        marginTop: 24,
    },
    signupButton: {
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
    },
    disabledButton: {
        backgroundColor: '#E0E0E0',
        shadowOpacity: 0,
        elevation: 0,
    },
    signupButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    loginLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginLinkText: {
        fontSize: 14,
        color: '#757575',
    },
    loginLinkHighlight: {
        fontSize: 14,
        color: Design.primary,
        fontWeight: 'bold',
    },
});
