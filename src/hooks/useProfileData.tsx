import {useCallback, useEffect, useState} from 'react';
import type {ProfileData} from '@/types';
import {profileService} from '@/services/profileService';

export const useProfileData = () => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadProfileData = useCallback(async() => {
        try {
            setLoading(true);
            setError(null);
            const data = await profileService.loadProfileData();
            setProfileData(data);
        }
        catch(err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load profile data';
            setError(errorMessage);
            console.error('Error loading profile data:', err);
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProfileData();
    }, [loadProfileData]);

    return {
        profileData,
        loading,
        error,
        refetch: loadProfileData
    };
};
