import React from 'react';
import {Trophy} from 'lucide-react';
import type {GitHubRepository} from '@/types';
import {GithubProjectCard} from '@/components/ui';

interface ProjectsSectionProps {
    repos: GitHubRepository[];
    featuredRepos: GitHubRepository[];
    showAllRepos: boolean;
    onToggleView: (showAll: boolean) => void;
    darkMode: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
                                                                    repos,
                                                                    featuredRepos,
                                                                    showAllRepos,
                                                                    onToggleView,
                                                                    darkMode
                                                                }) => {
    const displayRepos = showAllRepos ? repos : featuredRepos;

    return (<div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <Trophy className="text-yellow-500"/>
                    {showAllRepos ? 'All Repositories' : 'Featured Projects'}
                </h2>
                <div className="flex gap-3">
                    <button
                        onClick={() => onToggleView(!showAllRepos)}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-300"
                    >
                        {showAllRepos ? 'Show Featured' : 'View All'}
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayRepos.map((repo) => (<GithubProjectCard key={repo.id} repo={repo} darkMode={darkMode}/>))}
            </div>

            {displayRepos.length ===
             0 &&
             (<div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                     <p>No repositories found</p>
                 </div>)}
        </div>);
};
