import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Translations } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';

interface LocalizationContextType {
    language: string;
    setLanguage: (language: string) => void;
    translations: Translations;
    t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<string>('ko');
    const [translations, setTranslations] = useState<Translations>({});

    useEffect(() => {
        const browserLang = navigator.language.split('-')[0];
        const defaultLang = SUPPORTED_LANGUAGES.some(lang => lang.code === browserLang) ? browserLang : 'ko';
        setLanguageState(defaultLang);
    }, []);

    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const response = await fetch(`/locales/${language}.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTranslations(data);
            } catch (error) {
                console.error(`Could not load translations for ${language}`, error);
                // Fallback to English
                try {
                    const response = await fetch('/locales/en.json');
                     if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
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

    const setLanguage = useCallback((lang: string) => {
        setLanguageState(lang);
    }, []);
    
    const t = useCallback((key: string): string => {
        return translations[key] || key;
    }, [translations]);

    const value = useMemo(() => ({
        language,
        setLanguage,
        translations,
        t,
    }), [language, translations, t]);

    // FIX: Replaced JSX with React.createElement to be compatible with .ts file extension.
    return React.createElement(LocalizationContext.Provider, {
        value
    }, children);
};

export const useLocalization = (): LocalizationContextType => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error('useLocalization must be used within a LocalizationProvider');
    }
    return context;
};
