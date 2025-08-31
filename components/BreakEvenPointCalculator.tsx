import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import { CURRENCY_MAP } from '../constants';
import { formatForDisplay, parseForCalculation } from '../utils';

const BreakEvenPointCalculator: React.FC = () => {
    const { t, language } = useLocalization();
    const [fixedCosts, setFixedCosts] = useState('');
    const [variableCostPerUnit, setVariableCostPerUnit] = useState('');
    const [pricePerUnit, setPricePerUnit] = useState('');
    const [results, setResults] = useState<{ label: string; value: string }[]>([]);

    const currency = CURRENCY_MAP[language] || CURRENCY_MAP['en'];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(language, { style: 'currency', currency: currency.code, minimumFractionDigits: 2 }).format(value);
    };

    const calculate = () => {
        const fc = parseFloat(parseForCalculation(fixedCosts));
        const vc = parseFloat(parseForCalculation(variableCostPerUnit));
        const p = parseFloat(parseForCalculation(pricePerUnit));

        if (isNaN(fc) || isNaN(vc) || isNaN(p) || p <= vc) {
            setResults([]);
            return;
        }

        const breakEvenUnits = fc / (p - vc);
        const breakEvenRevenue = breakEvenUnits * p;

        setResults([
            { label: t('breakEvenUnits'), value: Math.ceil(breakEvenUnits).toLocaleString(language) },
            { label: t('breakEvenRevenue'), value: formatCurrency(breakEvenRevenue) },
        ]);
    };

    const reset = () => {
        setFixedCosts('');
        setVariableCostPerUnit('');
        setPricePerUnit('');
        setResults([]);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-800">{t('breakEvenTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField id="fixedCosts" label={t('totalFixedCosts')} value={formatForDisplay(fixedCosts)} onChange={e => setFixedCosts(parseForCalculation(e.target.value))} unit={currency.symbol} />
                <InputField id="variableCostPerUnit" label={t('variableCostPerUnit')} value={formatForDisplay(variableCostPerUnit)} onChange={e => setVariableCostPerUnit(parseForCalculation(e.target.value))} unit={currency.symbol} />
                <InputField id="pricePerUnit" label={t('pricePerUnit')} value={formatForDisplay(pricePerUnit)} onChange={e => setPricePerUnit(parseForCalculation(e.target.value))} unit={currency.symbol} />
            </div>
            <div className="mt-6 flex gap-4">
                <button onClick={calculate} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">{t('calculate')}</button>
                <button onClick={reset} className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition-colors">{t('reset')}</button>
            </div>
            <ResultDisplay results={results} language={language} />
        </div>
    );
};

export default BreakEvenPointCalculator;