
import React from 'react';

interface AdBannerProps {
    width: string;
    height: string;
    size: string;
    label: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ width, height, size, label }) => {
    return (
        <div className={`${width} ${height} bg-gray-200 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center rounded-lg`}>
            <div className="text-gray-500 font-semibold">{label}</div>
            <div className="text-gray-400 text-sm mt-1">{size}</div>
        </div>
    );
};

export default AdBanner;
