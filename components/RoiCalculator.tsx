
import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import { CURRENCY_MAP } from '../constants';
import { formatForDisplay, parseForCalculation } from '../utils';

const RoiCalculator: React.FC = () => {
    const { t, language } = useLocalization();
    const [initialInvestment, setInitialInvestment] = useState('');
    const [finalValue, setFinalValue] = useState('');
    const [results, setResults] = useState<{ label: string; value: string }[]>([]);
    
    const currency = CURRENCY_MAP[language] || CURRENCY_MAP['en'];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(language, { style: 'currency', currency: currency.code, minimumFractionDigits: 2 }).format(value);
    };

    const calculate = () => {
        const initial = parseFloat(initialInvestment);
        const final = parseFloat(finalValue);

        if (isNaN(initial) || isNaN(final) || initial === 0) {
            setResults([]);
            return;
        }

        const netProfit = final - initial;
        const roi = (netProfit / initial) * 100;

        setResults([
            { label: t('roiPercentage'), value: `${roi.toFixed(2)}%` },
            { label: t('netProfit'), value: formatCurrency(netProfit) },
        ]);
    };

    const reset = () => {
        setInitialInvestment('');
        setFinalValue('');
        setResults([]);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-800">{t('roiTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField id="initialInvestment" label={t('initialInvestment')} value={formatForDisplay(initialInvestment)} onChange={e => setInitialInvestment(parseForCalculation(e.target.value))} unit={currency.symbol} />
                <InputField id="finalValue" label={t('finalValueOfInvestment')} value={formatForDisplay(finalValue)} onChange={e => setFinalValue(parseForCalculation(e.target.value))} unit={currency.symbol} />
            </div>
            <div className="mt-6 flex gap-4">
                <button onClick={calculate} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">{t('calculate')}</button>
                <button onClick={reset} className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition-colors">{t('reset')}</button>
            </div>
            <ResultDisplay results={results} language={language} />
        </div>
    );
};

export default RoiCalculator;
