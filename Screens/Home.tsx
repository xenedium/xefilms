import { Button, Theme, YStack } from "tamagui";
import { NavigationProps } from "../types";
import { supabase } from "../lib/SupabaseClient";
import { useUserTheme } from "../Hooks/useUserTheme";


type Props = NavigationProps<'Home'>;

export function Home({ navigation }: Props) {
    const theme = useUserTheme();
    return (
        <Theme name={theme}>
            <YStack f={1} jc="center" ai="center" bg="$background">
                <Button onPress={() => supabase.auth.signOut()}>Logout</Button>
            </YStack>
        </Theme>
    );
}