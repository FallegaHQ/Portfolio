import React from 'react';
import type {LucideIcon} from 'lucide-react';

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: number;
    darkMode: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
                                                      icon: Icon,
                                                      label,
                                                      value,
                                                      darkMode
                                                  }) => {
    return (<div
            className={`${darkMode ? 'bg-white/5' : 'bg-white/50'} backdrop-blur-xl rounded-2xl p-6 border ${darkMode ? 'border-white/10' : 'border-white/30'} hover:scale-105 transition-all duration-300 group`}>
            <Icon className="w-8 h-8 mb-4 text-blue-500 group-hover:scale-110 transition-transform"/>
            <div className="text-3xl font-bold mb-1">{value.toLocaleString()}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {label}
            </div>
        </div>);
};
