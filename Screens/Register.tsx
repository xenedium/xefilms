import { YStack, Form, Button, Spinner, Input, Theme, H3, H6, Text, Spacer } from "tamagui";
import { useEffect, useState } from "react";
import { useUserTheme } from "../Hooks/useUserTheme";
import { Keyboard } from "react-native";
import { supabase } from "../Config/SupabaseClient";
import { NavigationProps } from "../types";


type Props = NavigationProps<"Register">;

export function Register ({ navigation }: Props) {

    const [status, setStatus] = useState<'off' | 'submitting' | string>('off');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        if (status === 'submitting') {
            Keyboard.dismiss();
            supabase.auth.signUp({
                email: email,
                password: password
            })
            .then((res) => {
                console.log(res);
                if (res.error) {
                    return setStatus(res.error.message);
                }
                setStatus('off');
                // TODO: Navigate to home screen
            })
        }
    }, [status])

    const theme = useUserTheme();

    return (
        <Theme name={theme}>
            <YStack f={1} jc="center" ai="center" bg="$background">
                <Form
                    ai={'center'}
                    minWidth={300}
                    space
                    borderWidth={1}
                    borderRadius={"$4"}
                    padding={"$8"}
                    onSubmit={() => setStatus('submitting')}
                    bg="$backgroundStrong"
                >
                    <H3>Welcome to XeFilms 🎬 !</H3>
                    <Spacer />
                    <Input
                        placeholder="email"
                        width={"$20"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        onChangeText={setEmail}
                    />
                    <Input
                        placeholder="password"
                        width={"$20"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                        onChangeText={setPassword}
                    />
                    
                    <Form.Trigger asChild disabled={status === 'submitting'}>
                        <Button icon={status === 'submitting' ? () => <Spinner /> : undefined}>
                            Register
                        </Button>
                    </Form.Trigger>
                    <Text color="$color">Already have an account?
                        <Text
                            color="$color"
                            textDecorationLine="underline"
                            onPress={() => navigation.navigate('Login')}
                        >
                            Sign In
                        </Text>
                    </Text>
                    <Text color="$color">{status !== 'off' && status !== 'submitting' && status}</Text>
                </Form>
            </YStack>
        </Theme>
    );
};