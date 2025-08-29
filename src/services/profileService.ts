import type {ProfileData} from '@/types';

class ProfileService {
    private profileData: ProfileData | null = null;

    async loadProfileData(): Promise<ProfileData>{
        if(this.profileData){
            return this.profileData;
        }

        try{
            const response = await fetch('/profile-data.json');
            if(!response.ok){
                return this.getFallbackProfileData();
            }
            this.profileData = await response.json();
            return this.profileData as ProfileData;
        }
        catch(error){
            console.warn('Failed to load profile data from file, using fallback:', error);
            return this.getFallbackProfileData();
        }
    }

    getSkillsByCategory(skills: ProfileData['skills']){
        const categories = skills.reduce((acc, skill) => {
            if(!acc[skill.category]){
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {} as Record<string, typeof skills>);

        // Sort skills within each category by proficiency
        Object.keys(categories)
              .forEach(category => {
                  categories[category].sort((a, b) => b.proficiency - a.proficiency);
              });

        return categories;
    }

    formatDateRange(startDate: string, endDate?: string): string{
        const start = new Date(startDate).toLocaleDateString('en-US', {
            year : 'numeric',
            month: 'short'
        });

        if(!endDate){
            return `${start} - Present`;
        }

        const end = new Date(endDate).toLocaleDateString('en-US', {
            year : 'numeric',
            month: 'short'
        });

        return `${start} - ${end}`;
    }

    calculateDuration(startDate: string, endDate?: string): string{
        const start = new Date(startDate);
        const end   = endDate ? new Date(endDate) : new Date();

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const years    = Math.floor(diffDays / 365);
        const months   = Math.floor((diffDays % 365) / 30);

        if(years > 0){
            return months > 0 ? `${years}y ${months}m` : `${years}y`;
        }
        return `${months}m`;
    }

    private getFallbackProfileData(): ProfileData{
        return {
            "personalInfo"  : {
                "fullName": "SAKHRAOUI Omar",
                "title"   : "Senior Full-Stack Developer",
                "summary" : "Seasoned Software Developer with over a decade of experience in architecting, developing, and deploying robust applications across web and mobile platforms. Committed to engineering excellence with a focus on writing clean, scalable, and reusable code. Adept at collaborating with cross-functional teams and clients to deliver state-of-the-art solutions. Proven mentor with experience in training teams on emerging technologies and best practices.",
                "email"   : "contact@softwyx.com",
                "location": "Remote / Global",
                "website" : "https://softwyx.com",
                "github"  : "https://github.com/FallegaHQ"
            },
            "workExperience": [
                {
                    "id"          : "work-1",
                    "company"     : "SoftToDo",
                    "position"    : "Full-Stack Developer",
                    "location"    : "Sfax, TN",
                    "startDate"   : "2024-10",
                    "endDate"     : "2025-04",
                    "description" : "Full-stack developer responsible for building, deploying, and maintaining scalable web applications using Symfony.",
                    "technologies": [
                        "PHP 8",
                        "Symfony",
                        "React",
                        "TypeScript",
                        "Node.js",
                        "Docker"
                    ],
                    "achievements": [
                        "Developed full-stack application features with Symfony, including backend logic and responsive frontends.",
                        "Built and deployed scalable REST APIs with optimized database performance.",
                        "Improved code quality by adding PHPUnit test coverage and conducting peer code reviews."
                    ],
                    "website"     : "https://www.softtodo.com"
                },
                {
                    "id"          : "work-2",
                    "company"     : "AnyWr",
                    "position"    : "Backend Developer",
                    "location"    : "Tunis, TN",
                    "startDate"   : "2022-02",
                    "endDate"     : "2024-08",
                    "description" : "Backend developer focusing on microservices, efficient service communication, and maintainable code architecture.",
                    "technologies": [
                        "GoLang",
                        "PostgreSQL",
                        "Docker"
                    ],
                    "achievements": [
                        "Designed and implemented gRPC services in Go to enable efficient microservice communication.",
                        "Built bidirectional streaming RPCs in gRPC for real-time client-server interaction.",
                        "Ensured code quality through active participation in peer reviews and best practices.",
                        "Applied Spring IoC and dependency injection to develop modular, maintainable systems."
                    ],
                    "website"     : "https://www.anywr-group.com/en/"
                },
                {
                    "id"          : "work-3",
                    "company"     : "BinaZone & Maktris",
                    "position"    : "Web Development Team Lead",
                    "location"    : "Ariana, TN",
                    "startDate"   : "2019-11",
                    "endDate"     : "2023-02",
                    "description" : "Team lead responsible for project management, team culture, and successful product delivery.",
                    "technologies": [
                        "PHP",
                        "MySQL",
                        "Laravel",
                        "JavaScript",
                        "Bootstrap"
                    ],
                    "achievements": [
                        "Applied Agile methodologies to improve project management and collaboration.",
                        "Organized team-building initiatives to foster a positive and collaborative culture.",
                        "Led evaluation and adoption of new technologies to boost productivity and quality.",
                        "Successfully launched and deployed a complex web application on time and to spec."
                    ]
                },
                {
                    "id"          : "work-4",
                    "company"     : "MediaDezines",
                    "position"    : "Full Stack Developer",
                    "location"    : "Remote, Tampa, Florida",
                    "startDate"   : "2017-02",
                    "endDate"     : "2019-09",
                    "description" : "Full Stack focused on creating responsive, optimized, and maintainable web applications.",
                    "technologies": [
                        "PHP",
                        "MySQL",
                        "Angular",
                        "Laravel",
                        "JavaScript"
                    ],
                    "achievements": [
                        "Built responsive web designs ensuring seamless user experience across devices.",
                        "Applied SEO best practices to enhance search engine visibility.",
                        "Reduced feature development time by creating a reusable code library.",
                        "Fostered collaboration through clear communication and active code review participation."
                    ]
                },
                {
                    "id"          : "work-5",
                    "company"     : "UpWork",
                    "position"    : "Freelance Web Developer",
                    "location"    : "Remote",
                    "startDate"   : "2012-05",
                    "endDate"     : "2017-02",
                    "description" : "Developer specializing in modern web technologies and efficient project delivery.",
                    "technologies": [
                        "PHP",
                        "Android",
                        "Java",
                        "JavaScript",
                        "Bootstrap",
                        "jQuery"
                    ],
                    "achievements": [
                        "Built dynamic, user-friendly applications using Angular (v4+), HTML5, CSS3, and jQuery.",
                        "Ensured timely delivery by prioritizing tasks and applying effective time management techniques."
                    ]
                }
            ],
            "education"     : [
                {
                    "id"         : "edu-1",
                    "institution": "University of Technology",
                    "degree"     : "Fundamental license in Computer Science\n",
                    "field"      : "Computer Science",
                    "location"   : "Gafsa, TN",
                    "startDate"  : "2013-09",
                    "endDate"    : "2017-06",
                    "description": "Bachelor’s equivalent focused on programming, algorithms, and software engineering."
                },
                {
                    "id"         : "edu-2",
                    "institution": "LS Sened",
                    "degree"     : "Baccalaureate",
                    "field"      : "Computer Science",
                    "location"   : "Gafsa, TN",
                    "startDate"  : "2012-09",
                    "endDate"    : "2013-06",
                    "description": "Equivalent to a high school diploma, with specialization in CS."
                }
            ],
            "skills"        : [
                {
                    "id"               : "skill-1",
                    "name"             : "React",
                    "category"         : "frontend",
                    "proficiency"      : 4,
                    "yearsOfExperience": 4
                },
                {
                    "id"               : "skill-2",
                    "name"             : "TypeScript",
                    "category"         : "frontend",
                    "proficiency"      : 5,
                    "yearsOfExperience": 5
                },
                {
                    "id"               : "skill-3",
                    "name"             : "Node.js",
                    "category"         : "backend",
                    "proficiency"      : 5,
                    "yearsOfExperience": 6
                },
                {
                    "id"               : "skill-4",
                    "name"             : "Python",
                    "category"         : "backend",
                    "proficiency"      : 3,
                    "yearsOfExperience": 2
                },
                {
                    "id"               : "skill-5",
                    "name"             : "PostgreSQL",
                    "category"         : "database",
                    "proficiency"      : 4,
                    "yearsOfExperience": 2
                },
                {
                    "id"               : "skill-6",
                    "name"             : "AWS",
                    "category"         : "devops",
                    "proficiency"      : 3,
                    "yearsOfExperience": 2
                },
                {
                    "id"               : "skill-7",
                    "name"             : "Docker",
                    "category"         : "devops",
                    "proficiency"      : 5,
                    "yearsOfExperience": 6
                },
                {
                    "id"               : "skill-8",
                    "name"             : "Vue.js",
                    "category"         : "frontend",
                    "proficiency"      : 4,
                    "yearsOfExperience": 2
                },
                {
                    "id"         : "skill-9",
                    "name"       : "Problem Solving",
                    "category"   : "Soft Skills",
                    "proficiency": 5
                },
                {
                    "id"         : "skill-10",
                    "name"       : "Analytical Thinking",
                    "category"   : "Soft Skills",
                    "proficiency": 5
                },
                {
                    "id"         : "skill-11",
                    "name"       : "Collaboration and Communication",
                    "category"   : "Soft Skills",
                    "proficiency": 4
                },
                {
                    "id"         : "skill-12",
                    "name"       : "Time Management",
                    "category"   : "Soft Skills",
                    "proficiency": 4
                },
                {
                    "id"         : "skill-13",
                    "name"       : "Team Play",
                    "category"   : "Soft Skills",
                    "proficiency": 5
                },
                {
                    "id"               : "skill-14",
                    "name"             : "MySQL",
                    "category"         : "database",
                    "proficiency"      : 5,
                    "yearsOfExperience": 10
                },
                {
                    "id"               : "skill-15",
                    "name"             : "MySQL",
                    "category"         : "database",
                    "proficiency"      : 5,
                    "yearsOfExperience": 10
                },
                {
                    "id"               : "skill-16",
                    "name"             : "PHP",
                    "category"         : "backend",
                    "proficiency"      : 5,
                    "yearsOfExperience": 13
                }
            ],
            "projects"      : [
                {
                    "id"          : "project-1",
                    "name"        : "Scrabla",
                    "description" : "A Scrabble game for Android devices",
                    "technologies": [
                        "Java"
                    ],
                    "startDate"   : "2025-08",
                    "status"      : "in-progress",
                    "githubUrl"   : "https://github.com/FallegaHQ/Scrabla",
                    "highlights"  : [
                        "Supports LAN multiplayer",
                        "Integrates with original competitive rules and dictionaries"
                    ]
                },
                {
                    "id"          : "project-2",
                    "name"        : "XTT",
                    "description" : "A simple yet powerful expenses/transactions tracker",
                    "technologies": [
                        "TypeScript",
                        "React",
                        "PHP",
                        "Docker"
                    ],
                    "startDate"   : "2024-01",
                    "status"      : "archived",
                    "highlights"  : [
                        "Category & Tag Management",
                        "Visual Reports & Charts",
                        "Export & Backup"
                    ]
                },
                {
                    "id"          : "project-3",
                    "name"        : "SoftWyx",
                    "description" : "Collaborative SaaS website creation tool",
                    "technologies": [
                        "Shell",
                        "Docker",
                        "PHP",
                        "Node.js",
                        "VueJs 3"
                    ],
                    "startDate"   : "2025-04",
                    "status"      : "in-progress",
                    "githubUrl"   : "https://github.com/FallegaHQ/softwyx",
                    "liveUrl"     : "https://softwyx.com",
                    "highlights"  : [
                        "Drag-and-Drop Page Builder",
                        "Responsive Templates",
                        "Custom Domain & Hosting",
                        "SEO & Analytics Integration",
                        "E-commerce Support",
                        "Secure User Account Management"
                    ]
                }
            ]
        };
    }
}

export const profileService = new ProfileService();
