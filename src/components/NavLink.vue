<script lang="ts" setup>
interface Props {
  route: string
  text: string
}

defineProps<Props>()
</script>

<template>
  <router-link :to="route" :class="[
    'title px-4 py-2 text-lg  transition-colors text-white hover:text-green-400',
    $route.path == route ? '!text-cake-orange' : null,
  ]">
    {{ text }}
  </router-link>
</template>
