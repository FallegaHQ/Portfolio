import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useGitHubData, useProfileData, useTheme} from '@/hooks';
import {Navigation, type ViewType} from '@/components/ui/Navigation';
import {LanguageDialog} from '@/components/ui/modals/LanguageDialog';
import {GITHUB_CONFIG} from '@/utils';
import {ThemeToggle} from './ThemeToggle';
import {LoadingSpinner} from './LoadingSpinner';
import {HeroSection} from './HeroSection';
import {StatsCards} from './StatsCards';
import {LanguagesSection} from './LanguagesSection';
import {ProjectsSection} from './ProjectsSection';
import {ContactSection} from './ContactSection';
import {ExperienceView} from './ExperienceView.tsx'
import {EducationView} from './EducationView.tsx'
import {SkillsView} from './SkillsView.tsx'
import {ProjectsView} from './ProjectsView.tsx'
import {HomeView} from './HomeView.tsx'
import {usePageMeta} from "@hooks/usePageMeta.tsx";
import {useAnalytics} from "@hooks/useAnalytics";

// Map URL paths to ViewType
const pathToView: Record<string, ViewType> = {
    '/'          : 'home',
    '/home'      : 'home',
    '/experience': 'experience',
    '/education' : 'education',
    '/skills'    : 'skills',
    '/projects'  : 'projects',
    '/github'    : 'github'
};

// Map ViewType to URL paths
const viewToPath: Record<ViewType, string> = {
    'home'      : '/home',
    'experience': '/experience',
    'education' : '/education',
    'skills'    : '/skills',
    'projects'  : '/projects',
    'github'    : '/github'
};

// Page metadata for each view
const SITE_URL = "https://softwyx.com";

