import {useEffect, useState} from 'react';

export const useTheme = () => {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        // Initialize from localStorage or system preference
        if(typeof window !== 'undefined'){
            const saved = localStorage.getItem('github-portfolio-theme');
            if(saved){
                return saved === 'dark';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        localStorage.setItem('github-portfolio-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(prev => !prev);
    };

    return {
        darkMode,
        toggleTheme,
        setDarkMode
    };
};
