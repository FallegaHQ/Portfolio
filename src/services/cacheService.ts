import type {CachedAvatar} from '@/types';

class CacheService {
    private readonly AVATAR_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    getCachedAvatar(username: string): CachedAvatar | null {
        if(typeof window === 'undefined') {
            return null;
        }

        try {
            const cached = localStorage.getItem(`github_avatar_${username}`);
            if(!cached) {
                return null;
            }

            const cacheData: CachedAvatar = JSON.parse(cached);

            // Check if cache is still valid
            if(Date.now() - cacheData.timestamp > this.AVATAR_CACHE_DURATION) {
                this.removeCachedAvatar(username);
                return null;
            }

            return cacheData;
        }
        catch(error) {
            console.error('Error reading cached avatar:', error);
            return null;
        }
    }

    setCachedAvatar(username: string, url: string): void {
        if(typeof window === 'undefined') {
            return;
        }

        try {
            const cacheData: CachedAvatar = {
                url,
                timestamp: Date.now()
            };

            localStorage.setItem(`github_avatar_${username}`, JSON.stringify(cacheData));
        }
        catch(error) {
            console.error('Error caching avatar:', error);
        }
    }

    removeCachedAvatar(username: string): void {
        if(typeof window === 'undefined') {
            return;
        }

        try {
            localStorage.removeItem(`github_avatar_${username}`);
        }
        catch(error) {
            console.error('Error removing cached avatar:', error);
        }
    }

    clearAllCache(): void {
        if(typeof window === 'undefined') {
            return;
        }

        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if(key.startsWith('github_avatar_')) {
                    localStorage.removeItem(key);
                }
            });
        }
        catch(error) {
            console.error('Error clearing cache:', error);
        }
    }
}

export const cacheService = new CacheService();
