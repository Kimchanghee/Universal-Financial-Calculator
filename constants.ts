import type { Language } from './types';

export const SUPPORTED_LANGUAGES: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'ko', name: '한국어' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' },
    { code: 'es', name: 'Español' },
    { code: 'pt', name: 'Português' },
    { code: 'th', name: 'ไทย' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'pl', name: 'Polski' },
];

export enum CalculatorType {
    COMPOUND_INTEREST = 'compound',
    SIMPLE_INTEREST = 'simple',
    SAVINGS_GOAL = 'savings',
    ROI = 'roi',
    LOAN = 'loan',
    RETIREMENT = 'retirement',
    INFLATION = 'inflation',
    TIP = 'tip',
    BREAK_EVEN = 'break_even',
}

export enum PageType {
    CALCULATORS = 'calculators',
    ABOUT_US = 'about',
    PRIVACY_POLICY = 'privacy',
    CONTACT_US = 'contact',
    FAQ = 'faq',
}

export const CURRENCY_MAP: { [key: string]: { code: string; symbol: string } } = {
    en: { code: 'USD', symbol: '$' },
    ko: { code: 'KRW', symbol: '₩' },
    ja: { code: 'JPY', symbol: '¥' },
    zh: { code: 'CNY', symbol: '¥' },
    es: { code: 'EUR', symbol: '€' },
    pt: { code: 'BRL', symbol: 'R$' },
    th: { code: 'THB', symbol: '฿' },
    vi: { code: 'VND', symbol: '₫' },
    fr: { code: 'EUR', symbol: '€' },
    de: { code: 'EUR', symbol: '€' },
    it: { code: 'EUR', symbol: '€' },
    ru: { code: 'RUB', symbol: '₽' },
    ar: { code: 'SAR', symbol: 'ر.س' },
    hi: { code: 'INR', symbol: '₹' },
    id: { code: 'IDR', symbol: 'Rp' },
    nl: { code: 'EUR', symbol: '€' },
    tr: { code: 'TRY', symbol: '₺' },
    pl: { code: 'PLN', symbol: 'zł' },
};