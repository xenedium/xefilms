import { YStack, Spinner, Theme } from "tamagui";
import { useUserTheme } from "../Hooks";

export const Loading = () => {
    const { theme } = useUserTheme();
    return (
        <Theme name={theme}>
            <YStack f={1} bg="$background" jc="center" ai="center">
                <Spinner size="large" />
            </YStack>
        </Theme>
    )
};