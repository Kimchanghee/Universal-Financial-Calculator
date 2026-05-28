import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useLocalization, LocalizationProvider } from './hooks/useLocalization';
import { CalculatorType, PageType, SUPPORTED_LANGUAGES } from './constants';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import CompoundInterestCalculator from './components/CompoundInterestCalculator';
import SimpleInterestCalculator from './components/SimpleInterestCalculator';
import SavingsGoalCalculator from './components/SavingsGoalCalculator';
import RoiCalculator from './components/RoiCalculator';
import LoanCalculator from './components/LoanCalculator';
import RetirementCalculator from './components/RetirementCalculator';
import InflationCalculator from './components/InflationCalculator';
import TipCalculator from './components/TipCalculator';
import BreakEvenPointCalculator from './components/BreakEvenPointCalculator';
import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import ContactUs from './components/ContactUs';
import FAQ from './components/FAQ';
import ExposureLinks from './components/ExposureLinks';
import SafeInlineSponsored from './components/SafeInlineSponsored';
import { getSeoData } from './seo';
import type { SeoData } from './types';

const CALCULATOR_SLUGS: Record<CalculatorType, string> = {
    [CalculatorType.COMPOUND_INTEREST]: 'compound-interest',
    [CalculatorType.SIMPLE_INTEREST]: 'simple-interest',
    [CalculatorType.SAVINGS_GOAL]: 'savings-goal',
    [CalculatorType.ROI]: 'roi',
    [CalculatorType.LOAN]: 'loan',
    [CalculatorType.RETIREMENT]: 'retirement',
    [CalculatorType.INFLATION]: 'inflation',
    [CalculatorType.TIP]: 'tip',
    [CalculatorType.BREAK_EVEN]: 'break-even',
};

const CALCULATOR_BY_SLUG: Record<string, CalculatorType> = Object.entries(CALCULATOR_SLUGS).reduce(
    (acc, [calculatorType, slug]) => {
        acc[slug] = calculatorType as CalculatorType;
        acc[calculatorType] = calculatorType as CalculatorType;
        return acc;
    },
    {} as Record<string, CalculatorType>,
);

const GUIDE_LINKS = [
    { name: 'Compound interest formula', url: 'https://finoracalc.tech/guides/compound-interest-formula.html' },
    { name: 'ROI formula', url: 'https://finoracalc.tech/guides/roi-formula.html' },
    { name: 'Loan payment formula', url: 'https://finoracalc.tech/guides/loan-payment-formula.html' },
    { name: 'Retirement savings goal', url: 'https://finoracalc.tech/guides/retirement-savings-goal.html' },
    { name: 'Inflation purchasing power', url: 'https://finoracalc.tech/guides/inflation-purchasing-power.html' },
];

const getInitialCalculator = (): CalculatorType => {
    if (typeof window === 'undefined') return CalculatorType.COMPOUND_INTEREST;
    const calculatorParam = new URLSearchParams(window.location.search).get('calculator');
    return calculatorParam ? CALCULATOR_BY_SLUG[calculatorParam] ?? CalculatorType.COMPOUND_INTEREST : CalculatorType.COMPOUND_INTEREST;
};

const getCanonicalPageUrl = (language: string, calculator: CalculatorType): string => {
    const url = new URL('/', 'https://finoracalc.tech');
    url.searchParams.set('calculator', CALCULATOR_SLUGS[calculator]);
    url.searchParams.set('lang', language);
    return url.toString();
};

