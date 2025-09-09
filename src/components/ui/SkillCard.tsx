import React from 'react'
import type {Skill} from '@/types'

export const SkillCard: React.FC<{
    skill: Skill; darkMode: boolean
}> = ({
          skill,
          darkMode
      }) => {
    const getProficiencyColor = (level: number) => {
        if(level >= 4) {
            return 'green';
        }
        if(level >= 3) {
            return 'blue';
        }
        return 'yellow';
    };

    return (<div
        className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-white/30'} border ${darkMode ? 'border-white/10' : 'border-white/20'}`}>
        <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">{skill.name}</h4>
            <span
                className={`px-2 py-1 rounded-full text-xs bg-${getProficiencyColor(skill.proficiency)}-500/20 text-${getProficiencyColor(
                    skill.proficiency)}-400`}>
                    Level {skill.proficiency}
                </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
            <div className="flex-1">
                <div className="flex mb-1">
                    {[...Array(5)].map((_, i) => (<div
                        key={i}
                        className={`h-2 w-full mr-1 rounded ${i <
                                                              skill.proficiency ? `bg-${getProficiencyColor(skill.proficiency)}-500` : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                    />))}
                </div>
            </div>
            {skill.yearsOfExperience && <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {skill.yearsOfExperience}y exp
                </span>}

        </div>
    </div>);
};
