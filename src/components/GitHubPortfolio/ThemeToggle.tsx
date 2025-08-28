import React from 'react';
import {Moon, Sun} from 'lucide-react';

interface ThemeToggleProps {
    darkMode: boolean;
    onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
                                                            darkMode,
                                                            onToggle
                                                        }) => {
    return (<button
            onClick={onToggle}
            className={`fixed top-6 right-6 z-40 p-3 rounded-full backdrop-blur-xl border transition-all duration-300 ${darkMode ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-black/10 border-black/20 text-gray-900 hover:bg-black/20'}`}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
            {darkMode ? <Sun size={20}/> : <Moon size={20}/>}
        </button>);
};
