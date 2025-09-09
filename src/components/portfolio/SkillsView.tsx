// Skills View
import React from 'react'
import type {ProfileViewProps} from './ExperienceView.tsx'
import {profileService} from '@/services/profileService.ts'
import {SkillCard} from '@/components/ui/SkillCard.tsx'

export const SkillsView: React.FC<ProfileViewProps> = ({
                                                           profileData,
                                                           darkMode
                                                       }) => {
    const skillsByCategory = profileService.getSkillsByCategory(profileData.skills);

    const categoryColors = {
        backend : 'green',
        frontend: 'blue',
        mobile  : 'purple',
        database: 'orange',
        devops  : 'red',
        tools   : 'gray',
        other   : 'indigo'
    };

    return (<div className="space-y-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Skills & Technologies</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Technical expertise across the full development stack
            </p>
        </div>

        {Object.entries(skillsByCategory)
               .map(([category, skills]) => (<div key={category} className={`
                    ${darkMode ? 'bg-white/5' : 'bg-white/50'} 
                    backdrop-blur-xl rounded-2xl p-6 border 
                    ${darkMode ? 'border-white/10' : 'border-white/30'}
                `}>
                   <h3 className="text-xl font-bold mb-4 capitalize flex items-center gap-2">
                       <div
                           className={`w-3 h-3 rounded-full bg-${categoryColors[category as keyof typeof categoryColors] ||
                                                                 'gray'}-500`}/>
                       {category}
                   </h3>
                   <div className="grid md:grid-cols-2 gap-4">
                       {skills.map((skill) => (<SkillCard key={skill.id} skill={skill} darkMode={darkMode}/>))}
                   </div>
               </div>))}
    </div>);
};
