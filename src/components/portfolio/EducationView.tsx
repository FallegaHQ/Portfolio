import React from 'react'
import type {ProfileViewProps} from './ExperienceView.tsx'
import {EducationCard} from '@/components/ui/EducationCard.tsx'

export const EducationView: React.FC<ProfileViewProps> = ({
                                                              profileData,
                                                              darkMode
                                                          }) => {
    return (<div className="space-y-6">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Education</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Academic background and continuous learning
            </p>
        </div>

        {profileData.education.map((edu) => (<EducationCard key={edu.id} education={edu} darkMode={darkMode}/>))}
    </div>);
};
