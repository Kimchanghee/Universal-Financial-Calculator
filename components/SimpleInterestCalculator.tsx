import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import { CURRENCY_MAP } from '../constants';
import { formatForDisplay, parseForCalculation } from '../utils';

const SimpleInterestCalculator: React.FC = () => {
    const { t, language } = useLocalization();
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [years, setYears] = useState('');
    const [results, setResults] = useState<{ label: string; value: string }[]>([]);
    
    const currency = CURRENCY_MAP[language] || CURRENCY_MAP['en'];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(language, { style: 'currency', currency: currency.code, minimumFractionDigits: 2 }).format(value);
    };

    const calculate = () => {
        const p = parseFloat(parseForCalculation(principal));
        const r = parseFloat(parseForCalculation(rate)) / 100;
        const termInYears = parseFloat(parseForCalculation(years));

        if (isNaN(p) || isNaN(r) || isNaN(termInYears)) {
            setResults([]);
            return;
        }

        const totalInterest = p * r * termInYears;
        const futureValue = p + totalInterest;

        setResults([
            { label: t('futureValue'), value: formatCurrency(futureValue) },
            { label: t('principal'), value: formatCurrency(p) },
            { label: t('totalInterest'), value: formatCurrency(totalInterest) }
        ]);
    };

    const reset = () => {
        setPrincipal('');
        setRate('');
        setYears('');
        setResults([]);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-800">{t('simpleInterestTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                 <InputField id="principal" label={t('principal')} value={formatForDisplay(principal)} onChange={e => setPrincipal(parseForCalculation(e.target.value))} unit={currency.symbol} />
                <InputField id="rate" label={t('annualRate')} value={rate} onChange={e => setRate(parseForCalculation(e.target.value))} unit="%" />
                <InputField id="years" label={t('years')} value={years} onChange={e => setYears(parseForCalculation(e.target.value))} />
            </div>
            <div className="mt-6 flex gap-4">
                <button onClick={calculate} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">{t('calculate')}</button>
                <button onClick={reset} className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition-colors">{t('reset')}</button>
            </div>
            <ResultDisplay results={results} language={language} />
        </div>
    );
};

export default SimpleInterestCalculator;
