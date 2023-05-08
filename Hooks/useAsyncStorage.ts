import AsyncStorage from "@react-native-async-storage/async-storage"
import { MovieDetails } from "../types"

export const useAsyncStorage = () => {
    const get = async (key: string) => {
        try {
            const item = await AsyncStorage.getItem(key)
            if (item) return JSON.parse(item)
        }
        catch (error) {
            console.log(error)
        }
    }

    const set = async (key: string, value: any) => {
        try {
            const item = JSON.stringify(value)
            await AsyncStorage.setItem(key, item)
        }
        catch (error) {
            console.log(error)
        }
    }

    const addToFavorites = async (partialMovie: Pick<MovieDetails, "id" | "title" | "backdrop_path">) => {
        const favorites = await get("favorites")
        if (favorites) {
            if (favorites.includes(partialMovie)) return;
            const newFavorites = [...favorites, partialMovie]
            await set("favorites", newFavorites)
        }
        else {
            await set("favorites", [partialMovie])
        }
    };

    const removeFromFavorites = async (partialMovie: Pick<MovieDetails, "id" | "title" | "backdrop_path">) => {
        const favorites = await get("favorites")
        if (favorites) {
            const newFavorites = favorites.filter((movie: Pick<MovieDetails, "id" | "title" | "backdrop_path">) => movie.id !== partialMovie.id)
            await set("favorites", newFavorites)
        }
    }

    const isFavorite = async (partialMovie: Pick<MovieDetails, "id" | "title" | "backdrop_path"> | number) => {
        const favorites = await get("favorites")
        if (favorites) {
            if (typeof partialMovie === "number") return favorites.some((movie: Pick<MovieDetails, "id" | "title" | "backdrop_path">) => movie.id === partialMovie)
            return favorites.includes(partialMovie)
        }
        return false
    }

    const getAllFavorites = async () => {
        const favorites = await get("favorites")
        if (!favorites) return [] as Pick<MovieDetails, "id" | "title" | "backdrop_path">[]
        return favorites as Pick<MovieDetails, "id" | "title" | "backdrop_path">[]
    };

    return { addToFavorites, removeFromFavorites, isFavorite, getAllFavorites }
}