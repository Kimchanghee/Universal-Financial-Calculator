import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import { CURRENCY_MAP } from '../constants';
import { formatForDisplay, parseForCalculation } from '../utils';

interface MonthlyData {
    month: number;
    interest: number;
    totalContributions: number;
    endBalance: number;
}

const CompoundInterestCalculator: React.FC = () => {
    const { t, language } = useLocalization();
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [months, setMonths] = useState('');
    const [contribution, setContribution] = useState('');
    const [results, setResults] = useState<{ label: string; value: string }[]>([]);
    const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
    
    const currency = CURRENCY_MAP[language] || CURRENCY_MAP['en'];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(language, { style: 'currency', currency: currency.code, minimumFractionDigits: 2 }).format(value);
    };

    const calculate = () => {
        const p = parseForCalculation(principal) ? parseFloat(parseForCalculation(principal)) : 0;
        const annualRate = parseFloat(rate);
        const numMonths = parseInt(months, 10);
        const c = parseForCalculation(contribution) ? parseFloat(parseForCalculation(contribution)) : 0;

        if (isNaN(p) || isNaN(annualRate) || isNaN(numMonths) || numMonths <= 0) {
            setResults([]);
            setMonthlyData([]);
            return;
        }

        const monthlyRate = annualRate / 100 / 12;
        let currentBalance = p;
        let totalInterest = 0;
        const breakdown: MonthlyData[] = [];

        for (let i = 1; i <= numMonths; i++) {
            const interestEarned = currentBalance * monthlyRate;
            currentBalance += interestEarned + c;
            totalInterest += interestEarned;
            
            const cumulativeContributions = p + (c * i);
            
            breakdown.push({
                month: i,
                interest: interestEarned,
                totalContributions: cumulativeContributions,
                endBalance: currentBalance
            });
        }
        
        const finalTotalContributions = p + (c * numMonths);

        setResults([
            { label: t('futureValue'), value: formatCurrency(currentBalance) },
            { label: t('totalContributions'), value: formatCurrency(finalTotalContributions) },
            { label: t('totalInterest'), value: formatCurrency(totalInterest) }
        ]);
        setMonthlyData(breakdown);
    };

    const reset = () => {
        setPrincipal('');
        setRate('');
        setMonths('');
        setContribution('');
        setResults([]);
        setMonthlyData([]);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-800">{t('compoundInterestTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField id="principal" label={t('principal')} value={formatForDisplay(principal)} onChange={e => setPrincipal(parseForCalculation(e.target.value))} unit={currency.symbol} />
                <InputField id="rate" label={t('annualRate')} value={rate} onChange={e => setRate(parseForCalculation(e.target.value))} unit="%" />
                <InputField id="months" label={t('numberOfMonths')} value={months} onChange={e => setMonths(parseForCalculation(e.target.value).replace(/[^0-9]/g, ''))} />
                <InputField id="contribution" label={t('monthlyContribution')} value={formatForDisplay(contribution)} onChange={e => setContribution(parseForCalculation(e.target.value))} unit={currency.symbol} />
            </div>
            <div className="mt-6 flex gap-4">
                <button onClick={calculate} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">{t('calculate')}</button>
                <button onClick={reset} className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition-colors">{t('reset')}</button>
            </div>
            <ResultDisplay results={results} language={language} />

            {monthlyData.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4 text-slate-700">{t('monthlyBreakdown')}</h3>
                    <div className="max-h-96 overflow-auto rounded-lg border border-gray-200 shadow-sm">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-100 text-xs text-gray-700 uppercase sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">{t('month')}</th>
                                    <th scope="col" className="px-6 py-3">{t('monthlyInterest')}</th>
                                    <th scope="col" className="px-6 py-3">{t('totalContributions')}</th>
                                    <th scope="col" className="px-6 py-3">{t('endBalance')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyData.map((data) => (
                                    <tr key={data.month} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{data.month}</td>
                                        <td className="px-6 py-4">{formatCurrency(data.interest)}</td>
                                        <td className="px-6 py-4">{formatCurrency(data.totalContributions)}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">{formatCurrency(data.endBalance)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompoundInterestCalculator;