<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import WaveSurfer from 'wavesurfer.js'
import SpectrogramPlugin from 'wavesurfer.js/dist/plugins/spectrogram.js'

const props = defineProps<{
  src: string
  title?: string
  description?: string
  spectrogramDataUrl?: string
  spectrogramSampleRate?: number
}>()

const { t } = useI18n()

const containerRef = ref<HTMLElement | null>(null)
const titleContainerRef = ref<HTMLElement | null>(null)
const titleMeasureRef = ref<HTMLElement | null>(null)
let ws: WaveSurfer | null = null
let spectroEl: HTMLElement | null = null
let resizeObserver: ResizeObserver | null = null

const isPlaying = ref(false)
const isReady = ref(false)
const loadProgress = ref(0)
const currentTime = ref(0)
const totalDuration = ref(0)
const volume = ref(0.8)
const isMuted = ref(false)
const zoomLevel = ref(90)
const showSpectrogram = ref(true)
const isMarquee = ref(false)
const marqueeDuration = ref('20s')

const ZOOM_MIN = 1
const ZOOM_MAX = 400
const ZOOM_STEP = 30

const FAKE_BARS = [
  20, 14, 38, 28, 52, 22, 44, 14, 34, 60, 18, 40, 24, 48, 16, 36, 24, 54, 20,
  42, 28, 50, 14, 40, 30, 56, 16, 46, 20, 40, 30, 52,
]

const fmt = (s: number): string => {
  if (!isFinite(s) || s < 0) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

const checkMarquee = () => {
  if (!titleContainerRef.value || !titleMeasureRef.value) return
  const containerW = titleContainerRef.value.getBoundingClientRect().width
  const textW = titleMeasureRef.value.getBoundingClientRect().width
  isMarquee.value = textW > containerW
  if (isMarquee.value && textW > 0) {
    marqueeDuration.value = `${Math.max(10, Math.round(textW / 55))}s`
  }
}

onMounted(() => {
  // Title marquee check — run after paint and again once custom fonts are loaded
  nextTick(() => {
    checkMarquee()
    document.fonts.ready.then(checkMarquee)
    if (titleContainerRef.value) {
      resizeObserver = new ResizeObserver(checkMarquee)
      resizeObserver.observe(titleContainerRef.value)
    }
  })

  if (!containerRef.value) return

  ws = WaveSurfer.create({
    container: containerRef.value,
    waveColor: 'rgba(255,255,255,0.45)',
    progressColor: 'rgba(255,255,255,0.92)',
    cursorColor: 'rgba(142,143,84,0.9)',
    cursorWidth: 2,
    barWidth: 2,
    barGap: 1,
    barRadius: 3,
    height: 80,
    normalize: true,
    minPxPerSec: zoomLevel.value,
    autoScroll: true,
    autoCenter: true,
    interact: true,
    hideScrollbar: true,
    dragToSeek: true,
    url: props.src,
    plugins: [
      SpectrogramPlugin.create({
        height: 80,
        fftSamples: 512,
        labels: false,
        colorMap: 'gray',
        scale: 'mel',
        gainDB: 25,
        rangeDB: 80,
        useWebWorker: true,
        ...(props.spectrogramDataUrl
          ? {
              frequenciesDataUrl: props.spectrogramDataUrl,
              sampleRate: props.spectrogramSampleRate ?? 44100,
            }
          : {}),
      }),
    ],
  })

  ws.on('loading', (pct: number) => (loadProgress.value = pct))

  ws.on('ready', () => {
    isReady.value = true
    totalDuration.value = ws!.getDuration()
    ws!.setVolume(volume.value)

    const innerWrapper = ws!.getWrapper()
    const children = Array.from(innerWrapper.children) as HTMLElement[]
    if (children.length >= 2) {
      spectroEl = children[children.length - 1]
      innerWrapper.style.position = 'relative'
      Object.assign(spectroEl.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: showSpectrogram.value ? 'block' : 'none',
        overflow: 'hidden',
      })
    }
  })

  ws.on('play', () => (isPlaying.value = true))
  ws.on('pause', () => (isPlaying.value = false))
  ws.on('finish', () => (isPlaying.value = false))
  ws.on('timeupdate', (t: number) => (currentTime.value = t))
})

onBeforeUnmount(() => {
  ws?.destroy()
  resizeObserver?.disconnect()
})

watch(showSpectrogram, (show) => {
  if (spectroEl) spectroEl.style.display = show ? 'block' : 'none'
})

const togglePlay = () => ws?.playPause()
const skip = (s: number) => ws?.skip(s)

const toggleMute = () => {
  isMuted.value = !isMuted.value
  ws?.setMuted(isMuted.value)
}

