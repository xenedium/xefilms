import 'react-native-url-polyfill/auto';
import * as SecureStore from "expo-secure-store";
import { createClient } from '@supabase/supabase-js'


const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://vuyldkpqbocymafhtcnf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1eWxka3BxYm9jeW1hZmh0Y25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4MDQ2NDIsImV4cCI6MTk5ODM4MDY0Mn0.wXn1x4TuFDp1oBTobrwulO2yH78Q7hDvA_7B8BYaD4E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
