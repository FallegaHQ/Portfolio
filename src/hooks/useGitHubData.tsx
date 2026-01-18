import {useCallback, useEffect, useState} from 'react';
import type {GitHubProfile, GitHubRepository, LanguageStats} from '@/types';
import {githubApi} from '@/services';
import {calculateLanguageStats, getFeaturedRepos, getTotalStars, GITHUB_CONFIG} from '@/utils';

export const useGitHubData = (username: string = GITHUB_CONFIG.USERNAME, enabled: boolean = true) => {
    const [profile, setProfile] = useState<GitHubProfile | null>(null);
    const [repos, setRepos] = useState<GitHubRepository[]>([]);
    const [languages, setLanguages] = useState<LanguageStats>({});
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [showAllRepos, setShowAllRepos] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchGitHubData = useCallback(async() => {
        try {
            setLoading(true);

            // Fetch profile and repositories
            const [profileData, reposData] = await Promise.all([
                                                                   githubApi.getProfile(username),
                                                                   githubApi.getRepositories(username)
                                                               ]);

            setProfile(profileData);
            setRepos(reposData);

            const langStats = calculateLanguageStats(reposData);
            setLanguages(langStats);

        }
        catch(error) {
            console.error('Error fetching GitHub data:', error);
        }
        finally {
            setLoading(false);
        }
    }, [username]);

    useEffect(() => {
        if(!enabled) {
            return;
        }

        fetchGitHubData();
    }, [enabled, fetchGitHubData]);

    const featuredRepos = getFeaturedRepos(repos, GITHUB_CONFIG.FEATURED_REPOS_LIMIT);
    const totalStars = getTotalStars(repos);

    return {
        profile,
        repos,
        featuredRepos,
        languages,
        selectedLanguage,
        setSelectedLanguage,
        showAllRepos,
        setShowAllRepos,
        loading,
        totalStars,
        refetch: fetchGitHubData
    };
};
