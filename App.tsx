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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-100 font-['Inter',sans-serif] text-slate-800">
            <div className="relative flex justify-center">
                {/* Left Ad Banner */}
                <aside className="sticky top-0 h-screen hidden xl:flex w-48 flex-shrink-0 items-center justify-center px-4" aria-label={t('adLabel')}>
                    <AdBanner slot="4444444444" width="w-40" height="h-[600px]" size="160x600" label={t('adLabel')} />
                </aside>

                {/* Main Content */}
                <div className="w-full max-w-5xl flex-grow">
                    <header className="bg-white/90 backdrop-blur-xl shadow-2xl border-b-2 border-red-100/50 sticky top-0 z-50">
                        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-2xl">📈</span>
                                </div>
                                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    {t('appTitle')}
                                </h1>
                            </div>
                            <div className="relative">
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="appearance-none bg-gradient-to-r from-white to-red-50 border-2 border-slate-200 hover:border-red-400 rounded-xl py-2.5 px-5 pr-10 font-semibold focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 shadow-sm hover:shadow-lg"
                                    aria-label={t('selectLanguage')}
                                >
                                    {SUPPORTED_LANGUAGES.map(lang => (
                                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-red-600">
                                    <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="px-4 py-2">
                        <AdBanner slot="1111111111" width="w-full" height="h-24" size="728x90" label={t('adLabel')} />
                    </div>

                    <main className="px-6 py-8">
                        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-slate-200/50 p-8 md:p-10 transition-all duration-500 hover:shadow-3xl hover:border-red-200/50">
                            <div className="mb-8">
                                <label htmlFor="calculator-select" className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                                    <span className="text-lg">🧮</span>
                                    {t('selectCalculator')}
                                </label>
                                <div className="relative group">
                                    <select
                                        id="calculator-select"
                                        value={activeCalculator}
                                        onChange={(e) => setActiveCalculator(e.target.value as CalculatorType)}
                                        className="w-full appearance-none bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 border-2 border-slate-200 hover:border-red-400 rounded-2xl py-4 px-5 pr-12 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                                        aria-label={t('selectCalculator')}
                                    >
                                        {navItems.map(item => (
                                            <option key={item.key} value={item.key}>{item.label}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-red-600 group-hover:text-rose-600 transition-colors">
                                        <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-8"></div>
                            {renderCalculator()}
                        </div>
                        <div className="mt-8">
                            <AdBanner slot="2222222222" width="w-full" height="h-64" size="336x280" label={t('adLabel')} />
                        </div>
                    </main>

                    <footer className="px-6 py-10 text-center">
                        <AdBanner slot="3333333333" width="w-full" height="h-24" size="728x90" label={t('adLabel')} />
                        <div className="mt-6 space-y-2">
                            <p className="text-sm font-semibold text-slate-600">&copy; 2024 Universal Financial Calculator. All rights reserved.</p>
                            <p className="text-xs text-slate-400 font-medium">Empowering financial decisions worldwide 🌍</p>
                        </div>
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
