import { useState } from "react";
import { useAsyncStorage } from "./useAsyncStorage";
import { MovieDetails } from "../types";


export const useFavorites = () => {

    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([] as Pick<MovieDetails, "id" | "title" | "backdrop_path">[]);
    const { getAllFavorites } = useAsyncStorage();

    const refreshFavorites = async () => {
        setLoading(true)
        const favorites = await getAllFavorites();
        setFavorites(favorites)
        setLoading(false)
    }

    return { favorites, loading, refreshFavorites }
};