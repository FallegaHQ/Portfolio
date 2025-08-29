import type {WorkExperience} from './WorkExperience.ts'
import type {Education} from './Education.ts'
import type {Skill} from './Skill.ts'
import type {Project} from './Project.ts'

export interface ProfileData {
    personalInfo: {
        fullName: string;
        title: string;
        summary: string;
        email?: string;
        phone?: string;
        location: string;
        website?: string;
        linkedin?: string;
        github: string;
    };
    workExperience: WorkExperience[];
    education: Education[];
    skills: Skill[];
    projects: Project[];
}
