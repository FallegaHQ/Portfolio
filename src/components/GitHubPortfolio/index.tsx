import React from 'react';
import {useGitHubData, useTheme} from '../../hooks';
import {ThemeToggle} from './ThemeToggle';
import {LoadingSpinner} from './LoadingSpinner';
import {HeroSection} from './HeroSection';
import {StatsCards} from './StatsCards';
import {LanguagesSection} from './LanguagesSection';
import {ProjectsSection} from './ProjectsSection';
import {ContactSection} from './ContactSection';
import {LanguageDialog} from '../ui/modals/LanguageDialog';

const GitHubPortfolio: React.FC = () => {
    const {
              darkMode,
              toggleTheme
          } = useTheme();
    const {
              profile,
              repos,
              languages,
              loading,
              cachedAvatarUrl,
              selectedLanguage,
              setSelectedLanguage,
              showAllRepos,
              setShowAllRepos
          } = useGitHubData('FallegaHQ');

    if(loading){
        return <LoadingSpinner darkMode={darkMode}/>;
    }

    return (<div
        className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'}`}>
        <ThemeToggle darkMode={darkMode} onToggle={toggleTheme}/>

        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"/>

            <div className="relative max-w-6xl mx-auto px-6 py-20">
                <HeroSection
                    profile={profile}
                    cachedAvatarUrl={cachedAvatarUrl}
                    darkMode={darkMode}
                />

                <StatsCards
                    profile={profile}
                    repos={repos}
                    darkMode={darkMode}
                />

                <LanguagesSection
                    languages={languages}
                    onLanguageSelect={setSelectedLanguage}
                    darkMode={darkMode}
                />

                <ProjectsSection
                    repos={repos}
                    showAllRepos={showAllRepos}
                    onToggleView={setShowAllRepos}
                    darkMode={darkMode}
                />

                <ContactSection
                    username="FallegaHQ"
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

export default GitHubPortfolio;
