import React, {useEffect, useRef} from 'react';
import {GitFork, Star, X} from 'lucide-react';
import type {GitHubRepository} from '@/types';

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
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);
    const restoreFocusRef = useRef<HTMLElement | null>(null);

    const languageRepos = repos
        .filter(repo => repo.language === language)
        .slice(0, 5);

    useEffect(() => {
                  restoreFocusRef.current = document.activeElement as HTMLElement | null;
                  closeButtonRef.current?.focus();

                  const handleKeyDown = (e: KeyboardEvent) => {
                      if(e.key === 'Escape') {
                          e.preventDefault();
                          onClose();
                      }
                  };

                  document.addEventListener('keydown', handleKeyDown);
                  return () => {
                      document.removeEventListener('keydown', handleKeyDown);
                      restoreFocusRef.current?.focus?.();
                  };
              },
              [onClose]);

    return (<div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        role="presentation"
        onMouseDown={(e) => {
            if(e.target === e.currentTarget) {
                onClose();
            }
        }}
    >
        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="language-dialog-title"
            className={`${darkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-xl rounded-2xl p-6 max-w-md w-full border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            tabIndex={-1}
        >
            <div className="flex justify-between items-center mb-4">
                <h3
                    id="language-dialog-title"
                    className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}
                >
                    {language} Projects
                </h3>
                <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    className={`p-2 rounded-full hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${darkMode ? 'focus-visible:ring-offset-gray-950' : 'focus-visible:ring-offset-white'}`}
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
