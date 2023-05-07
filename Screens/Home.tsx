import { Button, H2, Separator, Spinner, Stack, Theme, YStack, XStack, Adapt, XGroup, H5, Select, Label } from "tamagui";
import { NavigationProps } from "../types";
import { supabase } from "../lib/SupabaseClient";
import { useUserTheme, useMovies } from "../Hooks";
import { MovieCard } from "../Components/MovieCard";
import { ScrollView } from "react-native-gesture-handler";
import { Settings, LogOut, Heart, Brush } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Sheet } from "tamagui";
import { ThemePicker } from "../Components/ThemePicker";


type Props = NavigationProps<'Home'>;

export function Home({ navigation }: Props) {
    const { theme, getThemeAsync } = useUserTheme();
    const { movies, page, loading, error, setPage } = useMovies();
    const [sheetOpen, setSheetOpen] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(theme);
    getThemeAsync().then((theme) => setSelectedTheme(theme));
    return (
        <Theme name={selectedTheme}>
            <Adapt when="sm" platform="touch">
                <Sheet
                    zIndex={200000}
                    modal
                    dismissOnSnapToBottom
                    open={sheetOpen}
                    onOpenChange={setSheetOpen}
                    snapPoints={[60]}
                >
                    <Sheet.Frame padding="$4" space>
                        <H2>Menu</H2>
                        <XStack jc="space-evenly">
                            <Button onPress={() => {
                                setSheetOpen(false);
                                navigation.navigate('Favorites');
                            }} icon={Heart}>Favorites</Button>
                            <Button onPress={() => supabase.auth.signOut()} icon={LogOut}>Logout</Button>
                        </XStack>
                        <Separator margin={5} borderColor={"grey"} />
                        <H5>Theme</H5>
                        <ThemePicker onThemeSelect={setSelectedTheme} />
                        <Separator margin={5} borderColor={"grey"} />
                        <Button onPress={() => setSheetOpen(false)}>Close</Button>
                    </Sheet.Frame>
                    <Sheet.Overlay />
                    <Sheet.Handle backgroundColor={"white"} />
                </Sheet>
            </Adapt>
            <Stack f={1} bg="$background">
                <XStack bg="$background" mt="$10" jc="space-around">
                    <Stack>
                        <H2>Popular movies</H2>
                        <Separator margin={5} borderColor={"grey"} width={"70%"} />
                    </Stack>
                    <Button icon={Settings} onPress={() => setSheetOpen(true)}>Menu</Button>
                </XStack>
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