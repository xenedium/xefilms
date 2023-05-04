import AsyncStorage from "@react-native-async-storage/async-storage"

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

    const addToFavorites = async (movieId: number) => {
        const favorites = await get("favorites")
        if (favorites) {
            if (favorites.includes(movieId)) return
            const newFavorites = [...favorites, movieId]
            await set("favorites", newFavorites)
        }
        else {
            await set("favorites", [movieId])
        }
    };

    const removeFromFavorites = async (movieId: number) => {
        const favorites = await get("favorites")
        if (favorites) {
            const newFavorites = favorites.filter((id: number) => id !== movieId)
            await set("favorites", newFavorites)
        }
    }

    const isFavorite = async (movieId: number) => {
        const favorites = await get("favorites")
        if (favorites) {
            return favorites.includes(movieId)
        }
        return false
    }

    return { addToFavorites, removeFromFavorites, isFavorite }
}