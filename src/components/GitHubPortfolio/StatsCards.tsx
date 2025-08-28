import React from 'react';
import {Book, Star, Users} from 'lucide-react';
import type {GitHubProfile} from '../../types/GitHubProfile';
import type {GitHubRepository} from '../../types/GitHubRepository';
import {StatCard} from '../ui';

interface StatsCardsProps {
    profile: GitHubProfile | null;
    repos: GitHubRepository[];
    darkMode: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
                                                          profile,
                                                          repos,
                                                          darkMode
                                                      }) => {
    const stats = [
        {
            icon : Book,
            label: 'Repositories',
            value: profile?.public_repos || 0
        },
        {
            icon : Users,
            label: 'Followers',
            value: profile?.followers || 0
        },
        {
            icon : Users,
            label: 'Following',
            value: profile?.following || 0
        },
        {
            icon : Star,
            label: 'Total Stars',
            value: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
        }
    ];

    return (<div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (<StatCard
                    key={index}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    darkMode={darkMode}
                />))}
        </div>);
};
