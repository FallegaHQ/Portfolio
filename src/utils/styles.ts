export const getGlassStyles = (darkMode: boolean) => ({
    background: darkMode ? 'bg-white/5' : 'bg-white/50',
    backdrop  : 'backdrop-blur-xl',
    border    : darkMode ? 'border-white/10' : 'border-white/30',
});

export const getCardHoverStyles = () => 'hover:scale-105 transition-all duration-300 group';

export const getTextStyles = (darkMode: boolean) => ({
    primary  : darkMode ? 'text-white' : 'text-gray-900',
    secondary: darkMode ? 'text-gray-300' : 'text-gray-600',
    muted    : darkMode ? 'text-gray-400' : 'text-gray-500',
});

export const getButtonStyles = (variant: 'primary' | 'secondary', darkMode: boolean) => {
    const baseStyles = 'px-6 py-3 rounded-xl transition-colors duration-300 flex items-center gap-2';

    if(variant === 'primary'){
        return `${baseStyles} bg-blue-600 hover:bg-blue-700 text-white`;
    }

    return `${baseStyles} ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`;
};
