import {useEffect} from "react";
import {useLocation} from "react-router-dom";

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}

type AnalyticsConfig = {
    measurementId: string;
};

export function useAnalytics(config: AnalyticsConfig) {
    const location = useLocation();

    useEffect(() => {
        if(!config.measurementId) {
            return;
        }

        if(typeof window === "undefined") {
            return;
        }

        if(typeof window.gtag !== "function") {
            return;
        }

        window.gtag("config", config.measurementId, {
            page_path: location.pathname + location.search
        });
    }, [
        location.pathname,
        location.search,
        config.measurementId
    ]);
}
