<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import videoImg from '@images/video.jpg'

const { useViewBackground } = usePageBackground()

useViewBackground({
  imageSrc: videoImg,
  speed: 0.5,
  type: 'scroll-opacity',
})
</script>

<template>
  <div>
    <h1 class="text-orange-500 text-2xl">Discography</h1>
    <p class="mt-5">
      {{ $t('fake-text') }}
    </p>
  </div>
</template>
