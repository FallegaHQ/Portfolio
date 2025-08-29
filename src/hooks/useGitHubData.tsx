import {useCallback, useEffect, useState} from 'react';
import type {GitHubProfile, GitHubRepository, LanguageStats} from '@/types';
import {cacheService, githubApi} from '@/services';
import {calculateLanguageStats, getFeaturedRepos, getTotalStars, GITHUB_CONFIG} from '@/utils';

export const useGitHubData = (username: string = GITHUB_CONFIG.USERNAME) => {
    const [profile, setProfile]                   = useState<GitHubProfile | null>(null);
    const [repos, setRepos]                       = useState<GitHubRepository[]>([]);
    const [languages, setLanguages]               = useState<LanguageStats>({});
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [showAllRepos, setShowAllRepos]         = useState<boolean>(false);
    const [loading, setLoading]                   = useState<boolean>(true);
    const [cachedAvatarUrl, setCachedAvatarUrl]   = useState<string | null>(null);

    const fetchGitHubData = useCallback(async () => {
        try{
            setLoading(true);

            // Check cached avatar first
            const cachedAvatar = cacheService.getCachedAvatar(username);
            if(cachedAvatar){
                setCachedAvatarUrl(cachedAvatar.url);
            }

            // Fetch profile and repositories
            const [profileData, reposData] = await Promise.all([
                                                                   githubApi.getProfile(username),
                                                                   githubApi.getRepositories(username)
                                                               ]);

            setProfile(profileData);
            setRepos(reposData);

            // Update avatar cache if different
            if(!cachedAvatar || cachedAvatar.url !== profileData.avatar_url){
                cacheService.setCachedAvatar(username, profileData.avatar_url);
                setCachedAvatarUrl(profileData.avatar_url);
            }

            const langStats = calculateLanguageStats(reposData);
            setLanguages(langStats);

        }
        catch(error){
            console.error('Error fetching GitHub data:', error);
        }
        finally{
            setLoading(false);
        }
    }, [username]);

    useEffect(() => {
        fetchGitHubData();
    }, []);

    const featuredRepos = getFeaturedRepos(repos, GITHUB_CONFIG.FEATURED_REPOS_LIMIT);
    const totalStars    = getTotalStars(repos);

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
        cachedAvatarUrl,
        totalStars,
        refetch: fetchGitHubData
    };
};
