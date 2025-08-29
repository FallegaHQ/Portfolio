import React from 'react';
import { Github, Briefcase, GraduationCap, FolderOpen, Code } from 'lucide-react';

export type ViewType = 'github' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications';

interface NavigationProps {
    activeView: ViewType;
    onViewChange: (view: ViewType) => void;
    darkMode: boolean;
}

interface NavItem {
    id: ViewType;
    label: string;
    icon: React.ComponentType<{ size: number }>;
}

const navItems: NavItem[] = [
    { id: 'github', label: 'GitHub', icon: Github },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
];

export const Navigation: React.FC<NavigationProps> = ({
                                                          activeView,
                                                          onViewChange,
                                                          darkMode
                                                      }) => {
    return (
        <nav className={`sticky top-6 z-30 mx-auto max-w-4xl mb-8`}>
            <div className={`
                ${darkMode ? 'bg-white/10' : 'bg-white/80'} 
                backdrop-blur-xl rounded-2xl p-2 border 
                ${darkMode ? 'border-white/20' : 'border-white/30'}
            `}>
                <div className="flex flex-wrap justify-center gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeView === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => onViewChange(item.id)}
                                className={`
                                    px-4 py-3 rounded-xl transition-all duration-300 
                                    flex items-center gap-2 text-sm font-medium
                                    ${isActive
                                      ? darkMode
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                        : 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                      : darkMode
                                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                }
                                `}
                            >
                                <Icon size={18} />
                                <span className="hidden sm:inline">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};
