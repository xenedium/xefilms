import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import type { ThemeName } from "tamagui";

export const useUserTheme = (): { theme: ThemeName, setThemeAndStore: (theme: ThemeName) => boolean, getThemeAsync: () => Promise<ThemeName> } => {
    const [theme, setTheme] = useState<ThemeName>("dark_blue");
    useEffect(() => {
        AsyncStorage.getItem("theme").then((theme) => {
            if (theme) setTheme(theme as ThemeName);
        });
    }, [])

    const setThemeAndStore = (theme: ThemeName): boolean => {
        AsyncStorage.setItem("theme", theme);
        setTheme(theme);
        return true;
    }

    return { theme, setThemeAndStore, getThemeAsync: async () => AsyncStorage.getItem("theme") as unknown as ThemeName };
};