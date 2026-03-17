/** Supported language codes */
export type LanguageCode = 'en' | 'es'

/** Array of supported language codes */
export const SUPPORTED_LANGUAGES: readonly LanguageCode[] = ['en', 'es'] as const

/** Default language code */
export const DEFAULT_LANGUAGE: LanguageCode = 'en'

/** Language display names mapped by code */
export type LanguageNameMap = Record<LanguageCode, string>

/** Language configuration */
export interface LanguageConfig {
  code: LanguageCode
  name: string
  nativeName: string
}

export const LANGUAGE_CONFIGS: readonly LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
] as const

/**
 * Type guard to check if a string is a valid language code
 */
export function isLanguageCode(value: string): value is LanguageCode {
  return SUPPORTED_LANGUAGES.includes(value as LanguageCode)
}
