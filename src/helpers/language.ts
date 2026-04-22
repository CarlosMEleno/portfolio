import { readCookie, setPermanentCookie } from '../services/cookie_helper'
import { useI18nInstance } from '../services/i18n'
import {
  type LanguageCode,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  isLanguageCode,
} from '../types/language'

/**
 * Evaluate and return the user's preferred language
 * Checks cookie first, then browser language, defaults to 'en'
 */
export function evalUserLang(): LanguageCode {
  const cookieLang = readCookie('__lang__')

  if (cookieLang !== null && isLanguageCode(cookieLang)) {
    return cookieLang
  }

  const browserLang = navigator.language.substring(0, 2).toLowerCase()
  return isLanguageCode(browserLang) ? browserLang : DEFAULT_LANGUAGE
}

/**
 * Change the application language
 * Updates HTML lang attribute, i18n locale, and cookie
 */
export function changeLang(lang: LanguageCode): void {
  changeLangCodeOnHTMLRootTag(lang)
  changeLocaleOnI18n(lang)
  changeLangInXSelectedLangCookie(lang)
}

/**
 * Update the HTML root element's lang attribute
 */
export function changeLangCodeOnHTMLRootTag(lang: LanguageCode): void {
  document.documentElement.setAttribute('lang', lang)
}

function changeLocaleOnI18n(lang: LanguageCode): void {
  // In composition mode (legacy: false), i18n.global.locale is a WritableComputedRef.
  // Assigning directly replaces the ref with a string, breaking reactivity.
  // Must set .value to trigger the computed setter and propagate the change.
  ;(useI18nInstance().locale as unknown as { value: string }).value = lang
}

function changeLangInXSelectedLangCookie(lang: LanguageCode): void {
  setPermanentCookie('__lang__', lang)
}

// Re-export types for convenience
export { type LanguageCode, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE }
