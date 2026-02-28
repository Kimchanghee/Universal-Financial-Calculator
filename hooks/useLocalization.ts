import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Translations } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';

interface LocalizationContextType {
    language: string;
    setLanguage: (language: string) => void;
    t: (key: string) => string;
    isLoading: boolean;
    error: string | null;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

const getInitialLanguage = (): string => {
    if (typeof window === 'undefined') return 'ko';
    
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && SUPPORTED_LANGUAGES.some(lang => lang.code === langParam)) {
        return langParam;
    }
    
    // Check localStorage
    const storedLang = localStorage.getItem('finora-language');
    if (storedLang && SUPPORTED_LANGUAGES.some(lang => lang.code === storedLang)) {
        return storedLang;
    }
    
    // Use browser language
    const browserLang = navigator.language.split('-')[0];
    return SUPPORTED_LANGUAGES.some(lang => lang.code === browserLang) ? browserLang : 'ko';
};

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<string>(getInitialLanguage);
    const [translations, setTranslations] = useState<Translations>({});
    const [fallbackTranslations, setFallbackTranslations] = useState<Translations>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const setLanguage = useCallback((newLanguage: string) => {
        if (SUPPORTED_LANGUAGES.some(lang => lang.code === newLanguage)) {
            setLanguageState(newLanguage);
            localStorage.setItem('finora-language', newLanguage);
            
            // Update URL parameter without reloading
            const url = new URL(window.location.href);
            url.searchParams.set('lang', newLanguage);
            window.history.replaceState({}, '', url.toString());
        }
    }, []);

    useEffect(() => {
        const loadLocale = async (locale: string): Promise<Translations> => {
            const response = await fetch(`/locales/${locale}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.json() as Promise<Translations>;
        };

        const loadTranslations = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const fallback = await loadLocale('en');
                setFallbackTranslations(fallback);

                if (language === 'en') {
                    setTranslations(fallback);
                    return;
                }

                const data = await loadLocale(language);
                const fallbackKeys = Object.keys(fallback);
                const hasAllKeys = fallbackKeys.every(key => typeof data[key] === 'string');

                if (!hasAllKeys) {
                    setError(`Translations for ${language} are incomplete. Falling back to English.`);
                    setTranslations(fallback);
                    return;
                }

                setTranslations(data);
            } catch (error) {
                console.error(`Could not load translations for ${language}`, error);
                setError(`Failed to load translations for ${language}`);
                
                // Try fallback to English
                try {
                    const data = await loadLocale('en');
                    setFallbackTranslations(data);
                    setTranslations(data);
                    setError(null); // Clear error if fallback succeeds
                } catch (fallbackError) {
                    console.error('Could not load fallback English translations.', fallbackError);
                    setFallbackTranslations({});
                    setTranslations({});
                }
            } finally {
                setIsLoading(false);
            }
        };
        
        loadTranslations();
    }, [language]);

    const t = useCallback((key: string): string => {
        return translations[key] || fallbackTranslations[key] || key;
    }, [translations, fallbackTranslations]);

    const memoizedValue = useMemo(() => ({
        language,
        setLanguage,
        t,
        isLoading,
        error,
    }), [language, t, isLoading, error, setLanguage]);

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
