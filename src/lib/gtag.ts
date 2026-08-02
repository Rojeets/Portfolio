// lib/gtag.js
export const GA_TRACKING_ID = 'G-374HP49TL6';
// Add gtag to the window object
declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'js',
            targetId: string,
            config?: Record<string, any>
        ) => void;
    }
}

export const pageview = (url: string): void => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};