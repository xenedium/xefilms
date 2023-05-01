import 'react-native-gesture-handler';
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { TamaguiProvider } from 'tamagui'
import config from './tamagui.config'

import { Login, Register, Home } from './Screens'
import { RootStackParamList } from './types';

import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/SupabaseClient';

export default function App() {

    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then((({ data: { session } }) => {
            setSession(session);
        }))

        // Will automatically update the session
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

    }, []);

    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    })
    if (!loaded) return null;


    const Stack = createStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <TamaguiProvider config={config}>
                <StatusBar style="light" />
                <Stack.Navigator
                    initialRouteName={session ? 'Home' : 'Login'}
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </TamaguiProvider>
        </NavigationContainer>
    )
}