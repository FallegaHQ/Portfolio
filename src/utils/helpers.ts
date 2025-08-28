import type {GitHubRepository} from '../types/GitHubRepository';
import type {LanguageStats} from '../types/LanguageStats';

export const calculateLanguageStats = (repos: GitHubRepository[]): LanguageStats => {
    const langMap: LanguageStats = {};

    for(const repo of repos){
        if(repo.language){
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
        }
    }

    return langMap;
};

export const getFeaturedRepos = (repos: GitHubRepository[], limit = 6): GitHubRepository[] => {
    return repos
        .filter(repo => !repo.fork && repo.stargazers_count > 0)
        .slice(0, limit);
};

export const getTotalStars = (repos: GitHubRepository[]): number => {
    return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
};

export const getTopLanguages = (languages: LanguageStats, limit = 8): [string, number][] => {
    return Object.entries(languages)
                 .sort(([, a], [, b]) => b - a)
                 .slice(0, limit);
};

export const formatNumber = (num: number): string => {
    return num.toLocaleString();
};

export const getRelativeTime = (dateString: string): string => {
    const date       = new Date(dateString);
    const now        = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if(diffInDays === 0){
        return 'Today';
    }
    if(diffInDays === 1){
        return 'Yesterday';
    }
    if(diffInDays < 7){
        return `${diffInDays} days ago`;
    }
    if(diffInDays < 30){
        return `${Math.floor(diffInDays / 7)} weeks ago`;
    }
    if(diffInDays < 365){
        return `${Math.floor(diffInDays / 30)} months ago`;
    }

    return `${Math.floor(diffInDays / 365)} years ago`;
};

export const isValidUrl = (url: string): boolean => {
    try{
        new URL(url);
        return true;
    }
    catch{
        return false;
    }
};
