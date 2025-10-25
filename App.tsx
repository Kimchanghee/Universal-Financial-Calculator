import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useLocalization, LocalizationProvider } from './hooks/useLocalization';
import { CalculatorType, SUPPORTED_LANGUAGES } from './constants';
import CompoundInterestCalculator from './components/CompoundInterestCalculator';
import SimpleInterestCalculator from './components/SimpleInterestCalculator';
import SavingsGoalCalculator from './components/SavingsGoalCalculator';
import RoiCalculator from './components/RoiCalculator';
import LoanCalculator from './components/LoanCalculator';
import RetirementCalculator from './components/RetirementCalculator';
import InflationCalculator from './components/InflationCalculator';
import TipCalculator from './components/TipCalculator';
import BreakEvenPointCalculator from './components/BreakEvenPointCalculator';
import AdBanner from './components/AdBanner';
import { getSeoData } from './seo';

const AppContent: React.FC = () => {
    const { t, setLanguage, language } = useLocalization();
    const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(CalculatorType.COMPOUND_INTEREST);

    useEffect(() => {
        const seoData = getSeoData(language, activeCalculator);

        document.title = seoData.title;
        document.documentElement.lang = language;

        const setMetaTag = (selector: string, content: string, attr = 'content') => {
            let element = document.querySelector(selector) as HTMLElement | null;
            if (element) {
                element.setAttribute(attr, content);
            }
        };
        
        const pageUrl = window.location.origin + window.location.pathname;

        setMetaTag('meta[name="description"]', seoData.description);
        setMetaTag('meta[name="keywords"]', seoData.keywords);
        setMetaTag('link[rel="canonical"]', pageUrl, 'href');

        setMetaTag('meta[property="og:title"]', seoData.title);
        setMetaTag('meta[property="og:description"]', seoData.description);
        setMetaTag('meta[property="og:url"]', pageUrl);
        
        setMetaTag('meta[property="twitter:title"]', seoData.title);
        setMetaTag('meta[property="twitter:description"]', seoData.description);
        setMetaTag('meta[property="twitter:url"]', pageUrl);

        const structuredDataScript = document.getElementById('structured-data');
        if (structuredDataScript) {
            structuredDataScript.innerHTML = JSON.stringify(seoData.structuredData);
        }

    }, [language, activeCalculator]);

    const renderCalculator = useCallback(() => {
        switch (activeCalculator) {
            case CalculatorType.COMPOUND_INTEREST:
                return <CompoundInterestCalculator />;
            case CalculatorType.SIMPLE_INTEREST:
                return <SimpleInterestCalculator />;
            case CalculatorType.SAVINGS_GOAL:
                return <SavingsGoalCalculator />;
            case CalculatorType.ROI:
                return <RoiCalculator />;
            case CalculatorType.LOAN:
                return <LoanCalculator />;
            case CalculatorType.RETIREMENT:
                return <RetirementCalculator />;
            case CalculatorType.INFLATION:
                return <InflationCalculator />;
            case CalculatorType.TIP:
                return <TipCalculator />;
            case CalculatorType.BREAK_EVEN:
                return <BreakEvenPointCalculator />;
            default:
                return <CompoundInterestCalculator />;
        }
    }, [activeCalculator]);

    const navItems = useMemo(() => [
        { key: CalculatorType.COMPOUND_INTEREST, label: t('compoundInterestTitle') },
        { key: CalculatorType.SIMPLE_INTEREST, label: t('simpleInterestTitle') },
        { key: CalculatorType.SAVINGS_GOAL, label: t('savingsGoalTitle') },
        { key: CalculatorType.ROI, label: t('roiTitle') },
        { key: CalculatorType.LOAN, label: t('loanTitle') },
        { key: CalculatorType.RETIREMENT, label: t('retirementTitle') },
        { key: CalculatorType.INFLATION, label: t('inflationTitle') },
        { key: CalculatorType.TIP, label: t('tipTitle') },
        { key: CalculatorType.BREAK_EVEN, label: t('breakEvenTitle') },
    ], [t]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans text-slate-800">
            <div className="relative flex justify-center">
                {/* Left Ad Banner */}
                <aside className="sticky top-0 h-screen hidden xl:flex w-48 flex-shrink-0 items-center justify-center px-4" aria-label={t('adLabel')}>
                    <AdBanner slot="4444444444" width="w-40" height="h-[600px]" size="160x600" label={t('adLabel')} />
                </aside>

                {/* Main Content */}
                <div className="w-full max-w-4xl flex-grow">
                    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50">
                        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{t('appTitle')}</h1>
                            <div className="relative">
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="appearance-none bg-white border-2 border-gray-200 hover:border-blue-400 rounded-lg py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                                    aria-label={t('selectLanguage')}
                                >
                                    {SUPPORTED_LANGUAGES.map(lang => (
                                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="px-4 py-2">
                        <AdBanner slot="1111111111" width="w-full" height="h-24" size="728x90" label={t('adLabel')} />
                    </div>

                    <main className="px-4 py-6">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
                            <div className="mb-8">
                                <label htmlFor="calculator-select" className="block text-sm font-semibold text-gray-700 mb-3">{t('selectCalculator')}</label>
                                <div className="relative">
                                    <select
                                        id="calculator-select"
                                        value={activeCalculator}
                                        onChange={(e) => setActiveCalculator(e.target.value as CalculatorType)}
                                        className="w-full appearance-none bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-gray-200 hover:border-blue-400 rounded-xl py-3 px-4 pr-10 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                                        aria-label={t('selectCalculator')}
                                    >
                                        {navItems.map(item => (
                                            <option key={item.key} value={item.key}>{item.label}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-600">
                                        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <hr className="mb-8 border-gray-200" />
                            {renderCalculator()}
                        </div>
                        <div className="mt-8">
                            <AdBanner slot="2222222222" width="w-full" height="h-64" size="336x280" label={t('adLabel')} />
                        </div>
                    </main>

                    <footer className="px-4 py-8 text-center text-slate-500">
                        <AdBanner slot="3333333333" width="w-full" height="h-24" size="728x90" label={t('adLabel')} />
                        <p className="mt-4 text-sm font-medium">&copy; 2024 Universal Financial Calculator. All rights reserved.</p>
                        <p className="mt-2 text-xs text-slate-400">Empowering financial decisions worldwide</p>
                    </footer>
                </div>

                {/* Right Ad Banner */}
                <aside className="sticky top-0 h-screen hidden xl:flex w-48 flex-shrink-0 items-center justify-center px-4" aria-label={t('adLabel')}>
                    <AdBanner slot="5555555555" width="w-40" height="h-[600px]" size="160x600" label={t('adLabel')} />
                </aside>
            </div>
        </div>
    );
};


const App: React.FC = () => (
    <LocalizationProvider>
        <AppContent />
    </LocalizationProvider>
);

export default App;
