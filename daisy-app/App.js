import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

import { AppProvider } from './src/context/AppContext';
import { EntitlementProvider } from './src/context/EntitlementContext';
import Navigation from './src/navigation/Navigation';
import AuthScreen from './src/screens/AuthScreen';

// Clerk token cache using SecureStore
const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      return item;
    } catch (err) {
      await SecureStore.deleteItemAsync(key).catch(() => {});
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Fallback screen when Clerk key is missing
function MissingKeyScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.emoji}>🌼</Text>
      <Text style={styles.title}>Daisy</Text>
      <Text style={styles.subtitle}>Configuration loading...</Text>
      <ActivityIndicator size="large" color="#F4A460" style={{ marginTop: 20 }} />
    </View>
  );
}

export default function App() {
  if (!CLERK_PUBLISHABLE_KEY) {
    return (
      <SafeAreaProvider>
        <MissingKeyScreen />
      </SafeAreaProvider>
    );
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <SafeAreaProvider>
          <AppProvider>
            <EntitlementProvider>
              <StatusBar style="dark" />
              <SignedIn>
                <Navigation />
              </SignedIn>
              <SignedOut>
                <AuthScreen />
              </SignedOut>
            </EntitlementProvider>
          </AppProvider>
        </SafeAreaProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E7',
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 8,
  },
});
