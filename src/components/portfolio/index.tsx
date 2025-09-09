import React, {useState} from 'react';
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
import {usePageMeta} from "@hooks/usePageMeta.tsx";

const Portfolio: React.FC = () => {

    usePageMeta({
                    title      : "SAKHRAOUI Omar | Softwyx",
                    description: "This is the landing page where you get to meet me.",
                    keywords   : "resuma, fallega, fallegahq, dev, fullstack, developer, softwyx"
                });
    const [activeView, setActiveView] = useState<ViewType>('experience');

    const {
              darkMode,
              toggleTheme
          } = useTheme();

    const {
              profile,
              repos,
              featuredRepos,
              languages,
              loading: githubLoading,
              cachedAvatarUrl,
              selectedLanguage,
              setSelectedLanguage,
              showAllRepos,
              setShowAllRepos,
              totalStars
          } = useGitHubData(GITHUB_CONFIG.USERNAME);

    const {
              profileData,
              loading: profileLoading,
              error  : profileError
          } = useProfileData();

    const isLoading = activeView === 'github' ? githubLoading : profileLoading;

    if(isLoading) {
        return <LoadingSpinner darkMode={darkMode}/>;
    }

    const renderGitHubView = () => (<>
        <HeroSection
            profile={profile}
            cachedAvatarUrl={cachedAvatarUrl}
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
                <div className="text-center mb-8">
                    <div className="relative inline-block mb-6">
                        <div className={`
                                w-32 h-32 rounded-full border-4 overflow-hidden
                                ${darkMode ? 'border-white/20' : 'border-white/30'}
                                bg-linear-to-br from-blue-500 to-purple-600
                            `}>
                            {cachedAvatarUrl ? (<img
                                src={cachedAvatarUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />) : (<div
                                className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                                {(profile?.name || GITHUB_CONFIG.USERNAME).charAt(0)
                                                                          .toUpperCase()}
                            </div>)}
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

                    <div className="prose prose-lg max-w-3xl mx-auto">
                        <div
                            className={`${darkMode ? 'bg-white/5' : 'bg-white/50'} backdrop-blur-xl rounded-2xl p-6 border ${darkMode ? 'border-white/10' : 'border-white/30'}`}>
                            <h3 className="text-xl font-semibold mb-4">About Me</h3>
                            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                {profileData?.personalInfo.summary}
                            </p>
                        </div>
                    </div>
                </div>

                <Navigation
                    activeView={activeView}
                    onViewChange={setActiveView}
                    darkMode={darkMode}
                />

                <div className="mt-12 mb-12">
                    {activeView === 'github' ? renderGitHubView() : renderProfileView()}
                </div>

                <ContactSection
                    username={GITHUB_CONFIG.USERNAME}
                    profile={profile}
                    darkMode={darkMode}
                />
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
