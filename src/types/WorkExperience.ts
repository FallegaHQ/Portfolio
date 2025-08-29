export interface WorkExperience {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate?: string; // undefined means current position
    description: string;
    technologies: string[];
    achievements: string[];
    website?: string;
}
