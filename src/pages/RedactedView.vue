<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import redactedImg from '@images/redacted.jpg'

const { useViewBackground } = usePageBackground()

useViewBackground({
  imageSrc: redactedImg,
  speed: 0.4,
  type: 'scale',
})
</script>

<template>
  <div>
    <h1 class="text-orange-500 text-2xl">Work</h1>
    <p class="mt-5">
      {{ $t('fake-text') }}
    </p>
  </div>
</template>
