import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

interface ResultDisplayProps {
    results: Array<{ label: string; value: string }>;
    language: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results, language }) => {
    const { t } = useLocalization();
    if (results.length === 0) {
        return null;
    }

    const icons = ['💰', '📊', '✨'];

    return (
        <div className="mt-8 p-8 bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 rounded-2xl border-2 border-red-200/50 shadow-xl backdrop-blur-sm animate-fadeIn">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-transparent bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text flex items-center gap-2">
                    <span className="text-2xl">📈</span>
                    {t('results')}
                </h3>
            </div>
            <div className="space-y-4">
                {results.map((result, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-4 bg-white/70 backdrop-blur-md rounded-xl border border-red-100/50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{icons[index % icons.length]}</span>
                            <span className="text-base font-semibold text-slate-700">{result.label}</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                            {result.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultDisplay;
