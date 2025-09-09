import React from 'react'
import type {Project} from '@/types'
import {ChevronRight, ExternalLink} from 'lucide-react'

export const ProjectCard: React.FC<{
    project: Project; darkMode: boolean; statusIcon: React.ComponentType<{
        size: number; className?: string
    }>; statusColor: string
}> = ({
          project,
          darkMode,
          statusIcon: StatusIcon,
          statusColor
      }) => (<div className={`
        ${darkMode ? 'bg-white/5' : 'bg-white/50'} 
        backdrop-blur-xl rounded-2xl p-6 border 
        ${darkMode ? 'border-white/10' : 'border-white/30'}
        hover:scale-105 transition-all duration-300
    `}>
    <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold">{project.name}</h3>
        <div className="flex items-center gap-2">
            <StatusIcon size={16} className={`text-${statusColor}-500`}/>
            <span
                className={`px-2 py-1 rounded-full text-xs bg-${statusColor}-500/20 text-${statusColor}-400 capitalize`}>
                    {project.status.replace('-', ' ')}
                </span>
        </div>
    </div>

    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
        {project.description}
    </p>

    <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.map((tech, index) => (<span
                key={index}
                className={`px-2 py-1 rounded-lg text-xs ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
            >
                        {tech}
                    </span>))}
        </div>
    </div>

    <div className="mb-4">
        <h4 className="font-semibold mb-2">Highlights</h4>
        <ul className="space-y-1">
            {project.highlights.map((highlight, index) => (<li key={index}
                                                               className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <ChevronRight size={14} className="mt-0.5 text-blue-500 shrink-0"/>
                {highlight}
            </li>))}
        </ul>
    </div>

    <div className="flex gap-2">
        {project.githubUrl && (<a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors flex items-center gap-1"
        >
            <ExternalLink size={14}/>
            Code
        </a>)}
        {project.liveUrl && (<a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors flex items-center gap-1"
        >
            <ExternalLink size={14}/>
            Live Demo
        </a>)}
    </div>
</div>);
