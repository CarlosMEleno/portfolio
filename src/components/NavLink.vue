<script lang="ts" setup>
interface Props {
  route: string
  text: string
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <router-link :to="route" :class="[
    'block whitespace-nowrap transition-all duration-200 uppercase',
    'px-2 py-2.5 text-xs tracking-normal',
    'sm:px-2.5 sm:py-2 sm:text-xs sm:tracking-wide',
    'md:px-3 md:py-1.5 md:text-sm md:tracking-wide',
    'font-bold hover:text-white/40',
    $route.path === route
      ? 'text-amber-400 md:border-b-2 md:border-amber-400'
      : 'text-white/80 md:border-b-2 md:border-transparent',
  ]" @click="emit('click')">
    {{ text }}
  </router-link>
</template>
