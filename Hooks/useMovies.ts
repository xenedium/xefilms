import { useEffect, useState } from "react"
import { supabase } from "../lib/SupabaseClient"
import { Movie } from "../types"

export const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [page, setPage] = useState(1)

    const getMovies = async (page: number) => {
        try {
            setLoading(true)
            setError(false)
            const { data, error } = await supabase.functions.invoke(`fetch-movies?page=${page}`)
            if (error) throw error
            if (data) setMovies(data as Movie[])
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMovies(page)
    }, [page])


    return { movies, page, loading, error, setPage }
}