const onVolumeChange = (e: Event) => {
  const v = parseFloat((e.target as HTMLInputElement).value)
  volume.value = v
  isMuted.value = v === 0
  ws?.setMuted(v === 0)
  if (v > 0) ws?.setVolume(v)
}

const zoomIn = () => {
  zoomLevel.value = Math.min(zoomLevel.value + ZOOM_STEP, ZOOM_MAX)
  ws?.zoom(zoomLevel.value)
}

const zoomOut = () => {
  zoomLevel.value = Math.max(zoomLevel.value - ZOOM_STEP, ZOOM_MIN)
  ws?.zoom(zoomLevel.value)
}
</script>

<template>
  <div class="w-full select-none">
    <!-- Screen-reader live region for playback state -->
    <div aria-live="polite" aria-atomic="true" class="sr-only">
      {{ isPlaying ? t('a11y.now-playing') : isReady ? t('a11y.paused') : '' }}
    </div>

    <!-- Title with marquee -->
    <div
      v-if="props.title"
      ref="titleContainerRef"
      class="relative overflow-hidden mb-4 w-full select-text"
    >
      <!-- Invisible span used only for measuring true text width (no gap padding, no layout impact) -->
      <span
        ref="titleMeasureRef"
        class="absolute top-0 left-0 font-astron uppercase tracking-[0.35em] whitespace-nowrap text-sm sm:text-base leading-none pointer-events-none"
        style="visibility: hidden"
        aria-hidden="true"
        >{{ props.title }}</span
      >

      <!-- Animated row: one copy when static, two copies when marquee for seamless loop -->
      <div
        class="inline-flex"
        :class="{ 'marquee-active': isMarquee }"
        :style="isMarquee ? { '--marquee-dur': marqueeDuration } : {}"
      >
        <span
          class="font-astron uppercase tracking-[0.35em] whitespace-nowrap text-white/70 text-sm sm:text-base leading-none pr-20"
          >{{ props.title }}</span
        >
        <span
          v-if="isMarquee"
          aria-hidden="true"
          class="font-astron uppercase tracking-[0.35em] whitespace-nowrap text-white/70 text-sm sm:text-base leading-none pr-20"
          >{{ props.title }}</span
        >
      </div>
    </div>

    <!-- Waveform area: fixed height prevents layout shift between loading and ready states -->
    <div class="relative h-[80px] w-full">
      <!-- Loading skeleton: absolute overlay, exactly fills the 80px -->
      <Transition name="fade">
        <div v-if="!isReady" class="absolute inset-0">
          <div class="flex items-end gap-0.5 h-full w-full justify-center">
            <div
              v-for="(h, i) in FAKE_BARS"
              :key="i"
              class="w-0.5 rounded-full animate-pulse"
              :style="{
                height: `${h}px`,
                background: 'rgba(255,255,255,0.2)',
                animationDelay: `${i * 55}ms`,
                animationDuration: '1.5s',
              }"
            />
          </div>
          <div
            class="absolute bottom-0 left-0 right-0 h-px bg-white/10 overflow-hidden"
          >
            <div
              class="absolute inset-y-0 left-0 bg-white/50 transition-[width] duration-300"
              :style="{ width: `${loadProgress}%` }"
            />
          </div>
          <span
            class="absolute bottom-2 left-0 right-0 text-center text-[9px] font-mono tracking-[0.45em] text-white/30 animate-terminal-flicker"
          >
            {{ t('audio.player.decoding', { progress: loadProgress }) }}
          </span>
        </div>
      </Transition>

      <!-- WaveSurfer container: absolute overlay, same 80px box -->
      <div
        ref="containerRef"
        class="absolute inset-0 transition-opacity duration-500"
        :class="isReady ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      />
    </div>

    <!-- Controls -->
    <div class="flex flex-wrap items-center gap-x-3 gap-y-3 pt-3">
      <!-- Transport: full-width centered row on mobile, order-2 center on desktop -->
      <div
        class="order-1 sm:order-2 w-full sm:w-auto sm:flex-1 flex items-center justify-center gap-3"
      >
        <button
          class="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-white/45 hover:text-white transition-colors duration-200"
          :title="t('audio.player.skip-back')"
          :aria-label="t('audio.player.skip-back')"
          @click="skip(-5)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
            />
            <text
              x="12.5"
              y="15.5"
              text-anchor="middle"
              font-size="5.5"
              font-family="monospace"
              font-weight="bold"
              fill="currentColor"
            >
              5
            </text>
          </svg>
        </button>

        <button
          class="w-14 h-14 sm:w-12 sm:h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200"
          :title="isPlaying ? t('audio.player.pause') : t('audio.player.play')"
          :aria-label="
            isPlaying ? t('audio.player.pause') : t('audio.player.play')
          "
          @click="togglePlay"
        >
          <svg
            v-if="!isPlaying"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <svg
            v-else
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        </button>

        <button
          class="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-white/45 hover:text-white transition-colors duration-200"
          :title="t('audio.player.skip-forward')"
          :aria-label="t('audio.player.skip-forward')"
          @click="skip(5)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12.01 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"
            />
            <text
              x="11.5"
              y="15.5"
              text-anchor="middle"
              font-size="5.5"
              font-family="monospace"
              font-weight="bold"
              fill="currentColor"
            >
              5
            </text>
          </svg>
        </button>
      </div>

      <!-- Time: order-2 on mobile (shares row with secondary), order-1 on desktop -->
      <span
        class="order-2 sm:order-1 text-white/50 text-[11px] sm:text-xs font-mono tracking-wider tabular-nums shrink-0"
      >
        {{ fmt(currentTime) }}<span class="text-white/25 mx-1">/</span
        >{{ fmt(totalDuration) }}
      </span>

      <!-- Secondary controls: order-2 on mobile (ml-auto pushes right), order-3 on desktop -->
      <div
        class="order-2 sm:order-3 ml-auto sm:ml-0 flex items-center gap-2 sm:gap-3 shrink-0"
      >
        <!-- WF / SP toggle -->
        <div class="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <span
            class="text-[8px] sm:text-[9px] font-mono tracking-widest transition-colors duration-200"
            :class="!showSpectrogram ? 'text-white/70' : 'text-white/25'"
            >WF</span
          >
          <button
            class="relative w-8 sm:w-9 h-[16px] sm:h-[18px] border border-white/20 transition-all duration-300 shrink-0"
            :class="showSpectrogram ? 'bg-white/10' : 'bg-transparent'"
            :title="t('audio.player.waveform-toggle')"
            :aria-label="t('audio.player.waveform-toggle')"
            @click="showSpectrogram = !showSpectrogram"
          >
            <span
              class="absolute top-[3px] w-[9px] sm:w-[10px] h-[9px] sm:h-[10px] rounded-full bg-white/65 transition-all duration-300"
              :class="showSpectrogram ? 'right-[3px]' : 'left-[3px]'"
            />
          </button>
          <span
            class="text-[8px] sm:text-[9px] font-mono tracking-widest transition-colors duration-200"
            :class="showSpectrogram ? 'text-white/70' : 'text-white/25'"
            >SP</span
          >
        </div>

        <!-- Zoom -->
        <div class="flex items-center gap-0.5">
          <button
            class="w-6 h-6 flex items-center justify-center text-sm font-mono text-white/35 hover:text-white/75 transition-colors duration-200"
            :title="t('audio.player.zoom-out')"
            :aria-label="t('audio.player.zoom-out')"
            @click="zoomOut"
          >
            −
          </button>
          <button
            class="w-6 h-6 flex items-center justify-center text-sm font-mono text-white/35 hover:text-white/75 transition-colors duration-200"
            :title="t('audio.player.zoom-in')"
            :aria-label="t('audio.player.zoom-in')"
            @click="zoomIn"
          >
            +
          </button>
        </div>

        <!-- Mute -->
        <button
          class="w-6 h-6 flex items-center justify-center text-white/45 hover:text-white transition-colors duration-200 shrink-0"
          :title="isMuted ? t('audio.player.unmute') : t('audio.player.mute')"
          :aria-label="
            isMuted ? t('audio.player.unmute') : t('audio.player.mute')
          "
          @click="toggleMute"
        >
          <svg
            v-if="!isMuted && volume > 0.5"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
            />
          </svg>
          <svg
            v-else-if="!isMuted && volume > 0"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"
            />
          </svg>
          <svg
            v-else
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
            />
          </svg>
        </button>

        <!-- Volume slider: slightly shorter on mobile -->
        <input
          type="range"
          min="0"
          max="1"
          step="0.02"
          :value="isMuted ? 0 : volume"
          class="volume-range w-16 sm:w-24 shrink-0"
          @input="onVolumeChange"
        />
      </div>
    </div>

    <!-- Description -->
    <p
      v-if="props.description"
      class="mt-4 font-nunito-sans text-sm sm:text-base text-white/40 font-light leading-relaxed select-text"
    >
      {{ props.description }}
    </p>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.marquee-active {
  animation: audio-marquee var(--marquee-dur, 20s) linear infinite;
}

@keyframes audio-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

.volume-range {
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  cursor: pointer;
  border-radius: 1px;
}

.volume-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition:
    background 0.15s ease,
    transform 0.15s ease;
}

.volume-range:hover::-webkit-slider-thumb {
  background: white;
  transform: scale(1.2);
}

.volume-range::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  border: none;
  transition: background 0.15s ease;
}

.volume-range:hover::-moz-range-thumb {
  background: white;
}
</style>
