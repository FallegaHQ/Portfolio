import {useCallback, useEffect, useState} from 'react';
import type {GitHubProfile} from '../types/GitHubProfile';
import type {GitHubRepository} from '../types/GitHubRepository';
import type {LanguageStats} from '../types/LanguageStats';
import {cacheService, githubApi} from '../services';

export const useGitHubData = (username: string) => {
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

            // Process languages
            const langMap: LanguageStats = {};
            for(const repo of reposData){
                if(repo.language){
                    langMap[repo.language] = (langMap[repo.language] || 0) + 1;
                }
            }
            setLanguages(langMap);

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

    return {
        profile,
        repos,
        languages,
        selectedLanguage,
        setSelectedLanguage,
        showAllRepos,
        setShowAllRepos,
        loading,
        cachedAvatarUrl,
        refetch: fetchGitHubData
    };
};
