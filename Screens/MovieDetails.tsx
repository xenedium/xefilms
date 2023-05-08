import { NavigationProps } from "../types";
import { useMovie, useAsyncStorage, useUserTheme } from "../Hooks";
import { XStack, Theme, YStack, Button, Image, Stack, H4, Spacer, Text, Spinner, XGroup, Separator, Sheet, Adapt } from "tamagui";
import { ArrowLeft, Star, Clock, Languages, Video, Heart } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { WebView } from "react-native-webview";


type Props = NavigationProps<'MovieDetails'>;

export function MovieDetails({ navigation, route }: Props) {

    const { movie, loading, error } = useMovie(route.params.id);
    const { theme } = useUserTheme();
    const [sheetOpen, setSheetOpen] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const { addToFavorites, isFavorite, removeFromFavorites, getAllFavorites } = useAsyncStorage();

    useEffect(() => {
        isFavorite(route.params.id).then((res: boolean | ((prevState: boolean) => boolean)) => {
            setIsFav(res);
        })
    }, [])

    const toggleFavorite = () => {
        if (movie === null) return;
        if (isFav) {
            removeFromFavorites({
                id: movie.id,
                title: movie.title,
                backdrop_path: movie.backdrop_path,
            }).then(() => {
                setIsFav(false);
            })
        } else {
            addToFavorites({
                id: movie.id,
                title: movie.title,
                backdrop_path: movie.backdrop_path,
            }).then(() => {
                setIsFav(true);
            })
        }
    }

    const toggleTrailer = () => {
        setSheetOpen(true);
    }

    return (
        <Theme name={theme}>
            <YStack f={1} bg="$background">
                {
                    loading ?
                        <YStack f={1} ai="center" jc="center">
                            <Spinner size="large" />
                        </YStack>
                        : error || movie === null ?
                            <Button onPress={() => { }}>Error</Button>
                            : <>
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/original${movie?.backdrop_path}` }}
                                    style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                                    blurRadius={10}
                                    opacity={0.2}
                                    zIndex={-1}
                                />
                                <XStack ml={20} mt={50} >
                                    <Button
                                        onPress={() => navigation.goBack()}
                                        icon={ArrowLeft}
                                    />
                                </XStack>

                                <Stack f={1} ai="center" jc="flex-start" mt={"$4"}>
                                    <Image
                                        source={{ uri: `https://image.tmdb.org/t/p/h632${movie?.poster_path}` }}
                                        style={{ width: 200, height: 300, borderRadius: 10 }}
                                    />
                                    <Spacer size={20} />
                                    <H4>{movie?.title}</H4>
                                    <Spacer size={20} />
                                    <Text color="white" fontSize={11}>
                                        {movie?.genres.map((genre, key) => genre.name + " . ")}
                                        {movie?.release_date}
                                    </Text>
                                    <Spacer size={20} />
                                    <XGroup size="$4">
                                        <XGroup.Item>
                                            <Button>
                                                <YStack ai="center">
                                                    <Text color="white" fontSize={11}>
                                                        Rating <Star size={12} />
                                                    </Text>
                                                    <Separator margin={5} borderColor={"grey"} width={"70%"} />
                                                    <Text color="white" fontSize={11}>
                                                        {movie?.vote_average}
                                                    </Text>
                                                </YStack>

                                            </Button>
                                        </XGroup.Item>
                                        <XGroup.Item>
                                            <Button>
                                                <YStack ai="center">
                                                    <Text color="white" fontSize={11}>
                                                        Length <Clock size={12} />
                                                    </Text>
                                                    <Separator margin={5} borderColor={"grey"} width={"70%"} />
                                                    <Text color="white" fontSize={11}>
                                                        {movie?.runtime} min
                                                    </Text>
                                                </YStack>
                                            </Button>
                                        </XGroup.Item>
                                        <XGroup.Item>
                                            <Button>
                                                <YStack ai="center">
                                                    <Text color="white" fontSize={11}>
                                                        Language <Languages size={12} />
                                                    </Text>
                                                    <Separator margin={5} borderColor={"grey"} width={"70%"} />
                                                    <Text color="white" fontSize={11} textTransform="uppercase">
                                                        {movie?.original_language}
                                                    </Text>
                                                </YStack>
                                            </Button>
                                        </XGroup.Item>
                                    </XGroup>
                                    <Spacer size={20} />
                                    <Adapt when="sm" platform="touch">
                                        <Sheet
                                            zIndex={200000}
                                            modal
                                            dismissOnSnapToBottom
                                            open={sheetOpen}
                                            onOpenChange={setSheetOpen}
                                            snapPoints={[85]}
                                        >
                                            <Sheet.Frame padding="$4" space>
                                                <WebView
                                                    source={{ uri: `https://www.youtube.com/embed/${movie.videoKey}` }}
                                                    style={{ width: '100%', height: 300 }}
                                                />
                                            </Sheet.Frame>
                                            <Sheet.Overlay backgroundColor={"white"} />
                                            <Sheet.Handle />
                                        </Sheet>
                                    </Adapt>
                                    <Text color="white" marginHorizontal={15}>{movie?.overview.substring(0, 900)}</Text>
                                    <Spacer size={20} />
                                    <XStack ai="center" jc="center">
                                        <Button onPress={() => toggleFavorite()} icon={Heart}>
                                            {isFav ? "Remove from Favorites" : "Add to favories"}
                                        </Button>
                                        <Spacer size={20} />
                                        <Button onPress={() => toggleTrailer()} icon={Video}>Watch Trailer</Button>
                                    </XStack>
                                </Stack>
                            </>
                }
            </YStack>
        </Theme>
    );
}