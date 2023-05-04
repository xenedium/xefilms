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
import { DeviceInfo } from './lib/DeviceInfo';
import { MovieDetails } from './Screens/MovieDetails';

export default function App() {

    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then((({ data: { session } }) => {
            setSession(session);
        }))
        // Send device info to supabase for analytics
        DeviceInfo.sendDeviceInfo();

        // Will automatically update the session
        // If the user logs in or logs out the state will be updated
        // and the app will automatically navigate to the correct available screens depending on the session 
        // This will reduce the hassle of having to check if the user is logged in every screen
        // And also isolate the screens that require authentication from the ones that don't to avoid any routing issues
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
        <TamaguiProvider config={config}>
            <NavigationContainer>
                <StatusBar style="light" />
                <Stack.Navigator
                    initialRouteName={session && session.user ? 'Home' : 'Login'}
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {
                        // Screens that don't require authentication
                        !session && (
                            <>
                                <Stack.Screen name="Login" component={Login} />
                                <Stack.Screen name="Register" component={Register} />
                            </>
                        )
                    }
                    {
                        // Screens that require authentication
                        session && session.user && (
                            <>
                                <Stack.Screen name="Home" component={Home} />
                                <Stack.Screen name="MovieDetails" component={MovieDetails} />
                            </>
                        )
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </TamaguiProvider>
    )
}