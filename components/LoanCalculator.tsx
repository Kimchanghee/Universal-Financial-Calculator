import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import { CURRENCY_MAP } from '../constants';
import { formatForDisplay, parseForCalculation } from '../utils';

const LoanCalculator: React.FC = () => {
    const { t, language } = useLocalization();
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [results, setResults] = useState<{ label: string; value: string }[]>([]);

    const currency = CURRENCY_MAP[language] || CURRENCY_MAP['en'];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(language, { style: 'currency', currency: currency.code, minimumFractionDigits: 2 }).format(value);
    };

    const calculate = () => {
        const principal = parseFloat(parseForCalculation(loanAmount));
        const annualRate = parseFloat(parseForCalculation(interestRate));
        const years = parseFloat(parseForCalculation(loanTerm));

        if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0 || annualRate <= 0 || years <= 0) {
            setResults([]);
            return;
        }

        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = years * 12;

        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - principal;

        setResults([
            { label: t('monthlyPayment'), value: formatCurrency(monthlyPayment) },
            { label: t('totalPayment'), value: formatCurrency(totalPayment) },
            { label: t('totalInterestPaid'), value: formatCurrency(totalInterest) },
        ]);
    };

    const reset = () => {
        setLoanAmount('');
        setInterestRate('');
        setLoanTerm('');
        setResults([]);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-800">{t('loanTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField id="loanAmount" label={t('loanAmount')} value={formatForDisplay(loanAmount)} onChange={e => setLoanAmount(e.target.value)} unit={currency.symbol} />
                <InputField id="interestRate" label={t('annualRate')} value={interestRate} onChange={e => setInterestRate(parseForCalculation(e.target.value))} unit="%" />
                <InputField id="loanTerm" label={t('loanTermInYears')} value={loanTerm} onChange={e => setLoanTerm(parseForCalculation(e.target.value))} unit={t('yearsUnit')} />
            </div>
            <div className="mt-6 flex gap-4">
                <button onClick={calculate} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">{t('calculate')}</button>
                <button onClick={reset} className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition-colors">{t('reset')}</button>
            </div>
            <ResultDisplay results={results} language={language} />
        </div>
    );
};

export default LoanCalculator;