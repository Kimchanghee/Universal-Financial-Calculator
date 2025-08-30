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

export const CURRENCY_MAP: { [key: string]: { code: string; symbol: string } } = {
    en: { code: 'USD', symbol: '$' },
    ko: { code: 'KRW', symbol: '₩' },
    ja: { code: 'JPY', symbol: '¥' },
    zh: { code: 'CNY', symbol: '¥' },
    es: { code: 'EUR', symbol: '€' },
    pt: { code: 'BRL', symbol: 'R$' },
    th: { code: 'THB', symbol: '฿' },
    vi: { code: 'VND', symbol: '₫' },
};