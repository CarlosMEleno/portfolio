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
  </div>
</template>
