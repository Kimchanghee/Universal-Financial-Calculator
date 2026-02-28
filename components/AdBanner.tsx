import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        adsbygoogle?: any[];
    }
}

interface AdBannerProps {
    width: string;
    height: string;
    size: string;
    label: string;
    slot: string;
}

// Get AdSense ID from environment variable or use placeholder
const ADSENSE_ID = import.meta.env.VITE_ADSENSE_ID || 'ca-pub-XXXXXXXXXXXXXXXX';
const ADSENSE_SCRIPT_ID = 'adsbygoogle-script';

const AdBanner: React.FC<AdBannerProps> = ({ width, height, size, label: _label, slot }) => {
    const adRef = useRef<HTMLModElement>(null);
    const isLoaded = useRef(false);

    useEffect(() => {
        if (!adRef.current) return;

        // Prevent duplicate loading in React Strict Mode
        if (isLoaded.current) return;
        
        // Skip ad loading if using placeholder ID
        if (ADSENSE_ID === 'ca-pub-XXXXXXXXXXXXXXXX') {
            console.warn('AdSense: Using placeholder ID. Please set VITE_ADSENSE_ID environment variable.');
            return;
        }

        const requestAd = () => {
            try {
                if (adRef.current && window.adsbygoogle) {
                    isLoaded.current = true;
                    window.adsbygoogle.push({});
                }
            } catch (e) {
                console.error('AdSense error:', e);
            }
        };

        const existingScript = document.getElementById(ADSENSE_SCRIPT_ID) as HTMLScriptElement | null;
        if (existingScript) {
            if (window.adsbygoogle) {
                requestAd();
                return;
            }

            const onLoad = () => requestAd();
            existingScript.addEventListener('load', onLoad, { once: true });
            return () => existingScript.removeEventListener('load', onLoad);
        }

        const script = document.createElement('script');
        script.id = ADSENSE_SCRIPT_ID;
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
        script.setAttribute('data-ad-client', ADSENSE_ID);
        script.addEventListener('load', () => requestAd(), { once: true });
        document.head.appendChild(script);
    }, [slot]);

    const [adWidth, adHeight] = size.split('x');
    
    // Show placeholder if no valid AdSense ID
    if (ADSENSE_ID === 'ca-pub-XXXXXXXXXXXXXXXX') {
        return (
            <div className={`flex justify-center items-center ${width} ${height} my-2`}>
                <div 
                    className="flex items-center justify-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 text-sm"
                    style={{ width: `${adWidth}px`, height: `${adHeight}px` }}
                >
                    <span>광고 공간 ({size})</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex justify-center items-center ${width} ${height} my-2`}>
            <ins 
                ref={adRef}
                className="adsbygoogle"
                style={{ display: 'inline-block', width: `${adWidth}px`, height: `${adHeight}px`, backgroundColor: '#f0f0f0' }}
                data-ad-client={ADSENSE_ID}
                data-ad-slot={slot}
            />
        </div>
    );
};

export default AdBanner;
