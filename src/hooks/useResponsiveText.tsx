import {processText} from '@/utils'

export const useResponsiveText = (text: string): string => {
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;

    let maxLength: number;

    if(isMobile){
        maxLength = 18;
    }
    else if(isTablet){
        maxLength = 60;
    }
    else{
        maxLength = Infinity;
    }

    return processText(text, {
        maxLength,
        convertDashes: true
    });
};
