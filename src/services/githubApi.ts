import type {GitHubProfile} from '@/types';
import type {GitHubRepository} from '@/types';

class GitHubApiService {
    private readonly proxyUrl = '/github-proxy.php';

    private async makeRequest<T>(endpoint: string): Promise<T>{
        const response = await fetch(`${this.proxyUrl}?endpoint=${encodeURIComponent(endpoint)}`);

        if(!response.ok){
            let errorMessage = `Failed to fetch from GitHub API: ${response.status}`;
            const errorData  = await response.json();
            if(errorData.error){
                errorMessage = errorData.error;
                throw new Error(errorMessage);
            }
        }

        return response.json();
    }

    async getProfile(username: string): Promise<GitHubProfile>{
        return this.makeRequest<GitHubProfile>(`users/${username}`);
    }

    async getRepositories(username: string): Promise<GitHubRepository[]>{
        return this.makeRequest<GitHubRepository[]>(`users/${username}/repos`);
    }

    async getRepository(username: string, repoName: string): Promise<GitHubRepository>{
        return this.makeRequest<GitHubRepository>(`repos/${username}/${repoName}`);
    }

    async getRepositoryLanguages(username: string, repoName: string): Promise<Record<string, number>>{
        return this.makeRequest<Record<string, number>>(`repos/${username}/${repoName}/languages`);
    }
}

export const githubApi = new GitHubApiService();
