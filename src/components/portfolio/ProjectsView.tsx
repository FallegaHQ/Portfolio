import React from 'react'
import type {ProfileViewProps} from './ExperienceView.tsx'
import {CheckCircle, Clock, Pause} from 'lucide-react'
import type {Project} from '@/types'
import {ProjectCard} from '@/components/ui/ProjectCard.tsx'

export const ProjectsView: React.FC<ProfileViewProps> = ({
                                                             profileData,
                                                             darkMode
                                                         }) => {
    const statusIcons = {
        completed    : CheckCircle,
        'in-progress': Clock,
        archived     : Pause
    };

    const statusColors = {
        completed    : 'green',
        'in-progress': 'blue',
        archived     : 'gray'
    };

    return (<div className="space-y-6">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Personal Projects</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Side projects and portfolio work
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            {profileData.projects.map((project: Project) => (<ProjectCard
                key={project.id}
                project={project}
                darkMode={darkMode}
                statusIcon={statusIcons[project.status]}
                statusColor={statusColors[project.status]}
            />))}
        </div>
    </div>);
};
