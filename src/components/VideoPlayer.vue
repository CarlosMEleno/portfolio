<script setup lang="ts">
withDefaults(
  defineProps<{
    videoId: string
    videoPosition?: 'left' | 'right'
  }>(),
  {
    videoPosition: 'left',
  }
)
</script>

<template>
  <div
    class="flex flex-col md:flex-row gap-8 w-full"
    :class="{ 'md:flex-row-reverse': videoPosition === 'right' }"
  >
    <!-- Video -->
    <div class="w-full md:w-3/5">
      <div class="aspect-video w-full">
        <iframe
          :src="`https://www.youtube-nocookie.com/embed/${videoId}`"
          class="w-full h-full"
          frameborder="0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        />
      </div>
    </div>

    <!-- Text -->
    <div class="w-full md:w-2/5">
      <slot />
    </div>
  </div>
</template>
