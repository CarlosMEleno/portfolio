<script setup lang="ts">
import Header from './layout/Header.vue'
import Footer from './layout/Footer.vue'
import ParallaxBackground from './components/ParallaxBackground.vue'

import { usePageBackground } from './composables/usePageBackground'
import { useMainWidth } from './composables/useMainWidth'

const { currentBackground } = usePageBackground()
const { currentMaxWidth } = useMainWidth()
</script>

<template>
  <div class="flex flex-col min-h-screen relative">
    <!-- Skip link for keyboard navigation -->
    <a href="#main-content" class="skip-link">{{
      $t('a11y.skip-to-content')
    }}</a>

    <!-- Parallax Background -->
    <ParallaxBackground
      v-if="currentBackground"
      :key="currentBackground.imageSrc"
      :image-src="currentBackground.imageSrc"
      :img-position="currentBackground.imgPosition"
      :z-index="currentBackground.zIndex"
      :disable-parallax="currentBackground.disableParallax"
      :container-class="currentBackground.containerClass"
      :overlay-color="currentBackground.overlayColor"
      :scale="currentBackground.scale"
    />

    <Header />

    <main id="main-content" class="w-full px-4 flex-grow relative z-10">
      <div
        class="mx-auto px-4 py-8 sm:py-12 lg:py-16 transition-[max-width] duration-300"
        :class="currentMaxWidth"
      >
        <router-view />
      </div>
    </main>

    <Footer />
  </div>
</template>

<style>
/* Skip link: invisible until focused */
.skip-link {
  position: absolute;
  top: -9999px;
  left: 1rem;
  z-index: 9999;
  padding: 0.5rem 1rem;
  background: #000;
  color: #fff;
  font-size: 0.875rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.25rem;
  text-decoration: none;
  white-space: nowrap;
}

.skip-link:focus {
  top: 1rem;
}

/* Global focus-visible: keyboard-only outline for all interactive elements */
:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.7);
  outline-offset: 2px;
}
</style>
