<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import homeimg from "@images/home.jpg"
const { useViewBackground } = usePageBackground()

// Configura el background parallax para esta vista
useViewBackground({
  imageSrc: homeimg,
  speed: 4,
  type: 'scroll',
  imgSize: 'cover',
  imgPosition: 'top',
  initialOffset: 390,  // Empieza más arriba
  scale: 1,           // Menos zoom (más alejado)
})
</script>

<template>
  <div class="w-full text-center">
    <div class="mt-10 flex flex-col items-center px-2">
      <h1 class="text-3xl sm:text-4xl md:text-5xl animate-terminal-flicker">DORMANT SOUNDS</h1>
      <h2 class="text-lg sm:text-xl md:text-2xl mt-2 animate-terminal-flicker animation-delay-100">VIBRATIONS FROM
        BENEATH</h2>
    </div>
    <div class="h-[800px] flex flex-col">
      <a class="mt-[330px] bg-black/70 hover:bg-gray-300 text-white font-astron rounded-full px-6 sm:px-10 py-2 sm:py-3 text-base sm:text-lg mx-auto block transition-colors duration-200 animate-terminal-flicker animation-delay-200"
        href="/audio">
        LISTEN
      </a>
    </div>
    <div class="flex flex-col items-center animate-pulse px-2 mb-10" style="animation-duration: 0.9s;">
      <p class="text-base sm:text-lg !font-astron">NO SE ALEJE MUCHO.</p>
      <p class="text-base sm:text-lg !font-astron">SIGA SIEMPRE LAS SEÑALES.</p>
    </div>
  </div>
</template>