/**
 * Simple i18n module for Recepturomat.
 *
 * Provides translation functions and React context for internationalization.
 * Supports English (en) and Polish (pl) locales.
 */

import en from './locales/en.json';
import pl from './locales/pl.json';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type Locale = 'en' | 'pl';

type Messages = typeof en;

const messages: Record<Locale, Messages> = { en, pl };

const DEFAULT_LOCALE: Locale = 'pl';
const LOCALE_STORAGE_KEY = 'recepturomat-locale';

/**
 * Get nested value from object by dot-separated path.
 */
function getNestedValue(obj: unknown, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[key];
  }

  return typeof current === 'string' ? current : undefined;
}

/**
 * Replace template variables in string.
 * Example: "Hello {{name}}" with { name: "John" } => "Hello John"
 */
function interpolate(
  text: string,
  params?: Record<string, string | number>
): string {
  if (!params) return text;

  return text.replace(/{{(\w+)}}/g, (_, key) => {
    return params[key]?.toString() ?? `{{${key}}}`;
  });
}

/**
 * Translate function type.
 */
export type TranslateFunction = (
  key: string,
  params?: Record<string, string | number>
) => string;

/**
 * Create translate function for given locale.
 */
export function createTranslate(locale: Locale): TranslateFunction {
  return (key: string, params?: Record<string, string | number>) => {
    const text = getNestedValue(messages[locale], key);
    if (!text) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return interpolate(text, params);
  };
}

/**
 * Get initial locale from localStorage or browser settings.
 */
function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === 'en' || stored === 'pl') return stored;

  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'en' || browserLang === 'pl') return browserLang;

  return DEFAULT_LOCALE;
}

/**
 * I18n context value type.
 */
interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslateFunction;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * I18n provider component.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  }, []);

  const t = useMemo(() => createTranslate(locale), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Hook to use i18n context.
 * Returns translate function and locale management.
 */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

/**
 * Hook to get only translate function.
 * Shortcut for common use case.
 */
export function useTranslation(): TranslateFunction {
  return useI18n().t;
}

/**
 * Available locales for language switcher.
 */
export const AVAILABLE_LOCALES: { code: Locale; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polski' },
];


