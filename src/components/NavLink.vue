<script lang="ts" setup>

const props = defineProps({
    route: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

</script>

<template>
    <router-link
:to="route"
        :class="['title px-4 py-2 text-lg  transition-colors hover:!text-cake-green', $route.path == route ? '!text-cake-orange' : null]">
        {{ text }}
    </router-link>
</template>