const viewMetadata: Record<ViewType, { title: string; description: string; keywords: string; canonical: string; jsonLd: string; [key: string]: string }> = {
    home      : {
        title      : "Hire Me | SAKHRAOUI Omar | Softwyx",
        description: "Hire SAKHRAOUI Omar for freelance projects or full-time roles. Laravel, Symfony, React, Angular.",
        keywords   : "hire, freelance, full time, laravel, symfony, react, angular, senior full stack developer",
        canonical  : `${SITE_URL}/`,
        "og:type"        : "website",
        "og:site_name"   : "Softwyx",
        "og:title"       : "Hire Me | SAKHRAOUI Omar | Softwyx",
        "og:description" : "Hire SAKHRAOUI Omar for freelance projects or full-time roles. Laravel, Symfony, React, Angular.",
        "og:url"         : `${SITE_URL}/`,
        "og:image"       : `${SITE_URL}/og-image.png`,
        "twitter:card"        : "summary_large_image",
        "twitter:title"       : "Hire Me | SAKHRAOUI Omar | Softwyx",
        "twitter:description" : "Hire SAKHRAOUI Omar for freelance projects or full-time roles. Laravel, Symfony, React, Angular.",
        "twitter:image"       : `${SITE_URL}/og-image.png`,
        jsonLd: JSON.stringify({
                                  "@context": "https://schema.org",
                                  "@type"   : "WebPage",
                                  name      : "Hire Me",
                                  url       : `${SITE_URL}/`
                              })
    },
    experience: {
        title      : "Experience | SAKHRAOUI Omar | Softwyx",
        description: "Professional experience and career journey of SAKHRAOUI Omar, fullstack developer at Softwyx.",
        keywords   : "experience, career, fullstack developer, softwyx, work history",
        canonical  : `${SITE_URL}/experience`,
        "og:type"        : "website",
        "og:site_name"   : "Softwyx",
        "og:title"       : "Experience | SAKHRAOUI Omar | Softwyx",
        "og:description" : "Professional experience and career journey of SAKHRAOUI Omar, fullstack developer at Softwyx.",
        "og:url"         : `${SITE_URL}/experience`,
        "og:image"       : `${SITE_URL}/og-image.png`,
        "twitter:card"        : "summary_large_image",
        "twitter:title"       : "Experience | SAKHRAOUI Omar | Softwyx",
        "twitter:description" : "Professional experience and career journey of SAKHRAOUI Omar, fullstack developer at Softwyx.",
        "twitter:image"       : `${SITE_URL}/og-image.png`,
        jsonLd: JSON.stringify({
                                  "@context": "https://schema.org",
                                  "@type"   : "Person",
                                  name      : "SAKHRAOUI Omar",
                                  url       : SITE_URL,
                                  jobTitle  : "Senior Full-Stack Developer",
                                  email     : "contact@softwyx.com",
                                  sameAs    : [
                                      "https://github.com/FallegaHQ"
                                  ]
                              })
    },
    education : {
        title      : "Education | SAKHRAOUI Omar | Softwyx",
        description: "Educational background and qualifications of SAKHRAOUI Omar.",
        keywords   : "education, qualifications, degrees, certificates, learning",
        canonical  : `${SITE_URL}/education`,
        "og:type"        : "website",
        "og:site_name"   : "Softwyx",
        "og:title"       : "Education | SAKHRAOUI Omar | Softwyx",
        "og:description" : "Educational background and qualifications of SAKHRAOUI Omar.",
        "og:url"         : `${SITE_URL}/education`,
        "og:image"       : `${SITE_URL}/og-image.png`,
        "twitter:card"        : "summary_large_image",
        "twitter:title"       : "Education | SAKHRAOUI Omar | Softwyx",
        "twitter:description" : "Educational background and qualifications of SAKHRAOUI Omar.",
        "twitter:image"       : `${SITE_URL}/og-image.png`,
        jsonLd: JSON.stringify({
                                  "@context": "https://schema.org",
                                  "@type"   : "WebPage",
                                  name      : "Education",
                                  url       : `${SITE_URL}/education`
                              })
    },
    skills    : {
        title      : "Skills | SAKHRAOUI Omar | Softwyx",
        description: "Technical skills and expertise of SAKHRAOUI Omar in software development.",
        keywords   : "skills, programming, technologies, expertise, development",
        canonical  : `${SITE_URL}/skills`,
        "og:type"        : "website",
        "og:site_name"   : "Softwyx",
        "og:title"       : "Skills | SAKHRAOUI Omar | Softwyx",
        "og:description" : "Technical skills and expertise of SAKHRAOUI Omar in software development.",
        "og:url"         : `${SITE_URL}/skills`,
        "og:image"       : `${SITE_URL}/og-image.png`,
        "twitter:card"        : "summary_large_image",
        "twitter:title"       : "Skills | SAKHRAOUI Omar | Softwyx",
        "twitter:description" : "Technical skills and expertise of SAKHRAOUI Omar in software development.",
        "twitter:image"       : `${SITE_URL}/og-image.png`,
        jsonLd: JSON.stringify({
                                  "@context": "https://schema.org",
                                  "@type"   : "WebPage",
                                  name      : "Skills",
                                  url       : `${SITE_URL}/skills`
                              })
    },
    projects  : {
        title      : "Projects | SAKHRAOUI Omar | Softwyx",
        description: "Portfolio projects and work samples by SAKHRAOUI Omar.",
        keywords   : "projects, portfolio, work samples, development projects",
        canonical  : `${SITE_URL}/projects`,
        "og:type"        : "website",
        "og:site_name"   : "Softwyx",
        "og:title"       : "Projects | SAKHRAOUI Omar | Softwyx",
        "og:description" : "Portfolio projects and work samples by SAKHRAOUI Omar.",
        "og:url"         : `${SITE_URL}/projects`,
        "og:image"       : `${SITE_URL}/og-image.png`,
        "twitter:card"        : "summary_large_image",
        "twitter:title"       : "Projects | SAKHRAOUI Omar | Softwyx",
        "twitter:description" : "Portfolio projects and work samples by SAKHRAOUI Omar.",
        "twitter:image"       : `${SITE_URL}/og-image.png`,
        jsonLd: JSON.stringify({
                                  "@context": "https://schema.org",
                                  "@type"   : "WebPage",
                                  name      : "Projects",
                                  url       : `${SITE_URL}/projects`
                              })
    },
    github    : {
        title      : "GitHub Profile | SAKHRAOUI Omar | Softwyx",
        description: "GitHub profile and open source contributions of SAKHRAOUI Omar.",
        keywords   : "github, open source, repositories, code, contributions",
        canonical  : `${SITE_URL}/github`,
        "og:type"        : "website",
        "og:site_name"   : "Softwyx",
        "og:title"       : "GitHub Profile | SAKHRAOUI Omar | Softwyx",
        "og:description" : "GitHub profile and open source contributions of SAKHRAOUI Omar.",
        "og:url"         : `${SITE_URL}/github`,
        "og:image"       : `${SITE_URL}/og-image.png`,
        "twitter:card"        : "summary_large_image",
        "twitter:title"       : "GitHub Profile | SAKHRAOUI Omar | Softwyx",
        "twitter:description" : "GitHub profile and open source contributions of SAKHRAOUI Omar.",
        "twitter:image"       : `${SITE_URL}/og-image.png`,
        jsonLd: JSON.stringify({
                                  "@context": "https://schema.org",
                                  "@type"   : "WebPage",
                                  name      : "GitHub",
                                  url       : `${SITE_URL}/github`
                              })
    }
};

