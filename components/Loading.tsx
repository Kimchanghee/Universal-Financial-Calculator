import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-100 flex items-center justify-center">
            <div className="text-center">
                <div className="relative">
                    {/* Outer spinning ring */}
                    <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto"></div>
                    {/* Inner pulsing dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-rose-600 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <p className="mt-4 text-slate-600 font-medium animate-pulse">
                    로딩 중...
                </p>
            </div>
        </div>
    );
};

export default Loading;
