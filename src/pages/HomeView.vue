<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import homeimg from "@images/home.jpg"
const { useViewBackground } = usePageBackground()

// Configura el background parallax para esta vista
// Reemplaza la URL con tu imagen real
useViewBackground({
  imageSrc: homeimg,
  speed: 0.5,
  type: 'scroll',
  imgSize: 'cover',
  imgPosition: 'center',
})
</script>

<template>
  <div>
    <h1 class="text-orange-500 text-2xl">Home</h1>
    <p class="mt-5">
      {{ $t('fake-text') }}
    </p>
  </div>
</template>
