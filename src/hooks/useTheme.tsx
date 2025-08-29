import {useEffect, useState} from 'react';
import {THEME_CONFIG} from '@/utils';

export const useTheme = () => {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        if(typeof window === 'undefined'){
            return true;
        }

        const saved = localStorage.getItem(THEME_CONFIG.STORAGE_KEY);
        if(saved){
            return saved === THEME_CONFIG.DARK;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        if(typeof window === 'undefined'){
            return;
        }

        const theme = darkMode ? THEME_CONFIG.DARK : THEME_CONFIG.LIGHT;
        localStorage.setItem(THEME_CONFIG.STORAGE_KEY, theme);

        if(darkMode){
            document.documentElement.classList.add('dark');
        }
        else{
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(prev => !prev);
    };

    return {
        darkMode,
        toggleTheme
    };
};
