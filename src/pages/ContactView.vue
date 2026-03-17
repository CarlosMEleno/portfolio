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
    <h1 class="text-orange-500 text-2xl">Contact</h1>
    <p class="mt-5">
      {{ $t('fake-text') }}
    </p>
  </div>
</template>
