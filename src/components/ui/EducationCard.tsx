import React from 'react'
import type {Education} from '@/types'
import {Calendar, GraduationCap, MapPin, Star} from 'lucide-react'
import {profileService} from '@/services/profileService.ts'

export const EducationCard: React.FC<{
    education: Education;
    darkMode: boolean
}> = ({
          education,
          darkMode
      }) => (<div className={`
        ${darkMode ? 'bg-white/5' : 'bg-white/50'} 
        backdrop-blur-xl rounded-2xl p-6 border 
        ${darkMode ? 'border-white/10' : 'border-white/30'}
    `}>
        <div className="flex items-start justify-between mb-4">
            <div>
                <h3 className="text-xl font-bold">{education.degree}</h3>
                <p className="text-lg font-medium text-blue-500">{education.field}</p>
                <div className="flex items-center gap-2 mt-1">
                    <GraduationCap size={16} className="text-purple-500"/>
                    <span className="font-medium">{education.institution}</span>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm">
            <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <MapPin size={14}/>
                {education.location}
            </span>
            <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Calendar size={14}/>
                {profileService.formatDateRange(education.startDate, education.endDate)}
            </span>
            {education.gpa &&
             (<span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Star size={14}/>
                    GPA: {education.gpa}
                </span>)}
        </div>

        {education.description && (<p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                {education.description}
            </p>)}
    </div>);
