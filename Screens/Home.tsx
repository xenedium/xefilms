import { Button, H2, Separator, Spinner, Stack, Theme, YStack } from "tamagui";
import { NavigationProps } from "../types";
import { supabase } from "../lib/SupabaseClient";
import { useUserTheme, useMovies } from "../Hooks";
import { MovieCard } from "../Components/MovieCard";
import { ScrollView } from "react-native-gesture-handler";


type Props = NavigationProps<'Home'>;

export function Home({ navigation }: Props) {
    const theme = useUserTheme();
    const { movies, page, loading, error, setPage } = useMovies();
    return (
        <Theme name={theme}>
            <Stack f={1} bg="$background">
                <Stack bg="$background">
                    <H2 ml={20} mt={50}>Popular movies</H2>
                    <Separator margin={5} borderColor={"grey"} width={"70%"} />
                </Stack>
                <YStack f={1} jc="center" ai="center" bg="$background" mb={15}>
                    {
                        loading ? <Spinner size="large" /> :
                            error ? <Button onPress={() => setPage(1)}>Retry</Button> :
                                <ScrollView>
                                    {
                                        movies.map((movie, index) =>
                                            <MovieCard
                                                scale={0.9}
                                                size="$4"
                                                height={400}
                                                width={350}
                                                key={index}
                                                movie={movie}
                                                animation="bouncy"
                                                pressStyle={{ scale: 0.95 }}
                                                onPress={() => {
                                                    navigation.navigate('MovieDetails', { id: movie.id });
                                                }}
                                            />
                                        )
                                    }
                                    <Button onPress={() => setPage(page + 1)}>Load more...</Button>
                                </ScrollView>
                    }
                </YStack>
            </Stack>
        </Theme>
    );
}