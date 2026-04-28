import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

type AdsterraSize = '728x90' | '300x250' | '160x600' | '320x50';

interface AdBannerProps {
    width: string;
    height: string;
    size: AdsterraSize;
    label: string;
    placement: string;
    priority?: 'high' | 'normal';
    responsive?: boolean;
    lazy?: boolean;
}

const ADSTERRA_ZONE_KEYS: Record<AdsterraSize, string> = {
    '728x90': import.meta.env.VITE_ADSTERRA_728_KEY || '60e616cbc74d357d1384bf0ab6efb837',
    '300x250': import.meta.env.VITE_ADSTERRA_300_KEY || '4b1ef0f98c6d20eacd89dd624cf1c25e',
    '160x600': import.meta.env.VITE_ADSTERRA_160_KEY || 'e29693f7e9174874719cdef13442808f',
    '320x50': import.meta.env.VITE_ADSTERRA_320_KEY || '994cec480cca7ee96a01ae374e0e0e1e',
};

const ADSTERRA_DIMENSIONS: Record<AdsterraSize, { width: number; height: number }> = {
    '728x90': { width: 728, height: 90 },
    '300x250': { width: 300, height: 250 },
    '160x600': { width: 160, height: 600 },
    '320x50': { width: 320, height: 50 },
};

const ADSTERRA_IFRAME_HOST = 'www.highperformanceformat.com';
const LAZY_MARGIN = import.meta.env.VITE_ADSTERRA_LAZY_MARGIN || '300px';

const isValidZoneKey = (key: string): boolean => /^[a-f0-9]{32}$/i.test(key);

const trackAdEvent = (name: string, params: Record<string, unknown>): void => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

    window.gtag('event', name, {
        event_category: 'adsterra',
        ...params,
    });
};

const getDesktopSize = (placement: string, requestedSize: AdsterraSize): AdsterraSize => {
    if (placement.includes('sidebar')) return '160x600';
    if (placement === 'body') return '300x250';
    return requestedSize;
};

const getMobileSize = (desktopSize: AdsterraSize): AdsterraSize => {
    if (desktopSize === '728x90') return '320x50';
    if (desktopSize === '160x600') return '300x250';
    return desktopSize;
};

const buildAdsterraSrcDoc = (key: string, width: number, height: number): string =>
    '<!doctype html><html><head><meta charset="utf-8">' +
    '<style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body>' +
    `<script type="text/javascript">atOptions={'key':'${key}','format':'iframe','height':${height},'width':${width},'params':{}};<\/script>` +
    `<script type="text/javascript" src="https://${ADSTERRA_IFRAME_HOST}/${key}/invoke.js"><\/script>` +
    '</body></html>';

const AdBanner: React.FC<AdBannerProps> = ({
    width,
    height,
    size,
    label,
    placement,
    priority = 'normal',
    responsive = false,
    lazy = true,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const uniqueId = useId().replace(/:/g, '');
    const [isEligibleToLoad, setIsEligibleToLoad] = useState(!lazy || priority === 'high');

    const desktopSize = getDesktopSize(placement, size);
    const mobileSize = responsive ? getMobileSize(desktopSize) : desktopSize;
    const desktop = ADSTERRA_DIMENSIONS[desktopSize];
    const mobile = ADSTERRA_DIMENSIONS[mobileSize];
    const desktopKey = ADSTERRA_ZONE_KEYS[desktopSize];
    const mobileKey = ADSTERRA_ZONE_KEYS[mobileSize];
    const isConfigured = isValidZoneKey(desktopKey) && isValidZoneKey(mobileKey);

    const placeholderStyle = useMemo(
        () => ({
            width: responsive ? '100%' : `${desktop.width}px`,
            minHeight: `${desktop.height}px`,
        }),
        [desktop.height, desktop.width, responsive],
    );

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

                if (entry.isIntersecting) {
                    setIsEligibleToLoad(true);
                    trackAdEvent('adsterra_slot_viewport_entry', { placement, desktop_size: desktopSize, mobile_size: mobileSize });
                    observer.disconnect();
                }
            },
            { rootMargin: LAZY_MARGIN },
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [desktopSize, lazy, mobileSize, placement, priority]);

    useEffect(() => {
        if (!isEligibleToLoad || !isConfigured) return;
        trackAdEvent('adsterra_slot_request', { placement, desktop_size: desktopSize, mobile_size: mobileSize, priority });
    }, [desktopSize, isConfigured, isEligibleToLoad, mobileSize, placement, priority]);

    if (!isConfigured || !isEligibleToLoad) {
        return (
            <div ref={containerRef} className={`flex justify-center items-center ${width} ${height} my-2`}>
                <div
                    className="flex items-center justify-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 text-sm"
                    style={placeholderStyle}
                >
                    <span>{label} ({desktopSize})</span>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`flex justify-center items-center overflow-hidden ${width} ${height} my-2`}
            role="complementary"
            aria-label={label}
            style={{ minHeight: `${mobile.height}px` }}
        >
            <iframe
                title={`${placement}-adsterra-mobile-${uniqueId}`}
                className="block border-0 md:hidden"
                width={mobile.width}
                height={mobile.height}
                scrolling="no"
                srcDoc={buildAdsterraSrcDoc(mobileKey, mobile.width, mobile.height)}
            />
            <iframe
                title={`${placement}-adsterra-desktop-${uniqueId}`}
                className="hidden border-0 md:block"
                width={desktop.width}
                height={desktop.height}
                scrolling="no"
                srcDoc={buildAdsterraSrcDoc(desktopKey, desktop.width, desktop.height)}
            />
        </div>
    );
};

export default AdBanner;
