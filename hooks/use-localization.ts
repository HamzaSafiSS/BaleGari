import { useMemo } from 'react';
import am from '../locales/am.json';
import en from '../locales/en.json';
import om from '../locales/om.json';

const LOCALES: Record<string, any> = { en, am, om };

export function useLocalization(locale: string = 'en') {
  return useMemo(() => {
    const strings = LOCALES[locale] || en;
    return {
      t: (key: string) => strings[key] || key,
    };
  }, [locale]);
}
