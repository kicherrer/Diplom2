'use client';

import { useTranslation } from 'react-i18next';

export function I18nContent({ text }: { text: string }) {
  const { t } = useTranslation();
  return <>{t(text)}</>;
}
