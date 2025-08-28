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
    return (<button
            onClick={onClick}
            className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50' : 'bg-gray-50 border-gray-200 hover:bg-white'}`}
        >
            <div className="font-semibold text-lg">{language}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {count} {count === 1 ? 'project' : 'projects'}
            </div>
        </button>);
};
