import { YStack, Form, Button, Spinner, Input, Theme, H3, Text, Spacer, Dialog, Adapt, Sheet } from "tamagui";
import { useEffect, useState } from "react";
import { useUserTheme } from "../Hooks";
import { Keyboard } from "react-native";
import { supabase } from "../lib/SupabaseClient";
import { NavigationProps } from "../types";


type Props = NavigationProps<"Register">;

export function Register({ navigation }: Props) {

    const [status, setStatus] = useState<'off' | 'submitting' | string>('off');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (status === 'submitting') {
            Keyboard.dismiss();
            supabase.auth.signUp({
                email: email,
                password: password
            })
                .then((res) => {
                    if (res.error) {
                        return setStatus(res.error.message);
                    }
                    // setStatus('off');
                    setOpen(true);
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
                    <Dialog open={open}>
                        <Adapt when="sm" platform="touch">
                            <Sheet zIndex={200000} modal dismissOnSnapToBottom>
                                <Sheet.Frame padding="$4" space>
                                    <Adapt.Contents />
                                </Sheet.Frame>
                                <Sheet.Overlay />
                            </Sheet>
                        </Adapt>
                        <Dialog.Portal>
                            <Dialog.Overlay
                                key="overlay"
                                animation="bouncy"
                                opacity={0.4}
                                enterStyle={{ opacity: 0 }}
                                exitStyle={{ opacity: 0 }}
                            />
                            <Dialog.Content
                                bordered
                                elevate
                                key="content"
                                animation={[
                                    'bouncy',
                                    {
                                        opacity: {
                                            overshootClamping: true,
                                        }
                                    }
                                ]}
                                enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                                exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                                x={0}
                                scale={1}
                                opacity={1}
                                y={0}
                            >
                                <Dialog.Title>Complete registration !</Dialog.Title>
                                <Spacer />
                                <Dialog.Description>
                                    An email has been sent to your email address. Please click on the link in the email to complete your registration.
                                </Dialog.Description>
                                <Spacer />
                                <Button onPress={() => {
                                    setOpen(false);
                                    navigation.navigate('Login')
                                }}>Go to Login</Button>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog>

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
                    <Text color="$color">Already have an account?{' '}
                        <Text
                            color="$color"
                            textDecorationLine="underline"
                            onPress={() => navigation.navigate('Login')}
                        >
                            Sign In
                        </Text>
                    </Text>
                    <Text color="red">{status !== 'off' && status !== 'submitting' && status}</Text>
                </Form>
            </YStack>
        </Theme>
    );
};