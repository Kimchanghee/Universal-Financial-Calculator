import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import { CURRENCY_MAP } from '../constants';
import { formatForDisplay, parseForCalculation } from '../utils';

const RetirementCalculator: React.FC = () => {
    const { t, language } = useLocalization();
    const [currentAge, setCurrentAge] = useState('');
    const [retirementAge, setRetirementAge] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [annualReturn, setAnnualReturn] = useState('');
    const [results, setResults] = useState<{ label: string; value: string }[]>([]);

    const currency = CURRENCY_MAP[language] || CURRENCY_MAP['en'];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(language, { style: 'currency', currency: currency.code, minimumFractionDigits: 2 }).format(value);
    };

    const calculate = () => {
        const age = parseInt(parseForCalculation(currentAge));
        const retireAge = parseInt(parseForCalculation(retirementAge));
        const p = parseFloat(parseForCalculation(currentSavings));
        const c = parseFloat(parseForCalculation(monthlyContribution));
        const annualRate = parseFloat(parseForCalculation(annualReturn));

        if (isNaN(age) || isNaN(retireAge) || isNaN(p) || isNaN(c) || isNaN(annualRate) || age >= retireAge) {
            setResults([]);
            return;
        }

        const yearsToRetirement = retireAge - age;
        const months = yearsToRetirement * 12;
        const monthlyRate = annualRate / 100 / 12;

        let futureValue = p * Math.pow(1 + monthlyRate, months);
        futureValue += c * ( (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate );

        const totalContributions = p + (c * months);
        const totalInterest = futureValue - totalContributions;

        setResults([
            { label: t('estimatedRetirementSavings'), value: formatCurrency(futureValue) },
            { label: t('totalContributions'), value: formatCurrency(totalContributions) },
            { label: t('totalInterest'), value: formatCurrency(totalInterest) },
        ]);
    };

    const reset = () => {
        setCurrentAge('');
        setRetirementAge('');
        setCurrentSavings('');
        setMonthlyContribution('');
        setAnnualReturn('');
        setResults([]);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-800">{t('retirementTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField id="currentAge" label={t('currentAge')} value={currentAge} onChange={e => setCurrentAge(parseForCalculation(e.target.value))} />
                <InputField id="retirementAge" label={t('retirementAge')} value={retirementAge} onChange={e => setRetirementAge(parseForCalculation(e.target.value))} />
                <InputField id="currentSavings" label={t('currentSavings')} value={formatForDisplay(currentSavings)} onChange={e => setCurrentSavings(parseForCalculation(e.target.value))} unit={currency.symbol} />
                <InputField id="monthlyContribution" label={t('monthlyContribution')} value={formatForDisplay(monthlyContribution)} onChange={e => setMonthlyContribution(parseForCalculation(e.target.value))} unit={currency.symbol} />
                <InputField id="annualReturn" label={t('estimatedAnnualReturn')} value={annualReturn} onChange={e => setAnnualReturn(parseForCalculation(e.target.value))} unit="%" />
            </div>
            <div className="mt-6 flex gap-4">
                <button onClick={calculate} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">{t('calculate')}</button>
                <button onClick={reset} className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition-colors">{t('reset')}</button>
            </div>
            <ResultDisplay results={results} language={language} />
        </div>
    );
};

export default RetirementCalculator;