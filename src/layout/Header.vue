<script lang="ts" setup>
import { ref } from 'vue'
import NavLink from '../components/NavLink.vue'
import LangSelectorBtn from '../components/LangSelectorBtn.vue'

const isMobileMenuOpen = ref<boolean>(false)

const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="w-full px-4 sm:px-6 lg:px-8 relative z-50">
    <div
      class="max-w-6xl mx-auto py-4 sm:py-6 flex justify-between items-center"
    >
      <!-- Mobile: Hamburger button -->
      <button
        class="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md hover:bg-white/10 transition-colors"
        :aria-label="$t('a11y.menu-toggle')"
        :aria-expanded="isMobileMenuOpen"
        @click="toggleMobileMenu"
      >
        <svg
          class="w-6 h-6 text-white transition-transform duration-300"
          :class="{ 'rotate-90': isMobileMenuOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            v-if="!isMobileMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Desktop: Navigation -->
      <nav class="hidden md:flex items-center gap-1 lg:gap-2 ml-auto">
        <NavLink route="/" :text="$t('nav.home')" />
        <NavLink route="/audio" :text="$t('nav.audio')" />
        <NavLink route="/video" :text="$t('nav.video')" />
        <NavLink route="/credits" :text="$t('nav.credits')" />
        <NavLink route="/redacted" :text="$t('nav.redacted')" />
        <NavLink route="/contact" :text="$t('nav.contact')" />
      </nav>

      <!-- Language selector (always visible) -->
      <LangSelectorBtn />
    </div>

    <!-- Mobile: Dropdown menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="isMobileMenuOpen"
        class="md:hidden absolute left-0 right-0 top-full bg-black/95 backdrop-blur-sm border-t border-white/10 px-4 py-4"
      >
        <div class="flex flex-col gap-1">
          <NavLink route="/" :text="$t('nav.home')" @click="closeMobileMenu" />
          <NavLink
            route="/audio"
            :text="$t('nav.audio')"
            @click="closeMobileMenu"
          />
          <NavLink
            route="/video"
            :text="$t('nav.video')"
            @click="closeMobileMenu"
          />
          <NavLink
            route="/credits"
            :text="$t('nav.credits')"
            @click="closeMobileMenu"
          />
          <NavLink
            route="/redacted"
            :text="$t('nav.redacted')"
            @click="closeMobileMenu"
          />
          <NavLink
            route="/contact"
            :text="$t('nav.contact')"
            @click="closeMobileMenu"
          />
        </div>
      </nav>
    </Transition>
  </header>
</template>
