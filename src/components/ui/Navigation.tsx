import React from 'react';
import {Briefcase, Code, FolderOpen, Github, GraduationCap} from 'lucide-react';
import {Link, useLocation} from 'react-router-dom';

export type ViewType = 'github' | 'experience' | 'education' | 'skills' | 'projects';

interface NavigationProps {
    activeView: ViewType;
    onViewChange: (view: ViewType) => void;
    darkMode: boolean;
}

interface NavItem {
    id: ViewType;
    label: string;
    icon: React.ComponentType<{ size: number }>;
    path: string;
}

const navItems: NavItem[] = [
    {
        id   : 'experience',
        label: 'Experience',
        icon : Briefcase,
        path : '/experience'
    },
    {
        id   : 'education',
        label: 'Education',
        icon : GraduationCap,
        path : '/education'
    },
    {
        id   : 'skills',
        label: 'Skills',
        icon : Code,
        path : '/skills'
    },
    {
        id   : 'projects',
        label: 'Projects',
        icon : FolderOpen,
        path : '/projects'
    },
    {
        id   : 'github',
        label: 'GitHub',
        icon : Github,
        path : '/github'
    },
];

export const Navigation: React.FC<NavigationProps> = ({
                                                          onViewChange,
                                                          darkMode
                                                      }) => {
    const location = useLocation();

    return (<nav className={`sticky top-6 z-30 mx-auto max-w-4xl mb-8`}>
            <div className={`
                ${darkMode ? 'bg-white/10' : 'bg-white/80'} 
                backdrop-blur-xl rounded-2xl p-2 border 
                ${darkMode ? 'border-white/20' : 'border-white/30'}
            `}>
                <div className="flex flex-wrap justify-center gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (<Link
                                key={item.id}
                                to={item.path}
                                onClick={() => onViewChange(item.id)}
                                className={`
                                    px-4 py-3 rounded-xl transition-all duration-300 
                                    flex items-center gap-2 text-sm font-medium
                                    no-underline
                                    ${isActive ? darkMode ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : darkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'}
                                `}
                            >
                                <Icon size={18}/>
                                <span className="hidden sm:inline">{item.label}</span>
                            </Link>);
                    })}
                </div>
            </div>
        </nav>);
};