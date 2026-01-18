export interface GitHubEvent {
    id: string;
    type: string;
    actor: {
        id: number;
        login: string;
        display_login?: string;
    };
    repo: {
        id: number;
        name: string;
        url: string;
    };
    created_at: string;
    payload?: {
        commits?: Array<{
            sha: string;
            message?: string;
            url?: string;
        }>;
        ref?: string;
    };
    public?: boolean;
}
