import { readCookie, setPermanentCookie } from '../services/cookie_helper'
import { useI18nInstance } from '../services/i18n'

export function evalUserLang(): string {
  const cookieLang = readCookie('X-Selected-Lang')

  if (cookieLang !== null) {
    return cookieLang
  }

  const browserLang = navigator.language.substring(0, 2).toLowerCase()
  return ['en', 'es'].includes(browserLang) ? browserLang : 'en'
}

export function changeLang(lang: string): void {
  changeLangCodeOnHTMLRootTag(lang)
  changeLocaleOnI18n(lang)
  changeLangInXSelectedLangCookie(lang)
}

export function changeLangCodeOnHTMLRootTag(lang: string): void {
  document.documentElement.setAttribute('lang', lang)
}

function changeLocaleOnI18n(lang: string): void {
  useI18nInstance().locale = lang
}

function changeLangInXSelectedLangCookie(lang: string): void {
  setPermanentCookie('X-Selected-Lang', lang)
}
