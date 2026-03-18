<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import audioImg from '@images/audio.jpg'

const { useViewBackground } = usePageBackground()

useViewBackground({
  imageSrc: audioImg,
  speed: 0.6,
  type: 'scroll',
})

</script>

<template>
  <div class="text-white pb-24">

    <!-- Hero -->
    <h1 class="text-orange-500 text-3xl font-semibold tracking-wide">
      {{ $t('audio.title') }}
    </h1>

  </div>
</template>
