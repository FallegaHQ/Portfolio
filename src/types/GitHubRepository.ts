export interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    fork: boolean;
    archived: boolean;
    disabled: boolean;
    private: boolean;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    size: number;
    default_branch: string;
    topics: string[];
    visibility: 'public' | 'private';
}