const createStructuredDataGraph = (
    seoData: SeoData,
    language: string,
    calculator: CalculatorType,
    pageUrl: string,
): object => ({
    '@context': 'https://schema.org',
    '@graph': [
        {
            ...(seoData.structuredData as Record<string, unknown>),
            '@id': `${pageUrl}#software`,
            url: pageUrl,
            inLanguage: language,
        },
        {
            '@type': 'WebPage',
            '@id': `${pageUrl}#webpage`,
            url: pageUrl,
            name: seoData.title,
            description: seoData.description,
            inLanguage: language,
        },
        {
            '@type': 'FAQPage',
            '@id': `${pageUrl}#faq`,
            mainEntity: [
                {
                    '@type': 'Question',
                    name: 'How do I calculate compound interest?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Use principal, interest rate, compounding frequency, time, and optional recurring deposits to estimate future value.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'How do I calculate ROI?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Subtract investment cost from final value, divide by cost, then multiply by 100 to get return on investment percentage.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'How do I calculate a loan payment?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Use loan amount, periodic interest rate, and number of payments to estimate the fixed monthly payment.',
                    },
                },
            ],
        },
        {
            '@type': 'ItemList',
            '@id': 'https://finoracalc.tech/#answer-guides',
            name: 'Financial calculator answer guides',
            itemListElement: GUIDE_LINKS.map((guide, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: guide.name,
                url: guide.url,
            })),
        },
        {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Finora',
                    item: 'https://finoracalc.tech/',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: CALCULATOR_SLUGS[calculator],
                    item: pageUrl,
                },
            ],
        },
    ],
});

