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
const DESKTOP_MEDIA_QUERY = '(min-width: 768px)';

const isValidZoneKey = (key: string): boolean => /^[a-f0-9]{32}$/i.test(key);

const getIsDesktopViewport = (): boolean =>
    typeof window !== 'undefined' ? window.matchMedia(DESKTOP_MEDIA_QUERY).matches : true;

const useIsDesktopViewport = (): boolean => {
    const [isDesktop, setIsDesktop] = useState(getIsDesktopViewport);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
        const update = () => setIsDesktop(mediaQuery.matches);

        update();
        mediaQuery.addEventListener?.('change', update);
        return () => mediaQuery.removeEventListener?.('change', update);
    }, []);

    return isDesktop;
};

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
    const isDesktopViewport = useIsDesktopViewport();
    const [isEligibleToLoad, setIsEligibleToLoad] = useState(!lazy || priority === 'high');

    const desktopSize = getDesktopSize(placement, size);
    const mobileSize = responsive ? getMobileSize(desktopSize) : desktopSize;
    const activeSize = responsive && !isDesktopViewport ? mobileSize : desktopSize;
    const activeDimensions = ADSTERRA_DIMENSIONS[activeSize];
    const activeKey = ADSTERRA_ZONE_KEYS[activeSize];
    const isConfigured = isValidZoneKey(activeKey);

    const placeholderStyle = useMemo(
        () => ({
            width: responsive ? '100%' : `${activeDimensions.width}px`,
            minHeight: `${activeDimensions.height}px`,
        }),
        [activeDimensions.height, activeDimensions.width, responsive],
    );

    const srcDoc = useMemo(
        () => buildAdsterraSrcDoc(activeKey, activeDimensions.width, activeDimensions.height),
        [activeDimensions.height, activeDimensions.width, activeKey],
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
        trackAdEvent('adsterra_slot_request', { placement, active_size: activeSize, desktop_size: desktopSize, mobile_size: mobileSize, priority });
    }, [activeSize, desktopSize, isConfigured, isEligibleToLoad, mobileSize, placement, priority]);

    if (!isConfigured || !isEligibleToLoad) {
        return (
            <div ref={containerRef} className={`flex justify-center items-center ${width} ${height} my-2`}>
                <div
                    className="flex items-center justify-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 text-sm"
                    style={placeholderStyle}
                >
                    <span>{label} ({activeSize})</span>
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
            style={{ minHeight: `${activeDimensions.height}px` }}
        >
            <iframe
                key={`${placement}-${activeSize}`}
                title={`${placement}-adsterra-${activeSize}-${uniqueId}`}
                className="block border-0"
                width={activeDimensions.width}
                height={activeDimensions.height}
                scrolling="no"
                loading={priority === 'high' ? 'eager' : 'lazy'}
                srcDoc={srcDoc}
            />
        </div>
    );
};

export default AdBanner;
