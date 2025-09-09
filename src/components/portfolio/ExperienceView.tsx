import React from 'react'
import {profileService} from '@/services/profileService.ts'
import type {ProfileData} from '@/types'
import {WorkExperienceCard} from '@/components/ui/WorkExperienceCard.tsx'

export interface ProfileViewProps {
    profileData: ProfileData;
    darkMode: boolean;
}

export const ExperienceView: React.FC<ProfileViewProps> = ({
                                                               profileData,
                                                               darkMode
                                                           }) => {
    return (<div className="space-y-6">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Work Experience</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {profileService.calculateDuration(profileData.workExperience[profileData.workExperience.length -
                                                                             1]?.startDate || '2017-01')} of
                professional experience
            </p>
        </div>

        {profileData.workExperience.map((work, index) => (
            <WorkExperienceCard key={work.id} work={work} darkMode={darkMode} isLatest={index === 0}/>))}
    </div>);
};
