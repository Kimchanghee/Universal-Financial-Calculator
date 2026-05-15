import React from 'react';

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

const AdBanner: React.FC<AdBannerProps> = () => null;

export default AdBanner;
