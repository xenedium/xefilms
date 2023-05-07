import { Stack, Text } from "tamagui";
import { NavigationProps } from "../types";


type Props = NavigationProps<'Favorites'>;

export const Favorites = ({ navigation }: Props) => {
    return (
        <Stack>
            <Text>Favorites</Text>
        </Stack>
    )
};