import React from 'react';

interface LoadingSpinnerProps {
    darkMode: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({darkMode}) => {
    return (<div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
        </div>);
};
