import type {GitHubEvent, GitHubProfile, GitHubRepository} from '@/types';

class GitHubApiService {
    private readonly proxyUrl = 'https://softwyx.com/github-proxy.php';

    async getProfile(username: string): Promise<GitHubProfile> {
        return this.makeRequest<GitHubProfile>(`users/${username}`);
    }

    async getRepositories(username: string): Promise<GitHubRepository[]> {
        return this.makeRequest<GitHubRepository[]>(`users/${username}/repos`);
    }

    async getRepository(username: string, repoName: string): Promise<GitHubRepository> {
        return this.makeRequest<GitHubRepository>(`repos/${username}/${repoName}`);
    }

    async getRepositoryLanguages(username: string, repoName: string): Promise<Record<string, number>> {
        return this.makeRequest<Record<string, number>>(`repos/${username}/${repoName}/languages`);
    }

    async getPublicEvents(username: string): Promise<GitHubEvent[]> {
        return this.makeRequest<GitHubEvent[]>(`users/${username}/events/public`);
    }

    async getEvents(username: string): Promise<GitHubEvent[]> {
        return this.makeRequest<GitHubEvent[]>(`users/${username}/events`);
    }

    async graphql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
        const response = await fetch(`${this.proxyUrl}?endpoint=${encodeURIComponent('graphql')}`,
                                     {
                                         method : 'POST',
                                         headers: {
                                             'Content-Type': 'application/json'
                                         },
                                         body   : JSON.stringify({query, variables})
                                     });

        if(!response.ok) {
            let errorMessage = `Failed to fetch from GitHub API: ${response.status}`;
            const errorData = await response.json();
            if(errorData.error) {
                errorMessage = errorData.error;
                throw new Error(errorMessage);
            }
            throw new Error(errorMessage);
        }

        return response.json();
    }

    private async makeRequest<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.proxyUrl}?endpoint=${encodeURIComponent(endpoint)}`);

        if(!response.ok) {
            let errorMessage = `Failed to fetch from GitHub API: ${response.status}`;
            const errorData = await response.json();
            if(errorData.error) {
                errorMessage = errorData.error;
                throw new Error(errorMessage);
            }
        }

        return response.json();
    }
}

export const githubApi = new GitHubApiService();
