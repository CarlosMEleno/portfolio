// A global singletone resource to use in any site
export interface Translator {
  locale: string
  t: (key: string, params?: unknown) => string
}

let i18n: Translator | undefined = undefined

function useI18nInstance(): Translator {
  return i18n!
}

function setI18nInstance(instance: Translator): void {
  i18n = instance
}

export { setI18nInstance, useI18nInstance }
