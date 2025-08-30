
import React from 'react';

interface ResultDisplayProps {
    results: Array<{ label: string; value: string }>;
    language: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results, language }) => {
    if (results.length === 0) {
        return null;
    }

    return (
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            {results.map((result, index) => (
                <div key={index} className={`flex justify-between items-center py-3 ${index < results.length - 1 ? 'border-b border-blue-100' : ''}`}>
                    <span className="text-base text-gray-600">{result.label}</span>
                    <span className="text-xl font-bold text-blue-700">{result.value}</span>
                </div>
            ))}
        </div>
    );
};

export default ResultDisplay;
