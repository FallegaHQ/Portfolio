import React from 'react';
import {Code} from 'lucide-react';
import type {LanguageStats} from '@/types';
import {LanguageCard} from '@/components/ui';
import {getTopLanguages, GITHUB_CONFIG} from '@/utils';

interface LanguagesSectionProps {
    languages: LanguageStats;
    onLanguageSelect: (language: string) => void;
    darkMode: boolean;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
                                                                      languages,
                                                                      onLanguageSelect,
                                                                      darkMode
                                                                  }) => {
    const topLanguages = getTopLanguages(languages, GITHUB_CONFIG.TOP_LANGUAGES_LIMIT);

    return (<div className={`
            ${darkMode ? 'bg-white/5' : 'bg-white/50'} 
            backdrop-blur-xl rounded-2xl p-6 border 
            ${darkMode ? 'border-white/10' : 'border-white/30'} mb-12
        `}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Code className="text-purple-500"/>
            Most Used Languages
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topLanguages.map(([lang, count]) => (<LanguageCard
                key={lang}
                language={lang}
                count={count}
                onClick={() => onLanguageSelect(lang)}
                darkMode={darkMode}
            />))}
        </div>
    </div>);
};
