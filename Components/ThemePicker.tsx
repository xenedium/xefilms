import { RadioGroup, Spacer, Stack, Text, Theme, ThemeName, XStack, YStack } from "tamagui";
import { useUserTheme } from "../Hooks";

export const ThemePicker = ({ onThemeSelect }: { onThemeSelect: React.Dispatch<React.SetStateAction<ThemeName>> }) => {
    const { theme, setThemeAndStore } = useUserTheme();
    return (
        <RadioGroup defaultValue={theme} name="theme">
            <YStack space>
                <XStack space jc="space-evenly">
                    <RadioGroup.Item value="dark_green" onPress={() => setThemeAndStore('dark_green') && onThemeSelect('dark_green')}>
                        <Theme name="dark_green">
                            <Stack bg="$background" width={50} height={50} br={"$20"} />
                        </Theme>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="dark_red" onPress={() => setThemeAndStore('dark_red') && onThemeSelect('dark_red')}>
                        <Theme name="dark_red">
                            <Stack bg="$background" width={50} height={50} br={"$20"} />
                        </Theme>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="dark_yellow" onPress={() => setThemeAndStore('dark_yellow') && onThemeSelect('dark_yellow')}>
                        <Theme name="dark_yellow">
                            <Stack bg="$background" width={50} height={50} br={"$20"} />
                        </Theme>
                    </RadioGroup.Item>
                </XStack>
                <Spacer />
                <XStack space jc="space-evenly">
                    <RadioGroup.Item value="dark_orange" onPress={() => setThemeAndStore('dark_orange') && onThemeSelect('dark_orange')}>
                        <Theme name="dark_orange">
                            <Stack bg="$background" width={50} height={50} br={"$20"} />
                        </Theme>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="dark_blue" onPress={() => setThemeAndStore('dark_blue') && onThemeSelect('dark_blue')}>
                        <Theme name="dark_blue">
                            <Stack bg="$background" width={50} height={50} br={"$20"} />
                        </Theme>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="dark_purple" onPress={() => setThemeAndStore('dark_purple') && onThemeSelect('dark_purple')}>
                        <Theme name="dark_purple">
                            <Stack bg="$background" width={50} height={50} br={"$20"} />
                        </Theme>
                    </RadioGroup.Item>
                </XStack>
            </YStack>
        </RadioGroup>
    )
};