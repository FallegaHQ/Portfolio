import type {GitHubRepository, LanguageStats, ProcessTextOptions} from '@/types';

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
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
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
    if(num >= 1000000){
        return `${(num / 1000000).toFixed(1)}M`;
    }
    if(num >= 1000){
        return `${(num / 1000).toFixed(1)}K`;
    }
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

export const sortReposByStars = (repos: GitHubRepository[]): GitHubRepository[] => {
    return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
};

export const sortReposByUpdated = (repos: GitHubRepository[]): GitHubRepository[] => {
    return [...repos].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
};

export const filterReposByLanguage = (repos: GitHubRepository[], language: string): GitHubRepository[] => {
    return repos.filter(repo => repo.language === language);
};

export const getReposByLanguage = (repos: GitHubRepository[], language: string, limit?: number): GitHubRepository[] => {
    const filtered = filterReposByLanguage(repos, language);
    const sorted   = sortReposByStars(filtered);
    return limit ? sorted.slice(0, limit) : sorted;
};

export const processText = (text: string, options: ProcessTextOptions = {}): string => {
    const {
              maxLength     = 20,
              convertDashes = true
          } = options;

    if(!text){
        return '';
    }

    let processedText = convertDashes ? text.replace(/-|_/g, ' ') : text;

    if(processedText.length > maxLength){
        processedText = processedText.substring(0, maxLength) + '...';
    }

    return processedText;
};
