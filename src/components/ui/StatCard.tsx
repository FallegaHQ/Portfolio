import React from 'react';
import type {LucideIcon} from 'lucide-react';

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    darkMode: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
                                                      icon: Icon,
                                                      label,
                                                      value,
                                                      darkMode
                                                  }) => {
    return (<div className={`
            ${darkMode ? 'bg-white/5' : 'bg-white/50'} 
            backdrop-blur-xl rounded-2xl p-6 border 
            ${darkMode ? 'border-white/10' : 'border-white/30'}
            hover:scale-105 transition-all duration-300 group
        `}>
            <div className="flex items-center justify-between mb-4">
                <Icon className="text-blue-500 group-hover:scale-110 transition-transform" size={24}/>
            </div>
            <div className="text-3xl font-bold mb-2">{value}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {label}
            </div>
        </div>);
};
