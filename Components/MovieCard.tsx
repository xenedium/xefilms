import { Card, CardProps, H4, Text, Image, Paragraph, Unspaced, YStack, Stack } from "tamagui";
import { Movie } from "../types";
import { ArrowUp } from "@tamagui/lucide-icons";

export const MovieCard = (props: CardProps & { movie: Movie } & { onPress: any }) => {
    return (
        <Card
            elevate
            size="$4"
            bordered
            {...props}
            onPress={props.onPress}
            style={{

            }}
        >
            <Card.Header padded>
                <H4>{props.movie.title}</H4>
                <Paragraph theme="alt2">Popularity: {Math.ceil(props.movie.popularity)} <ArrowUp /></Paragraph>
            </Card.Header>


            <Stack f={1} ai="center" jc="center">
                <Paragraph theme="alt1" marginHorizontal={15}>{props.movie.overview.substring(0, 140)}...{' '}
                    <Text color="white" textDecorationLine="underline">Read more</Text>
                </Paragraph>

            </Stack>
            <Card.Footer padded>
                <YStack ai="center" jc="space-between">
                    <Text color="white">Release Date: {props.movie.release_date}</Text>
                    <Text color="white">Vote Average: {props.movie.vote_average}</Text>
                </YStack>
            </Card.Footer>
            <Card.Background style={{
                position: 'absolute',
                top: 0,
                left: 0,
            }}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/original${props.movie.poster_path}`}}
                    style={{ width: '100%', height: '100%' }}
                    blurRadius={10}
                    opacity={0.3}
                />
            </Card.Background>
        </Card>
    );
};