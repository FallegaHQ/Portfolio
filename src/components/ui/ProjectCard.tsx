import React from 'react';
import {ExternalLink, GitFork, GithubIcon, Star} from 'lucide-react';
import type {GitHubRepository} from '../../types/GitHubRepository';

interface ProjectCardProps {
    repo: GitHubRepository;
    darkMode: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
                                                            repo,
                                                            darkMode
                                                        }) => {
    return (<div
            className={`${darkMode ? 'bg-white/5' : 'bg-white/50'} backdrop-blur-xl rounded-2xl p-6 border ${darkMode ? 'border-white/10' : 'border-white/30'} hover:scale-105 transition-all duration-300 group`}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl truncate">{repo.name}</h3>
                <div className="flex gap-2">
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                    >
                        <GithubIcon size={16}/>
                    </a>
                    {repo.homepage && (<a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        >
                            <ExternalLink size={16}/>
                        </a>)}
                </div>
            </div>

            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 h-12 overflow-hidden`}>
                {repo.description || 'No description available'}
            </p>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                    {repo.language &&
                     (
                         <span
                             className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
              {repo.language}
            </span>)}
                    <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Star size={14}/>
                        {repo.stargazers_count}
          </span>
                    <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <GitFork size={14}/>
                        {repo.forks_count}
          </span>
                </div>
            </div>
        </div>);
};
