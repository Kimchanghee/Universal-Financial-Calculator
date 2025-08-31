import React, { useEffect } from 'react';

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

const AdBanner: React.FC<AdBannerProps> = ({ width, height, size, label, slot }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, []);

    const [adWidth, adHeight] = size.split('x');

    return (
        <div className={`flex justify-center items-center ${width} ${height} my-2`}>
            <ins className="adsbygoogle"
                 style={{ display: 'inline-block', width: `${adWidth}px`, height: `${adHeight}px`, backgroundColor: '#f0f0f0' }}
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot={slot}>
            </ins>
        </div>
    );
};

export default AdBanner;