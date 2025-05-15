import { createApp } from 'vue'
import './styles/main.css'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import WorkView from './pages/WorkView.vue'
import CreditsView from './pages/CreditsView.vue'
import DiscographyView from './pages/DiscographyView.vue'
import AudioView from './pages/AudioView.vue'
import ContactView from './pages/ContactView.vue'

import { createI18n } from 'vue-i18n'
import es from './lang/es'
import en from './lang/en'
import * as languageHelper from './helpers/language'
import { setI18nInstance, type Translator } from './services/i18n'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const routes = [
  { path: '/', component: HomeView },
  { path: '/work', component: WorkView },
  { path: '/credits', component: CreditsView },
  { path: '/discography', component: DiscographyView },
  { path: '/audio', component: AudioView },
  { path: '/contact', component: ContactView },
]
/* eslint-enable @typescript-eslint/no-unsafe-assignment */

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const lang = languageHelper.evalUserLang()

languageHelper.changeLangCodeOnHTMLRootTag(lang)

const i18n = createI18n({
  legacy: false,
  locale: lang,
  fallbackLocale: 'en',
  // warnHtmlInMessage: 'off',
  messages: {
    en,
    es,
  },
})

setI18nInstance(i18n.global as unknown as Translator)

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
createApp(App).use(router).use(i18n).mount('#app')
