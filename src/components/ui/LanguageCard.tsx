import React from 'react';

interface LanguageCardProps {
    language: string;
    count: number;
    onClick: () => void;
    darkMode: boolean;
}

export const LanguageCard: React.FC<LanguageCardProps> = ({
                                                              language,
                                                              count,
                                                              onClick,
                                                              darkMode
                                                          }) => {
    const getLanguageColor = (lang: string): string => {
        const colors: Record<string, string> = {
            JavaScript: '#f7df1e',
            TypeScript: '#3178c6',
            Python    : '#3776ab',
            Java      : '#ed8b00',
            'C#'      : '#239120',
            PHP       : '#777bb4',
            Ruby      : '#cc342d',
            Go        : '#00add8',
            Rust      : '#000',
            Swift     : '#fa7343',
            Kotlin    : '#7f52ff',
            Dart      : '#0175c2',
            HTML      : '#e34f26',
            CSS       : '#1572b6',
            Shell     : '#89e051',
            Vue       : '#4fc08d',
            React     : '#61dafb',
        };
        return colors[lang] || '#6b7280';
    };

    return (<button
        onClick={onClick}
        aria-label={`Show ${language} projects`}
        className={`
                w-full p-4 rounded-xl border transition-all duration-300 
                hover:scale-105 group text-left
                focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${darkMode ? 'focus-visible:ring-offset-gray-950' : 'focus-visible:ring-offset-white'}
                ${darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/50 border-white/30 hover:bg-white/70'}
            `}
    >
        <div className="flex items-center justify-between mb-2">
            <div
                className="w-4 h-4 rounded-full border-2 border-white/50"
                style={{backgroundColor: getLanguageColor(language)}}
            />
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {count}
                </span>
        </div>
        <div className="font-medium group-hover:text-blue-500 transition-colors">
            {language}
        </div>
        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {count === 1 ? 'repository' : 'repositories'}
        </div>
    </button>);
};
