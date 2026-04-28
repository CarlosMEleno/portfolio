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

    <main class="w-full px-4 flex-grow relative z-10">
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
