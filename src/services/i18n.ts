import type { LanguageCode } from '../types/language'

/**
 * Interface for the i18n translator instance
 */
export interface Translator {
  /** Current locale code */
  locale: LanguageCode | string
  /**
   * Translate a key to the current locale
   * @param key - Translation key
   * @param params - Optional interpolation parameters
   * @returns Translated string
   */
  t: (key: string, params?: Record<string, unknown>) => string
}

let i18n: Translator | undefined = undefined

/**
 * Get the current i18n instance
 * @throws Error if i18n is not initialized
 */
function useI18nInstance(): Translator {
  if (!i18n) {
    throw new Error('i18n instance not initialized. Call setI18nInstance first.')
  }
  return i18n
}

/**
 * Set the i18n instance for global use
 * @param instance - The translator instance to set
 */
function setI18nInstance(instance: Translator): void {
  i18n = instance
}

export { setI18nInstance, useI18nInstance }
