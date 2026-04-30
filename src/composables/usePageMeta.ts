import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export function usePageMeta(titleKey: string, descriptionKey?: string) {
  const { t, locale } = useI18n()

  const updateMeta = () => {
    const title = t(titleKey)
    const description = descriptionKey ? t(descriptionKey) : null

    // <title>
    document.title = title

    // <meta name="description">
    if (description) {
      const descEl = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]'
      )
      if (descEl) descEl.content = description
    }

    // Open Graph
    const ogTitle = document.querySelector<HTMLMetaElement>(
      'meta[property="og:title"]'
    )
    if (ogTitle) ogTitle.content = title

    if (description) {
      const ogDesc = document.querySelector<HTMLMetaElement>(
        'meta[property="og:description"]'
      )
      if (ogDesc) ogDesc.content = description
    }

    const ogUrl = document.querySelector<HTMLMetaElement>(
      'meta[property="og:url"]'
    )
    if (ogUrl) ogUrl.content = window.location.href

    // Twitter Card
    const twTitle = document.querySelector<HTMLMetaElement>(
      'meta[name="twitter:title"]'
    )
    if (twTitle) twTitle.content = title

    if (description) {
      const twDesc = document.querySelector<HTMLMetaElement>(
        'meta[name="twitter:description"]'
      )
      if (twDesc) twDesc.content = description
    }
  }

  onMounted(updateMeta)
  watch(locale, updateMeta)
}
