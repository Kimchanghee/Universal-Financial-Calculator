import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import { CURRENCY_MAP } from '../constants';
import { formatForDisplay, parseForCalculation } from '../utils';

const InflationCalculator: React.FC = () => {
    const { t, language } = useLocalization();
    const [initialAmount, setInitialAmount] = useState('');
    const [inflationRate, setInflationRate] = useState('');
    const [years, setYears] = useState('');
    const [results, setResults] = useState<{ label: string; value: string }[]>([]);

    const currency = CURRENCY_MAP[language] || CURRENCY_MAP['en'];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(language, { style: 'currency', currency: currency.code, minimumFractionDigits: 2 }).format(value);
    };

    const calculate = () => {
        const principal = parseFloat(parseForCalculation(initialAmount));
        const rate = parseFloat(parseForCalculation(inflationRate));
        const numYears = parseFloat(parseForCalculation(years));

        if (isNaN(principal) || isNaN(rate) || isNaN(numYears) || principal <= 0 || rate < 0 || numYears <= 0) {
            setResults([]);
            return;
        }

        const inflationRateDecimal = rate / 100;
        const futureValue = principal * Math.pow(1 + inflationRateDecimal, numYears);
        const lostValue = futureValue - principal;

        setResults([
            { label: t('futureCost'), value: formatCurrency(futureValue) },
            { label: t('purchasingPowerLost'), value: formatCurrency(lostValue) },
        ]);
    };

    const reset = () => {
        setInitialAmount('');
        setInflationRate('');
        setYears('');
        setResults([]);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-800">{t('inflationTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField id="initialAmount" label={t('initialAmount')} value={formatForDisplay(initialAmount)} onChange={e => setInitialAmount(parseForCalculation(e.target.value))} unit={currency.symbol} />
                <InputField id="inflationRate" label={t('annualInflationRate')} value={inflationRate} onChange={e => setInflationRate(parseForCalculation(e.target.value))} unit="%" />
                <InputField id="years" label={t('numberOfYears')} value={years} onChange={e => setYears(parseForCalculation(e.target.value))} />
            </div>
            <div className="mt-6 flex gap-4">
                <button onClick={calculate} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">{t('calculate')}</button>
                <button onClick={reset} className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition-colors">{t('reset')}</button>
            </div>
            <ResultDisplay results={results} language={language} />
        </div>
    );
};

export default InflationCalculator;