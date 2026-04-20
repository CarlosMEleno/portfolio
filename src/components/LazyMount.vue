<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(false)

const setRef = (el: Element | null) => {
  if (!el) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { rootMargin: '0px 0px 300px 0px', threshold: 0 },
  )
  observer.observe(el)
}
</script>

<template>
  <div :ref="setRef">
    <slot v-if="isVisible" />
  </div>
</template>
