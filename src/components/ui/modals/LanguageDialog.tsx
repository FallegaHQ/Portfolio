import React from 'react';
import {GitFork, Star, X} from 'lucide-react';
import type {GitHubRepository} from '../../../types/GitHubRepository';

interface LanguageDialogProps {
    language: string;
    repos: GitHubRepository[];
    onClose: () => void;
    darkMode: boolean;
}

export const LanguageDialog: React.FC<LanguageDialogProps> = ({
                                                                  language,
                                                                  repos,
                                                                  onClose,
                                                                  darkMode
                                                              }) => {
    const languageRepos = repos
        .filter(repo => repo.language === language)
        .slice(0, 5);

    return (<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div
            className={`${darkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-xl rounded-2xl p-6 max-w-md w-full border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {language} Projects
                </h3>
                <button
                    onClick={onClose}
                    className={`p-2 rounded-full hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                    aria-label="Close dialog"
                >
                    <X size={20}/>
                </button>
            </div>

            <div className="space-y-3">
                {languageRepos.map(repo => (<div
                    key={repo.id}
                    className={`p-3 rounded-lg border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                >
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {repo.name}
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {repo.description || 'No description available'}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Star size={12}/>
                    {repo.stargazers_count}
                </span>
                        <span
                            className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <GitFork size={12}/>
                            {repo.forks_count}
                </span>
                    </div>
                </div>))}
            </div>
        </div>
    </div>);
};
