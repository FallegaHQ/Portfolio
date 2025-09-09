export interface Skill {
    id: string;
    name: string;
    category: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'tools' | 'Soft Skills' | 'other';
    proficiency: 1 | 2 | 3 | 4 | 5; // 1-5 scale
    yearsOfExperience?: number;
}