const Portfolio: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useAnalytics({measurementId: "G-X2H21DGQJB"});

    // Determine initial view from URL (used once). After that, meta follows activeView.
    const initialView = pathToView[location.pathname] || 'home';
    const [activeView, setActiveView] = useState<ViewType>(initialView);

    // Keep activeView in sync when user navigates via browser back/forward.
    useEffect(() => {
                  const viewFromUrl = pathToView[location.pathname] || 'home';
                  setActiveView(viewFromUrl);
              },
              [location.pathname]);

    // Set page metadata based on active tab, not raw URL.
    usePageMeta(viewMetadata[activeView]);

    const {
              darkMode,
              toggleTheme
          } = useTheme();

    const githubEnabled = activeView === 'github';

    const {
              profile,
              repos,
              featuredRepos,
              languages,
              loading: githubLoading,
              selectedLanguage,
              setSelectedLanguage,
              showAllRepos,
              setShowAllRepos,
              totalStars
          } = useGitHubData(GITHUB_CONFIG.USERNAME, githubEnabled);

    const {
              profileData,
              loading: profileLoading,
              error  : profileError
          } = useProfileData();

    // Handle view changes by navigating to the appropriate route
    const handleViewChange = (view: ViewType) => {
        setActiveView(view);
        navigate(viewToPath[view]);
    };



    const isLoading = activeView === 'github' ? githubLoading : profileLoading;

    if(isLoading) {
        return <LoadingSpinner darkMode={darkMode}/>;
    }

    const renderGitHubView = () => (<>
        <HeroSection
            profile={profile}
            darkMode={darkMode}
        />

        <StatsCards
            profile={profile}
            repos={repos}
            totalStars={totalStars}
            darkMode={darkMode}
        />

        <LanguagesSection
            languages={languages}
            onLanguageSelect={setSelectedLanguage}
            darkMode={darkMode}
        />

        <ProjectsSection
            repos={repos}
            featuredRepos={featuredRepos}
            showAllRepos={showAllRepos}
            onToggleView={setShowAllRepos}
            darkMode={darkMode}
        />
    </>);

    const renderProfileView = () => {
        if(profileError) {
            return (<div className={`text-center py-20 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                <p className="text-xl mb-4">Failed to load profile data</p>
                <p className="text-sm opacity-75">{profileError}</p>
            </div>);
        }

        if(!profileData) {
            return (<div className={`text-center py-20 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <p className="text-xl">No profile data available</p>
            </div>);
        }

        switch(activeView) {
            case 'home':
                return <HomeView profileData={profileData} darkMode={darkMode}/>;
            case 'experience':
                return <ExperienceView profileData={profileData} darkMode={darkMode}/>;
            case 'education':
                return <EducationView profileData={profileData} darkMode={darkMode}/>;
            case 'skills':
                return <SkillsView profileData={profileData} darkMode={darkMode}/>;
            case 'projects':
                return <ProjectsView profileData={profileData} darkMode={darkMode}/>;
            default:
                return null;
        }
    };

    return (<div
        className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 text-white' : 'bg-linear-to-br from-blue-50 via-white to-purple-50 text-gray-900'}`}>
        <ThemeToggle darkMode={darkMode} onToggle={toggleTheme}/>

        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"/>

            <div className="relative max-w-6xl mx-auto px-6 py-20">
                <header className="text-center mb-8">
                    <div className="relative inline-block mb-6">
                        <div className={`
                                w-32 h-32 rounded-full border-4 overflow-hidden
                                ${darkMode ? 'border-white/20' : 'border-white/30'}
                                bg-linear-to-br from-blue-500 to-purple-600
                            `}>
                            <img
                                src="/ms-icon-310x310.png"
                                alt="Profile"
                                width={128}
                                height={128}
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div
                            className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"/>
                    </div>

                    <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {profileData?.personalInfo.fullName || profile?.name || GITHUB_CONFIG.USERNAME}
                    </h1>

                    <p className={`text-xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {profileData?.personalInfo.title || profile?.bio || 'Passionate Developer & Problem Solver'}
                    </p>

                    <Navigation
                        activeView={activeView}
                        onViewChange={handleViewChange}
                        darkMode={darkMode}
                    />
                </header>

                <main id="main-content" className="mt-12 mb-12">
                    {activeView === 'github' ? renderGitHubView() : renderProfileView()}
                </main>

                <footer>
                    <ContactSection
                        username={GITHUB_CONFIG.USERNAME}
                        profile={profile}
                        darkMode={darkMode}
                    />

                    <div className={`mt-12 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <p>
                            © {new Date().getFullYear()} {profileData?.personalInfo.fullName || profile?.name || GITHUB_CONFIG.USERNAME} · v{__APP_VERSION__}
                        </p>
                    </div>
                </footer>
            </div>
        </div>

        {selectedLanguage && (<LanguageDialog
            language={selectedLanguage}
            repos={repos}
            onClose={() => setSelectedLanguage(null)}
            darkMode={darkMode}
        />)}
    </div>);
};

export default Portfolio;