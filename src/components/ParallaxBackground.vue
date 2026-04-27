<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { ImagePosition } from '../types/parallax'
import { defaultParallaxOptions } from '../types/parallax'

const MD_BREAKPOINT = 768
const LG_BREAKPOINT = 1024

interface Props {
  imageSrc: string
  speed?: number
  mdSpeed?: number
  lgSpeed?: number
  imgPosition?: ImagePosition
  zIndex?: number
  disableParallax?: boolean
  containerClass?: string
  overlayColor?: string
  initialOffset?: number
  mdInitialOffset?: number
  lgInitialOffset?: number
  scale?: number
  keepImg?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  speed: defaultParallaxOptions.speed,
  mdSpeed: undefined,
  lgSpeed: undefined,
  imgPosition: defaultParallaxOptions.imgPosition,
  zIndex: defaultParallaxOptions.zIndex,
  disableParallax: defaultParallaxOptions.disableParallax,
  containerClass: '',
  overlayColor: undefined,
  initialOffset: 0,
  mdInitialOffset: undefined,
  lgInitialOffset: undefined,
  scale: 1,
})

const containerRef = ref<HTMLElement | null>(null)
const imgRef = ref<HTMLImageElement | null>(null)
const isVisible = ref(false)
const isMd = ref(false)
const isLg = ref(false)

const effectiveSpeed = computed(() => {
  if (isLg.value && props.lgSpeed !== undefined) return props.lgSpeed
  if (isMd.value && props.mdSpeed !== undefined) return props.mdSpeed
  return props.speed!
})

const effectiveInitialOffset = computed(() => {
  if (isLg.value && props.lgInitialOffset !== undefined)
    return props.lgInitialOffset
  if (isMd.value && props.mdInitialOffset !== undefined)
    return props.mdInitialOffset
  return props.initialOffset ?? 0
})

// The image is 200% tall and starts at top: -50% (centered).
// This gives 50vh of travel room in each direction.
// As the user scrolls down, we apply a negative translateY so the image
// drifts upward slower than the content, creating the parallax illusion.
// Factor = speed * 0.3 → e.g. speed 0.5 → image moves at 15% of scroll rate.
const onScroll = (): void => {
  if (!imgRef.value || props.disableParallax) return
  const scrollOffset = -(window.scrollY * effectiveSpeed.value * 0.3)
  const totalOffset = scrollOffset + effectiveInitialOffset.value
  const scaleValue = props.scale ?? 1
  imgRef.value.style.transform = `translateY(${totalOffset}px) scale(${scaleValue})`
}

const onResize = (): void => {
  isMd.value = window.innerWidth >= MD_BREAKPOINT
  isLg.value = window.innerWidth >= LG_BREAKPOINT
  onScroll()
}

onMounted((): void => {
  if (!props.imageSrc) return
  isMd.value = window.innerWidth >= MD_BREAKPOINT
  isLg.value = window.innerWidth >= LG_BREAKPOINT

  const onImageReady = (): void => {
    if (!props.disableParallax) {
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize, { passive: true })
    }
    isVisible.value = true
  }

  const preload = new Image()
  preload.onload = onImageReady
  preload.onerror = onImageReady
  preload.src = props.imageSrc
})

onUnmounted((): void => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div
    ref="containerRef"
    :class="[
      'parallax-background fixed inset-0 overflow-hidden pointer-events-none',
      containerClass,
      { 'is-visible': isVisible },
    ]"
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
  top: -50vh;
  top: -50lvh;
  left: 0;
  width: 100%;
  height: 200vh;
  height: 200lvh;
  object-fit: cover;
  will-change: transform;
}
</style>
