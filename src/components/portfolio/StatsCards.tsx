import React from 'react';
import {Book, Star, Users} from 'lucide-react';
import type {GitHubProfile, GitHubRepository} from '@/types';
import {StatCard} from '@/components/ui';

interface StatsCardsProps {
    profile: GitHubProfile | null;
    totalStars: number;
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

    return (<div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (<StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            darkMode={darkMode}
        />))}
    </div>);
};