const AppContent: React.FC = () => {
    const { t, setLanguage, language, isLoading } = useLocalization();
    const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(getInitialCalculator);
    const [activePage, setActivePage] = useState<PageType>(PageType.CALCULATORS);

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
        
        const pageUrl = getCanonicalPageUrl(language, activeCalculator);
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('calculator', CALCULATOR_SLUGS[activeCalculator]);
        currentUrl.searchParams.set('lang', language);
        window.history.replaceState({}, '', `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);

        setMetaTag('meta[name="description"]', seoData.description);
        setMetaTag('meta[name="keywords"]', seoData.keywords);
        setMetaTag('link[rel="canonical"]', pageUrl, 'href');

        setMetaTag('meta[property="og:title"]', seoData.title);
        setMetaTag('meta[property="og:description"]', seoData.description);
        setMetaTag('meta[property="og:url"]', pageUrl);
        
        setMetaTag('meta[name="twitter:title"]', seoData.title);
        setMetaTag('meta[name="twitter:description"]', seoData.description);
        setMetaTag('meta[name="twitter:url"]', pageUrl);

        const structuredDataScript = document.getElementById('structured-data');
        if (structuredDataScript) {
            structuredDataScript.innerHTML = JSON.stringify(
                createStructuredDataGraph(seoData, language, activeCalculator, pageUrl),
            );
        }

    }, [language, activeCalculator]);

    const navItems = useMemo(() => [
        { key: CalculatorType.COMPOUND_INTEREST, label: t('compoundInterestTitle'), icon: '📈', color: 'from-emerald-500 to-teal-600' },
        { key: CalculatorType.SIMPLE_INTEREST, label: t('simpleInterestTitle'), icon: '💰', color: 'from-blue-500 to-cyan-600' },
        { key: CalculatorType.SAVINGS_GOAL, label: t('savingsGoalTitle'), icon: '🎯', color: 'from-purple-500 to-pink-600' },
        { key: CalculatorType.ROI, label: t('roiTitle'), icon: '📊', color: 'from-orange-500 to-amber-600' },
        { key: CalculatorType.LOAN, label: t('loanTitle'), icon: '🏠', color: 'from-indigo-500 to-blue-600' },
        { key: CalculatorType.RETIREMENT, label: t('retirementTitle'), icon: '🌅', color: 'from-rose-500 to-red-600' },
        { key: CalculatorType.INFLATION, label: t('inflationTitle'), icon: '📉', color: 'from-slate-500 to-gray-600' },
        { key: CalculatorType.TIP, label: t('tipTitle'), icon: '🍽️', color: 'from-lime-500 to-green-600' },
        { key: CalculatorType.BREAK_EVEN, label: t('breakEvenTitle'), icon: '⚖️', color: 'from-violet-500 to-purple-600' },
    ], [t]);

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

    const renderPage = useCallback(() => {
        switch (activePage) {
            case PageType.CALCULATORS:
                return (
                    <>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <span className="text-3xl">🧮</span>
                                {t('selectCalculator')}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                {navItems.map(item => (
                                    <button
                                        key={item.key}
                                        onClick={() => setActiveCalculator(item.key as CalculatorType)}
                                        className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                                            activeCalculator === item.key
                                                ? 'bg-gradient-to-br shadow-xl ring-4 ring-red-500/50'
                                                : 'bg-white shadow-md hover:shadow-xl'
                                        }`}
                                        aria-label={item.label}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                                        <div className="relative flex flex-col items-start gap-3">
                                            <div className={`text-4xl w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                                                <span className="text-white filter drop-shadow-md">{item.icon}</span>
                                            </div>
                                            <h3 className="font-bold text-base text-slate-800 leading-tight">
                                                {item.label}
                                            </h3>
                                        </div>
                                        {activeCalculator === item.key && (
                                            <div className="absolute top-3 right-3">
                                                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-rose-600 animate-pulse shadow-lg"></div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-8"></div>
                        {renderCalculator()}
                        <SafeInlineSponsored />
                    </>
                );
            case PageType.ABOUT_US:
                return <AboutUs />;
            case PageType.PRIVACY_POLICY:
                return <PrivacyPolicy />;
            case PageType.CONTACT_US:
                return <ContactUs />;
            case PageType.FAQ:
                return <FAQ />;
            default:
                return null;
        }
    }, [activePage, activeCalculator, renderCalculator, navItems, t]);

    // Show loading screen while translations are loading
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-100 font-['Inter',sans-serif] text-slate-800">
            <div className="relative flex justify-center">
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

                    <main className="px-6 py-8">
                        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-slate-200/50 p-8 md:p-10 transition-all duration-500 hover:shadow-3xl hover:border-red-200/50">
                            {renderPage()}
                        </div>
                        <ExposureLinks />
                    </main>

                    <footer className="px-6 py-10 text-center">
                        <nav className="mt-6 mb-4">
                            <div className="flex flex-wrap justify-center gap-4 text-sm">
                                <button
                                    onClick={() => setActivePage(PageType.CALCULATORS)}
                                    className={`hover:text-red-600 transition-colors ${activePage === PageType.CALCULATORS ? 'text-red-600 font-semibold' : 'text-slate-600'}`}
                                >
                                    {t('navCalculators')}
                                </button>
                                <span className="text-slate-300">|</span>
                                <button
                                    onClick={() => setActivePage(PageType.ABOUT_US)}
                                    className={`hover:text-red-600 transition-colors ${activePage === PageType.ABOUT_US ? 'text-red-600 font-semibold' : 'text-slate-600'}`}
                                >
                                    {t('navAboutUs')}
                                </button>
                                <span className="text-slate-300">|</span>
                                <button
                                    onClick={() => setActivePage(PageType.PRIVACY_POLICY)}
                                    className={`hover:text-red-600 transition-colors ${activePage === PageType.PRIVACY_POLICY ? 'text-red-600 font-semibold' : 'text-slate-600'}`}
                                >
                                    {t('navPrivacyPolicy')}
                                </button>
                                <span className="text-slate-300">|</span>
                                <button
                                    onClick={() => setActivePage(PageType.CONTACT_US)}
                                    className={`hover:text-red-600 transition-colors ${activePage === PageType.CONTACT_US ? 'text-red-600 font-semibold' : 'text-slate-600'}`}
                                >
                                    {t('navContactUs')}
                                </button>
                                <span className="text-slate-300">|</span>
                                <button
                                    onClick={() => setActivePage(PageType.FAQ)}
                                    className={`hover:text-red-600 transition-colors ${activePage === PageType.FAQ ? 'text-red-600 font-semibold' : 'text-slate-600'}`}
                                >
                                    {t('navFAQ')}
                                </button>
                            </div>
                        </nav>
                        <div className="mt-6 space-y-2">
                            <p className="text-sm font-semibold text-slate-600">&copy; {new Date().getFullYear()} Finora</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                <span>Sister Sites:</span>
                <a href="https://econo-jabis-web.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">EconoJabis News</a>
                <span>|</span>
                <a href="https://creator-hub-iota.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">Creator Hub</a>
                <span>|</span>
                <a href="https://howmuchis.info" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">HowMuchIs</a>
                <span>|</span>
                <a href="https://profitcalc.tech" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">Coin Profit Calculator</a>
              </div>
                        </div>
                    </footer>
                </div>

            </div>
        </div>
    );
};


const App: React.FC = () => (
    <ErrorBoundary>
        <LocalizationProvider>
            <AppContent />
        </LocalizationProvider>
    </ErrorBoundary>
);

export default App;
