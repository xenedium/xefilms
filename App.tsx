import 'react-native-gesture-handler';
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { TamaguiProvider } from 'tamagui'
import config from './tamagui.config'

import { Login } from './Screens/Login'
import { Register } from './Screens/Register'
import { RootStackParamList } from './types';

export default function App() {

    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    })

    if (!loaded) {
        return null
    }

    const Stack = createStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <TamaguiProvider config={config}>
                <StatusBar style="light" />
                <Stack.Navigator
                    initialRouteName='Login'
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                </Stack.Navigator>
            </TamaguiProvider>
        </NavigationContainer>
    )
}
//6LV0jlWUtokeEwBa