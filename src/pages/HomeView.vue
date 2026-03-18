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
  initialOffset: 350,  // Empieza más arriba
  scale: 1,           // Menos zoom (más alejado)
})
</script>

<template>
  <div class="w-full text-center">
    <div class="flex flex-col items-center px-2">
      <h1 class="text-3xl sm:text-4xl md:text-5xl animate-terminal-flicker">DORMANT SOUNDS</h1>
      <h2 class="text-lg sm:text-xl md:text-2xl mt-2 animate-terminal-flicker animation-delay-100">VIBRATIONS FROM
        BENEATH</h2>
    </div>
    <div class="h-[900px] flex flex-col">
      <button
        class="mt-[330px] bg-black/70 hover:bg-gray-300 text-white font-astron rounded-full px-6 sm:px-10 py-2 sm:py-3 text-base sm:text-lg mx-auto block transition-colors duration-200 animate-terminal-flicker animation-delay-200">
        LISTEN
      </button>
    </div>
    <div class="flex flex-col items-center animate-pulse px-2">
      <p class="text-base sm:text-lg font-astron">NO SE ALEJE MUCHO.</p>
      <p class="text-base sm:text-lg font-astron">SIGA SIEMPRE LAS SEÑALES.</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes terminal-flicker {
  0% {
    opacity: 0;
  }

  10% {
    opacity: 0.8;
  }

  15% {
    opacity: 0.2;
  }

  20% {
    opacity: 0.9;
  }

  25% {
    opacity: 0.3;
  }

  30% {
    opacity: 1;
  }

  35% {
    opacity: 0.4;
  }

  40% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

.animate-terminal-flicker {
  animation: terminal-flicker 1.2s ease-out forwards;
}

.animation-delay-100 {
  animation-delay: 0.1s;
  opacity: 0;
}

.animation-delay-200 {
  animation-delay: 0.25s;
  opacity: 0;
}
</style>
