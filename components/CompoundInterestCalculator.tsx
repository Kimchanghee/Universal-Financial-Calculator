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
            <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-slate-800 via-red-700 to-rose-700 bg-clip-text text-transparent">{t('compoundInterestTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <InputField id="principal" label={t('principal')} value={formatForDisplay(principal)} onChange={e => setPrincipal(parseForCalculation(e.target.value))} unit={currency.symbol} />
                <InputField id="rate" label={t('annualRate')} value={rate} onChange={e => setRate(parseForCalculation(e.target.value))} unit="%" />
                <InputField id="months" label={t('numberOfMonths')} value={months} onChange={e => setMonths(parseForCalculation(e.target.value).replace(/[^0-9]/g, ''))} />
                <InputField id="contribution" label={t('monthlyContribution')} value={formatForDisplay(contribution)} onChange={e => setContribution(parseForCalculation(e.target.value))} unit={currency.symbol} />
            </div>
            <div className="mt-8 flex gap-4">
                <button
                    onClick={calculate}
                    className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold py-4 px-6 rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transform"
                >
                    ✨ {t('calculate')}
                </button>
                <button
                    onClick={reset}
                    className="flex-1 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 font-bold py-4 px-6 rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transform border-2 border-slate-300"
                >
                    🔄 {t('reset')}
                </button>
            </div>
            <ResultDisplay results={results} language={language} />

            {monthlyData.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-2xl font-bold mb-5 bg-gradient-to-r from-slate-700 to-red-700 bg-clip-text text-transparent flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        {t('monthlyBreakdown')}
                    </h3>
                    <div className="max-h-96 overflow-auto rounded-2xl border-2 border-slate-200 shadow-xl">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gradient-to-r from-slate-100 to-red-50 text-xs font-bold text-slate-700 uppercase sticky top-0 border-b-2 border-slate-200">
                                <tr>
                                    <th scope="col" className="px-6 py-4">{t('month')}</th>
                                    <th scope="col" className="px-6 py-4">{t('monthlyInterest')}</th>
                                    <th scope="col" className="px-6 py-4">{t('totalContributions')}</th>
                                    <th scope="col" className="px-6 py-4">{t('endBalance')}</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600">
                                {monthlyData.map((data, index) => (
                                    <tr
                                        key={data.month}
                                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} border-b border-slate-100 hover:bg-red-50/50 transition-colors duration-200`}
                                    >
                                        <td className="px-6 py-4 font-bold text-slate-900">{data.month}</td>
                                        <td className="px-6 py-4 font-medium">{formatCurrency(data.interest)}</td>
                                        <td className="px-6 py-4 font-medium">{formatCurrency(data.totalContributions)}</td>
                                        <td className="px-6 py-4 font-bold text-red-700">{formatCurrency(data.endBalance)}</td>
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