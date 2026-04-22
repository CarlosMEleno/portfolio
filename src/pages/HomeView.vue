<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import { useMainWidth } from '../composables/useMainWidth'
import homeimg from '@images/home.jpg'
const { useViewBackground } = usePageBackground()
const { useViewWidth } = useMainWidth()

useViewWidth('max-w-5xl')

// Configura el background parallax para esta vista
useViewBackground({
  imageSrc: homeimg,
  speed: 2,
  mdSpeed: 3.2,
  initialOffset: 300,
  mdInitialOffset: 340,
  type: 'scroll',
  scale: 1, // Menos zoom (más alejado)
})
</script>

<template>
  <div class="w-full text-center">
    <div class="mt-10 flex flex-col items-center px-2">
      <h1 class="text-3xl sm:text-4xl md:text-5xl animate-terminal-flicker">
        {{ $t('home.title') }}
      </h1>
      <h2
        class="text-lg sm:text-xl md:text-2xl mt-2 animate-terminal-flicker animation-delay-100"
      >
        {{ $t('home.subtitle') }}
      </h2>
    </div>
    <div class="h-[800px] flex flex-col">
      <a
        class="mt-[330px] bg-black/70 hover:bg-gray-300 hover:!text-black text-white font-astron rounded-full px-6 sm:px-10 py-2 sm:py-3 text-base sm:text-lg mx-auto block transition-colors duration-200 animate-terminal-flicker animation-delay-200"
        href="/audio"
      >
        {{ $t('home.listen') }}
      </a>
    </div>
    <div
      class="flex flex-col items-center animate-pulse px-2 mb-10"
      style="animation-duration: 0.9s"
    >
      <p class="text-base sm:text-lg !font-astron">
        {{ $t('home.tagline-1') }}
      </p>
      <p class="text-base sm:text-lg !font-astron">
        {{ $t('home.tagline-2') }}
      </p>
    </div>
  </div>
</template>
