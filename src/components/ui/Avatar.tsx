import React from 'react';
import {Users} from 'lucide-react';

interface AvatarProps {
    src?: string | null;
    alt: string;
    size?: 'small' | 'medium' | 'large';
    darkMode: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
                                                  src,
                                                  alt,
                                                  size = 'medium',
                                                  darkMode
                                              }) => {
    const sizeClasses = {
        small : 'w-12 h-12',
        medium: 'w-20 h-20',
        large : 'w-32 h-32'
    };

    return (<div
        className={`${sizeClasses[size]} mx-auto rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-xl shadow-2xl`}>
        {src ? (<img src={src} alt={alt} className="w-full h-full object-cover"/>) : (<div
            className={`w-full h-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} flex items-center justify-center`}>
            <Users size={size === 'large' ? 40 : size === 'medium' ? 24 : 16} className="text-gray-500"/>
        </div>)}
    </div>);
};
