import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

const RECTANGLE_KEY = '4b1ef0f98c6d20eacd89dd624cf1c25e';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

const buildSrcDoc = (key: string) =>
    '<!doctype html><html><head><meta charset="utf-8">' +
    '<style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body>' +
    `<script type="text/javascript">atOptions={'key':'${key}','format':'iframe','height':250,'width':300,'params':{}};<\/script>` +
    `<script type="text/javascript" src="https://www.highperformanceformat.com/${key}/invoke.js"><\/script>` +
    '</body></html>';

const SafeInlineAdsterra: React.FC = () => {
    const hostRef = useRef<HTMLDivElement>(null);
    const uniqueId = useId().replace(/:/g, '');
    const [shouldLoad, setShouldLoad] = useState(false);
    const srcDoc = useMemo(() => buildSrcDoc(RECTANGLE_KEY), []);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;
        if (typeof IntersectionObserver === 'undefined') {
            setShouldLoad(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return;
                setShouldLoad(true);
                observer.disconnect();
            },
            { rootMargin: '360px 0px' },
        );
        observer.observe(host);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!shouldLoad) return;
        window.gtag?.('event', 'adsterra_safe_inline_request', {
            placement: 'finoracalc-after-calculator',
            ad_format: '300x250',
        });
    }, [shouldLoad]);

    return (
        <aside
            ref={hostRef}
            className="safe-inline-adsterra mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-md"
            aria-label="Advertisement"
        >
            <span className="mb-2 block text-center text-[10px] font-semibold uppercase tracking-normal text-slate-400">
                Advertisement
            </span>
            <div className="flex min-h-[250px] items-center justify-center overflow-hidden">
                {shouldLoad && (
                    <iframe
                        title={`finoracalc-safe-inline-adsterra-${uniqueId}`}
                        width="300"
                        height="250"
                        scrolling="no"
                        className="block border-0"
                        srcDoc={srcDoc}
                    />
                )}
            </div>
        </aside>
    );
};

export default SafeInlineAdsterra;
