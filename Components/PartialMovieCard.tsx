import { Card, CardProps, H6, XStack, Avatar } from "tamagui";
import { MovieDetails } from "../types";

export const PartialMovieCard = (props: CardProps & { movie: Pick<MovieDetails, "id" | "title" | "backdrop_path"> } & { onPress: any }) => {
    return (
        <Card elevate size="$4" bordered {...props} onPress={props.onPress}>
            <Card.Header padded>
                <XStack>
                    <XStack ai="center" jc="center" space>
                        <Avatar circular size="$10">
                            <Avatar.Image source={{ uri: `https://image.tmdb.org/t/p/w500${props.movie.backdrop_path}` }} />
                        </Avatar>
                        <H6>{props.movie.title.length > 20 ? props.movie.title.slice(0, 20) + "..." : props.movie.title}</H6>
                    </XStack>
                </XStack>
            </Card.Header>
        </Card>
    );
};