import React from 'react';
import {Trophy} from 'lucide-react';
import type {GitHubRepository} from '../../types/GitHubRepository';
import {ProjectCard} from '../ui';

interface ProjectsSectionProps {
    repos: GitHubRepository[];
    showAllRepos: boolean;
    onToggleView: (showAll: boolean) => void;
    darkMode: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
                                                                    repos,
                                                                    showAllRepos,
                                                                    onToggleView,
                                                                    darkMode
                                                                }) => {
    const featuredRepos = repos.filter(repo => !repo.fork && repo.stargazers_count > 0)
                               .slice(0, 6);
    const displayRepos  = showAllRepos ? repos : featuredRepos;

    return (<div className="mb-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <Trophy className="text-yellow-500"/>
                    Featured Projects
                </h2>
                <button
                    onClick={() => onToggleView(!showAllRepos)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-300"
                >
                    {showAllRepos ? 'Show Featured' : 'View All'}
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayRepos.map((repo) => (<ProjectCard key={repo.id} repo={repo} darkMode={darkMode}/>))}
            </div>
        </div>);
};
