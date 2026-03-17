<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import type { ImagePosition } from '../types/parallax'
import { defaultParallaxOptions } from '../types/parallax'

interface Props {
    imageSrc: string
    speed?: number
    imgPosition?: ImagePosition
    zIndex?: number
    disableParallax?: boolean
    containerClass?: string
    overlayColor?: string
    // kept for API compatibility, not used in this implementation
    type?: string
    imgSize?: string
    imgRepeat?: string
    keepImg?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    speed: defaultParallaxOptions.speed,
    imgPosition: defaultParallaxOptions.imgPosition,
    zIndex: defaultParallaxOptions.zIndex,
    disableParallax: defaultParallaxOptions.disableParallax,
    containerClass: '',
    overlayColor: undefined,
})

const containerRef = ref<HTMLElement | null>(null)
const imgRef = ref<HTMLImageElement | null>(null)
const isVisible = ref(false)

// The image is 200% tall and starts at top: -50% (centered).
// This gives 50vh of travel room in each direction.
// As the user scrolls down, we apply a negative translateY so the image
// drifts upward slower than the content, creating the parallax illusion.
// Factor = speed * 0.3 → e.g. speed 0.5 → image moves at 15% of scroll rate.
const onScroll = (): void => {
    if (!imgRef.value || props.disableParallax) return
    const offset = -(window.scrollY * props.speed! * 0.3)
    imgRef.value.style.transform = `translateY(${offset}px)`
}

onMounted((): void => {
    if (!props.imageSrc) return

    const onImageReady = (): void => {
        isVisible.value = true
        if (!props.disableParallax) {
            window.addEventListener('scroll', onScroll, { passive: true })
            onScroll()
        }
    }

    const preload = new Image()
    preload.onload = onImageReady
    preload.onerror = onImageReady
    preload.src = props.imageSrc
})

onUnmounted((): void => {
    window.removeEventListener('scroll', onScroll)
})
</script>

<template>
    <div
        ref="containerRef"
        :class="['parallax-background fixed inset-0 overflow-hidden pointer-events-none', containerClass, { 'is-visible': isVisible }]"
        :style="{ zIndex }"
    >
        <img
            ref="imgRef"
            :src="imageSrc"
            class="parallax-img"
            :style="{ objectPosition: imgPosition ?? 'center' }"
            alt=""
            aria-hidden="true"
        />
        <div
            v-if="overlayColor"
            class="absolute inset-0 pointer-events-none"
            :style="{ backgroundColor: overlayColor }"
        />
    </div>
</template>

<style scoped>
.parallax-background {
    opacity: 0;
    transition: opacity 0.6s ease;
}

.parallax-background.is-visible {
    opacity: 1;
}

.parallax-img {
    position: absolute;
    top: -50%;
    left: 0;
    width: 100%;
    height: 200%;
    object-fit: cover;
    will-change: transform;
}
</style>
