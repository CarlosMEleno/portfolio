<script setup lang="ts">
import Header from './layout/Header.vue'
import Footer from './layout/Footer.vue'
import ParallaxBackground from './components/ParallaxBackground.vue'

import { usePageBackground } from './composables/usePageBackground'

const { currentBackground } = usePageBackground()
</script>

<template>
  <div class="flex flex-col min-h-screen relative">
    <!-- Parallax Background -->
    <ParallaxBackground
v-if="currentBackground" :key="currentBackground.imageSrc"
      :image-src="currentBackground.imageSrc" :speed="currentBackground.speed" :type="currentBackground.type"
      :img-size="currentBackground.imgSize" :img-position="currentBackground.imgPosition"
      :img-repeat="currentBackground.imgRepeat" :keep-img="currentBackground.keepImg"
      :z-index="currentBackground.zIndex" :disable-parallax="currentBackground.disableParallax"
      :container-class="currentBackground.containerClass" :overlay-color="currentBackground.overlayColor"
      :initial-offset="currentBackground.initialOffset" :scale="currentBackground.scale" />

    <Header />

    <main class="w-full px-4 sm:px-6 lg:px-8 flex-grow relative z-10">
      <div class="max-w-5xl mx-auto py-8 sm:py-12 lg:py-16">
        <router-view />
      </div>
    </main>

    <Footer />
  </div>
</template>