import { IconSymbol } from '@/components/ui/icon-symbol';
import { signupUser } from '@/services/authServices';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthBackground from '@/components/AuthBackground';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const textColor = isDark ? '#FFF' : '#000';
  const subTextColor = isDark ? '#A1A1AA' : '#666';
  const inputBg = isDark ? 'rgba(31, 44, 52, 0.8)' : 'rgba(255, 255, 255, 0.8)';

  const handleSignup = async () => {
    if (!name || !phone || !password) {
      setError('Please fill in all signup fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signupUser(name, phone, password);
      router.replace('/');
    } catch (err) {
      setError('Signup failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { paddingTop: insets.top + 40 }]}>
          <Pressable 
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <IconSymbol name="chevron.left" size={28} color="#7C3AED" />
          </Pressable>
          <View style={styles.logoContainer}>
            <View style={styles.smallLogo}>
              <IconSymbol name="bubble.right.fill" size={40} color="#FFF" />
            </View>
          </View>
          <Text style={[styles.title, { color: textColor }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: subTextColor }]}>Join Wave today and connect with the world</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
              placeholder="John Doe"
              placeholderTextColor={subTextColor}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
              placeholder="+1 234 567 890"
              placeholderTextColor={subTextColor}
              value={phone}
              onChangeText={setPhone}
              autoCapitalize="none"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
              placeholder="Minimum 8 characters"
              placeholderTextColor={subTextColor}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Text style={styles.termsText}>
            By signing up, you agree to our <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable 
            style={({ pressed }) => [
              styles.signupBtn,
              { opacity: pressed || loading ? 0.7 : 1 }
            ]}
            onPress={handleSignup}
            disabled={loading}
          >
            <Text style={styles.signupBtnText}>{loading ? 'Creating account…' : 'Sign Up'}</Text>
          </Pressable>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: subTextColor }]}>Already have an account? </Text>
            <Pressable onPress={() => router.back()}>
              <Text style={styles.loginLink}>Log In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginLeft: -8,
    marginBottom: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  smallLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 32,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7C3AED',
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    height: 52,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.1)',
  },
  termsText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 18,
  },
  linkText: {
    color: '#7C3AED',
    fontWeight: '500',
  },
  signupBtn: {
    height: 56,
    backgroundColor: '#7C3AED',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  signupBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#DF2E38',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 15,
  },
  loginLink: {
    color: '#7C3AED',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

