import { useEffect, useState } from "react";
import { MovieDetails } from "../types";
import { supabase } from "../lib/SupabaseClient";

export const useMovie = (id: number) => {
    const [movie, setMovie] = useState<MovieDetails | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const getMovie = async (id: number) => {
        try {
            const { data: movieData, error: movieError } = await supabase.functions.invoke(`fetch-movie?id=${id}`)
            if (movieError) throw error;
            const { data: videoData, error: videoError } = await supabase.functions.invoke(`fetch-video?id=${id}`)
            if (videoError) throw error;
            const data = { ...movieData, videoKey: videoData.key }
            if (data) setMovie(data as MovieDetails)
        }
        catch (error) {
            setError(true)
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getMovie(id)
    }, [id]);

    return { movie, loading, error }
};