import React, { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        adsbygoogle?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

interface AdBannerProps {
    width: string;
    height: string;
    size: string;
    label: string;
    slot: string;
    placement: string;
    channel?: string;
    priority?: 'high' | 'normal';
    responsive?: boolean;
    lazy?: boolean;
}

const ADSENSE_ID = import.meta.env.VITE_ADSENSE_ID || 'ca-pub-XXXXXXXXXXXXXXXX';
const ADSENSE_SCRIPT_ID = 'adsbygoogle-script';
const SLOT_PLACEHOLDER = '0000000000';
const AD_TEST_MODE = import.meta.env.VITE_AD_TEST_MODE === 'on' ? 'on' : undefined;
const ENABLE_AUTO_ADS = import.meta.env.VITE_AD_ENABLE_AUTO_ADS !== 'false';
const ENABLE_RESPONSIVE_ADS = import.meta.env.VITE_AD_ENABLE_RESPONSIVE !== 'false';
const LAZY_MARGIN = import.meta.env.VITE_AD_LAZY_MARGIN || '300px';

let hasLoggedMissingAdConfig = false;
let hasInitializedAutoAds = false;
let adScriptLoader: Promise<void> | null = null;

const isValidAdSenseId = (id: string): boolean => {
    return id.startsWith('ca-pub-') && !id.includes('X');
};

const isValidAdSlot = (slot: string): boolean => {
    return /^\d{8,}$/.test(slot) && slot !== SLOT_PLACEHOLDER;
};

const trackAdEvent = (name: string, params: Record<string, unknown>): void => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

    window.gtag('event', name, {
        event_category: 'adsense',
        ...params,
    });
};

const initializeAutoAds = (): void => {
    if (!ENABLE_AUTO_ADS || hasInitializedAutoAds || !window.adsbygoogle) return;

    try {
        (window.adsbygoogle as unknown[]).push({
            google_ad_client: ADSENSE_ID,
            enable_page_level_ads: true,
        });
        hasInitializedAutoAds = true;
    } catch (error) {
        console.error('AdSense Auto ads init error:', error);
    }
};

const loadAdSenseScript = (): Promise<void> => {
    if (window.adsbygoogle) {
        initializeAutoAds();
        return Promise.resolve();
    }

    if (adScriptLoader) {
        return adScriptLoader;
    }

    adScriptLoader = new Promise((resolve, reject) => {
        const existingScript = document.getElementById(ADSENSE_SCRIPT_ID) as HTMLScriptElement | null;

        const onReady = () => {
            initializeAutoAds();
            resolve();
        };

        if (existingScript) {
            existingScript.addEventListener('load', onReady, { once: true });
            existingScript.addEventListener('error', () => reject(new Error('Failed to load AdSense script')), { once: true });
            return;
        }

        const script = document.createElement('script');
        script.id = ADSENSE_SCRIPT_ID;
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
        script.setAttribute('data-ad-client', ADSENSE_ID);
        script.addEventListener('load', onReady, { once: true });
        script.addEventListener('error', () => reject(new Error('Failed to load AdSense script')), { once: true });
        document.head.appendChild(script);
    });

    return adScriptLoader;
};

const AdBanner: React.FC<AdBannerProps> = ({
    width,
    height,
    size,
    label,
    slot,
    placement,
    channel,
    priority = 'normal',
    responsive = false,
    lazy = true,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const adRef = useRef<HTMLModElement>(null);
    const isLoaded = useRef(false);
    const hasTrackedViewportEntry = useRef(false);
    const [isEligibleToLoad, setIsEligibleToLoad] = useState(!lazy || priority === 'high');

    const shouldUseResponsive = ENABLE_RESPONSIVE_ADS && responsive;
    const [adWidth, adHeight] = size.split('x');
    const fallbackWidth = Number.parseInt(adWidth, 10) || 0;
    const fallbackHeight = Number.parseInt(adHeight, 10) || 0;

    useEffect(() => {
        if (!lazy || priority === 'high') {
            setIsEligibleToLoad(true);
            return;
        }

        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                const [entry] = entries;
                if (!entry) return;

                if (!hasTrackedViewportEntry.current && entry.isIntersecting) {
                    hasTrackedViewportEntry.current = true;
                    trackAdEvent('ad_slot_viewport_entry', { placement, slot });
                }

                if (entry.isIntersecting) {
                    setIsEligibleToLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: LAZY_MARGIN }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [lazy, placement, priority, slot]);

    useEffect(() => {
        if (!adRef.current) return;
        if (!isEligibleToLoad) return;

        // Prevent duplicate loading in React Strict Mode.
        if (isLoaded.current) return;

        // Wait until full ad config is provided.
        if (!isValidAdSenseId(ADSENSE_ID) || !isValidAdSlot(slot)) {
            if (!hasLoggedMissingAdConfig) {
                console.warn('AdSense: set VITE_ADSENSE_ID and ad slot env vars before publishing ads.');
                hasLoggedMissingAdConfig = true;
            }
            return;
        }

        let isCancelled = false;

        loadAdSenseScript()
            .then(() => {
                if (isCancelled || isLoaded.current || !adRef.current || !window.adsbygoogle) return;

                try {
                    isLoaded.current = true;
                    (window.adsbygoogle as unknown[]).push({});
                    trackAdEvent('ad_slot_request', {
                        placement,
                        slot,
                        responsive: shouldUseResponsive,
                        priority,
                    });
                } catch (error) {
                    console.error('AdSense error:', error);
                }
            })
            .catch(error => {
                console.error(error);
                isLoaded.current = false;
            });

        return () => {
            isCancelled = true;
        };
    }, [isEligibleToLoad, placement, priority, shouldUseResponsive, slot]);

    if (!isValidAdSenseId(ADSENSE_ID) || !isValidAdSlot(slot)) {
        return (
            <div ref={containerRef} className={`flex justify-center items-center ${width} ${height} my-2`}>
                <div
                    className="flex items-center justify-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 text-sm"
                    style={{
                        width: shouldUseResponsive ? '100%' : `${fallbackWidth}px`,
                        minHeight: `${fallbackHeight}px`,
                    }}
                >
                    <span>{label} ({size})</span>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`flex justify-center items-center ${width} ${height} my-2`}
            style={shouldUseResponsive ? { minHeight: `${fallbackHeight}px` } : undefined}
        >
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={
                    shouldUseResponsive
                        ? { display: 'block', width: '100%', minHeight: `${fallbackHeight}px`, backgroundColor: '#f0f0f0' }
                        : { display: 'inline-block', width: `${fallbackWidth}px`, height: `${fallbackHeight}px`, backgroundColor: '#f0f0f0' }
                }
                data-ad-client={ADSENSE_ID}
                data-ad-slot={slot}
                data-ad-format={shouldUseResponsive ? 'auto' : undefined}
                data-full-width-responsive={shouldUseResponsive ? 'true' : undefined}
                data-ad-channel={channel || undefined}
                data-adtest={AD_TEST_MODE}
            />
        </div>
    );
};

export default AdBanner;
