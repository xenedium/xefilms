import { Button, H2, Spinner, Stack, Theme, XStack, YStack } from "tamagui";
import { NavigationProps } from "../types";
import { useFavorites, useUserTheme } from "../Hooks";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { PartialMovieCard } from "../Components/PartialMovieCard";
import { ScrollView } from "react-native-gesture-handler";


type Props = NavigationProps<'Favorites'>;

export const Favorites = ({ navigation }: Props) => {

    const { theme } = useUserTheme();
    const { loading, favorites, refreshFavorites } = useFavorites();

    navigation.addListener('focus', () => refreshFavorites());

    return (
        <Theme name={theme}>
            <Stack f={1} bg="$background">
                <XStack mt="$10" jc="space-around">
                    <XStack space>
                        <Button onPress={() => navigation.goBack()} icon={ArrowLeft} />
                        <H2>Favorites</H2>
                    </XStack>
                    <Stack width="$10" />
                </XStack>

                <YStack f={1} jc="center" ai="center" bg="$background" mb={15}>
                    {
                        loading ? <Spinner size="large" /> :
                            favorites.length === 0 ? <H2>You have no favorites yet</H2> :
                                <ScrollView>
                                    {
                                        favorites.map((movie) => (
                                            <PartialMovieCard
                                                width={350}
                                                key={movie.id}
                                                movie={movie}
                                                marginVertical="$2"
                                                animation="bouncy"
                                                pressStyle={{ scale: 0.95 }}
                                                onPress={() => navigation.navigate('MovieDetails', { id: movie.id })}
                                            />
                                        ))
                                    }
                                </ScrollView>
                    }
                </YStack>
            </Stack>
        </Theme>
    )
};