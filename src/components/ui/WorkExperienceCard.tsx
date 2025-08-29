import React from 'react'
import type {WorkExperience} from '@/types'
import {Building, Calendar, ChevronRight, Clock, ExternalLink, MapPin} from 'lucide-react'
import {profileService} from '@/services/profileService.ts'

export const WorkExperienceCard: React.FC<{
    work: WorkExperience;
    darkMode: boolean;
    isLatest: boolean
}> = ({
          work,
          darkMode,
          isLatest
      }) => (<div className={`
        ${darkMode ? 'bg-white/5' : 'bg-white/50'} 
        backdrop-blur-xl rounded-2xl p-6 border 
        ${darkMode ? 'border-white/10' : 'border-white/30'}
        ${isLatest ? 'ring-2 ring-blue-500/50' : ''}
    `}>
        <div className="flex items-start justify-between mb-4">
            <div>
                <h3 className="text-xl font-bold">{work.position}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <Building size={16} className="text-blue-500"/>
                    <span className="font-medium">{work.company}</span>
                    {isLatest && (<span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                            Current
                        </span>)}
                </div>
            </div>
            {work.website && (<a
                    href={work.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                    <ExternalLink size={16}/>
                </a>)}
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm">
            <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <MapPin size={14}/>
                {work.location}
            </span>
            <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Calendar size={14}/>
                {profileService.formatDateRange(work.startDate, work.endDate)}
            </span>
            <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Clock size={14}/>
                {profileService.calculateDuration(work.startDate, work.endDate)}
            </span>
        </div>

        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            {work.description}
        </p>

        <div className="mb-4">
            <h4 className="font-semibold mb-2">Key Achievements</h4>
            <ul className="space-y-1">
                {work.achievements.map((achievement, index) => (<li key={index}
                                                                    className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <ChevronRight size={14} className="mt-0.5 text-blue-500 shrink-0"/>
                        {achievement}
                    </li>))}
            </ul>
        </div>

        <div>
            <h4 className="font-semibold mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
                {work.technologies.map((tech, index) => (<span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}
                    >
                        {tech}
                    </span>))}
            </div>
        </div>
    </div>);
