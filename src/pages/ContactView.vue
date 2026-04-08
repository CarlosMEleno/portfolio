<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
// Añade tu imagen en src/images/contact.jpg o usa una existente
import contactImg from '@images/contact.jpg'

const { useViewBackground } = usePageBackground()

useViewBackground({
  imageSrc: contactImg,
  speed: 0.3,
  type: 'scroll',
})
</script>

<template>
  <div>
    <div>
      <h1 class="text-5xl font-semibold tracking-[0.4em] animate-terminal-flicker uppercase">
        {{ $t('contact') }}
      </h1>
    </div>
  </div>
</template>
