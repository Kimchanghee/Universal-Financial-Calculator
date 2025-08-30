import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import { CURRENCY_MAP } from '../constants';
import { formatForDisplay, parseForCalculation } from '../utils';

const SavingsGoalCalculator: React.FC = () => {
    const { t, language } = useLocalization();
    const [target, setTarget] = useState('');
    const [principal, setPrincipal] = useState('');
    const [years, setYears] = useState('');
    const [rate, setRate] = useState('');
    const [results, setResults] = useState<{ label: string; value: string }[]>([]);
    
    const currency = CURRENCY_MAP[language] || CURRENCY_MAP['en'];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(language, { style: 'currency', currency: currency.code, minimumFractionDigits: 2 }).format(value);
    };

    const calculate = () => {
        const fv = parseFloat(target);
        const pv = parseFloat(principal) || 0;
        const termInYears = parseFloat(years);
        const r = parseFloat(rate) / 100;
        
        if (isNaN(fv) || isNaN(termInYears) || isNaN(r) || fv <= pv) {
            setResults([]);
            return;
        }

        const ratePerMonth = r / 12;
        const months = termInYears * 12;

        const futureValueOfPrincipal = pv * Math.pow(1 + ratePerMonth, months);
        const futureValueOfContributions = fv - futureValueOfPrincipal;
        
        if (futureValueOfContributions <= 0) {
            setResults([{ label: t('monthlyContributionNeeded'), value: formatCurrency(0) }]);
            return;
        }

        const monthlyContribution = futureValueOfContributions / (((Math.pow(1 + ratePerMonth, months) - 1) / ratePerMonth));

        setResults([
            { label: t('monthlyContributionNeeded'), value: formatCurrency(monthlyContribution) },
            { label: t('totalContributions'), value: formatCurrency(pv + (monthlyContribution * months))},
            { label: t('totalInterest'), value: formatCurrency(fv - (pv + (monthlyContribution * months))) }
        ]);
    };

    const reset = () => {
        setTarget('');
        setPrincipal('');
        setYears('');
        setRate('');
        setResults([]);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-800">{t('savingsGoalTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField id="target" label={t('savingsGoal')} value={formatForDisplay(target)} onChange={e => setTarget(parseForCalculation(e.target.value))} unit={currency.symbol} />
                <InputField id="principal" label={t('initialDeposit')} value={formatForDisplay(principal)} onChange={e => setPrincipal(parseForCalculation(e.target.value))} unit={currency.symbol} />
                <InputField id="years" label={t('yearsToSave')} value={years} onChange={e => setYears(parseForCalculation(e.target.value))} />
                <InputField id="rate" label={t('estimatedAnnualRate')} value={rate} onChange={e => setRate(parseForCalculation(e.target.value))} unit="%" />
            </div>
            <div className="mt-6 flex gap-4">
                <button onClick={calculate} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">{t('calculate')}</button>
                <button onClick={reset} className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition-colors">{t('reset')}</button>
            </div>
            <ResultDisplay results={results} language={language} />
        </div>
    );
};

export default SavingsGoalCalculator;
