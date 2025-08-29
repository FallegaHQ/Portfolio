export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    startDate: string;
    endDate?: string;
    status: 'completed' | 'in-progress' | 'archived';
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    highlights: string[];
}
