<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import type { ImagePosition } from '../types/parallax'
import { defaultParallaxOptions } from '../types/parallax'

interface Props {
  imageSrc: string
  imgPosition?: ImagePosition
  zIndex?: number
  disableParallax?: boolean
  containerClass?: string
  overlayColor?: string
  scale?: number
  keepImg?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  imgPosition: defaultParallaxOptions.imgPosition,
  zIndex: defaultParallaxOptions.zIndex,
  disableParallax: defaultParallaxOptions.disableParallax,
  containerClass: '',
  overlayColor: undefined,
  scale: 1,
})

const containerRef = ref<HTMLElement | null>(null)
const imgRef = ref<HTMLImageElement | null>(null)
const isVisible = ref(false)
const maxScroll = ref(0)

const updateMaxScroll = (): void => {
  maxScroll.value = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  )
}

// The image is 200vh tall with top: -50vh, so its center sits at y = H/2
// within the fixed viewport. With transform: translateY(t) scale(s):
//   rendered top    = H/2 - H·s + t
//   rendered bottom = H/2 + H·s + t
//
// Target: top of image visible at scroll=0, bottom visible at scroll=maxScroll.
//   t₀ = H·(s − 0.5)   →  rendered top  = 0
//   t₁ = H·(0.5 − s)   →  rendered bottom = H
//
// Linear interpolation gives:
//   t = H·(s − 0.5)·(1 − 2·scrollY / maxScroll)
//
// When maxScroll = 0 (page fits in viewport) → center the image (t = 0).
const onScroll = (): void => {
  if (!imgRef.value || props.disableParallax) return
  const H = window.innerHeight
  const ms = maxScroll.value
  const s = props.scale ?? 1

  const translateY =
    ms > 0 ? H * (s - 0.5) * (1 - (2 * window.scrollY) / ms) : 0

  imgRef.value.style.transform = `translateY(${translateY}px) scale(${s})`
}

const onResize = (): void => {
  updateMaxScroll()
  onScroll()
}

let bodyResizeObserver: ResizeObserver | null = null

onMounted((): void => {
  if (!props.imageSrc) return

  const onImageReady = (): void => {
    if (!props.disableParallax) {
      updateMaxScroll()
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize, { passive: true })
      bodyResizeObserver = new ResizeObserver(() => {
        updateMaxScroll()
        onScroll()
      })
      bodyResizeObserver.observe(document.body)
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
  bodyResizeObserver?.disconnect()
  bodyResizeObserver = null
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
