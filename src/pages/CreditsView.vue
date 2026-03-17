<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import creditsImg from '@images/credits.jpg'

const { useViewBackground } = usePageBackground()

useViewBackground({
  imageSrc: creditsImg,
  speed: 0.4,
  type: 'scroll',
})
</script>

<template>
  <div>
    <h1 class="text-orange-500 text-2xl">Credits</h1>
    <p class="mt-5">
      {{ $t('fake-text') }}
    </p>
  </div>
</template>
