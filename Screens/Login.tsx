import { YStack, Form, Button, Spinner, Input, Theme, H3, H6, Text } from "tamagui";
import { useEffect, useState } from "react";
import { useUserTheme } from "../Hooks";
import { Keyboard } from "react-native";
import { supabase } from "../lib/SupabaseClient";
import { NavigationProps } from "../types";

type Props = NavigationProps<"Login">;

export const Login = ({ navigation }: Props) =>  {

    const [status, setStatus] = useState<'off' | 'submitting' | string>('off');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        if (status === 'submitting') {
            Keyboard.dismiss();
            supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            .then(({ error }) => {
                if (error) {
                    return setStatus(error.message);
                }
                setStatus('off');
            })
        }
    }, [status])

    const { theme } = useUserTheme();

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
                    <H6>Sign in to continue</H6>
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
                            Login
                        </Button>
                    </Form.Trigger>
                    <Text color="$color">Don't have an account?{' '}
                        <Text
                            color="$color"
                            textDecorationLine="underline"
                            onPress={() => navigation.navigate('Register')}
                        >
                            Sign up
                        </Text>
                    </Text>
                    <Text color="red">{status !== 'off' && status !== 'submitting' && status}</Text>
                </Form>
            </YStack>
        </Theme>
    );
};