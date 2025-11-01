import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Translations } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';

interface LocalizationContextType {
    language: string;
    setLanguage: (language: string) => void;
    t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

const getInitialLanguage = (): string => {
    if (typeof window === 'undefined') return 'ko';
    const browserLang = navigator.language.split('-')[0];
    return SUPPORTED_LANGUAGES.some(lang => lang.code === browserLang) ? browserLang : 'ko';
};

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<string>(getInitialLanguage);
    const [translations, setTranslations] = useState<Translations>({});

    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const response = await fetch(`/locales/${language}.json`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setTranslations(data);
            } catch (error) {
                console.error(`Could not load translations for ${language}`, error);
                try {
                    const response = await fetch('/locales/en.json');
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const data = await response.json();
                    setTranslations(data);
                } catch (fallbackError) {
                    console.error('Could not load fallback English translations.', fallbackError);
                    setTranslations({});
                }
            }
        };
        loadTranslations();
    }, [language]);

    const t = useCallback((key: string): string => {
        return translations[key] || key;
    }, [translations]);

    const memoizedValue = useMemo(() => ({
        language,
        setLanguage,
        t,
    }), [language, t]);

    return React.createElement(LocalizationContext.Provider, {
        value: memoizedValue
    }, children);
};

export const useLocalization = (): LocalizationContextType => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error('useLocalization must be used within a LocalizationProvider');
    }
    return context;
};
