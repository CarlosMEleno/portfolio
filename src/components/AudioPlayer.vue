<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import WaveSurfer from 'wavesurfer.js'
import SpectrogramPlugin from 'wavesurfer.js/dist/plugins/spectrogram-windowed.js'

const props = defineProps<{ src: string }>()

const containerRef = ref<HTMLElement | null>(null)
const spectrogramRef = ref<HTMLElement | null>(null)
let ws: WaveSurfer | null = null

const isPlaying = ref(false)
const isReady = ref(false)
const loadProgress = ref(0)
const currentTime = ref(0)
const totalDuration = ref(0)
const volume = ref(0.8)
const isMuted = ref(false)
const zoomLevel = ref(1)
const showSpectrogram = ref(false)

const ZOOM_MIN = 1
const ZOOM_MAX = 400
const ZOOM_STEP = 30

const FAKE_BARS = [20, 14, 38, 28, 52, 22, 44, 14, 34, 60, 18, 40, 24, 48, 16, 36, 24, 54, 20, 42, 28, 50, 14, 40, 30, 56, 16, 46, 20, 40, 30, 52]

const fmt = (s: number): string => {
  if (!isFinite(s) || s < 0) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

onMounted(() => {
  if (!containerRef.value || !spectrogramRef.value) return

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
        container: spectrogramRef.value,
        height: 80,
        fftSamples: 512,
        labels: false,
        colorMap: 'gray',
        scale: 'mel',
        gainDB: 25,
        rangeDB: 80,
        useWebWorker: false,
        windowSize: 60,
      }),
    ],
  })

  ws.on('loading', (pct: number) => (loadProgress.value = pct))

  ws.on('ready', () => {
    isReady.value = true
    totalDuration.value = ws!.getDuration()
    ws!.setVolume(volume.value)
  })

  ws.on('play', () => (isPlaying.value = true))
  ws.on('pause', () => (isPlaying.value = false))
  ws.on('finish', () => (isPlaying.value = false))
  ws.on('timeupdate', (t: number) => (currentTime.value = t))
})

onBeforeUnmount(() => ws?.destroy())

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

    <!-- Waveform / Spectrogram area -->
    <div class="relative min-h-[5rem]">

      <!-- Loading skeleton -->
      <Transition name="fade">
        <div v-if="!isReady" class="flex flex-col items-center gap-3 pb-2">
          <div class="flex items-end gap-0.5 h-20 w-full justify-center">
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
          <div class="w-full h-px bg-white/10 relative overflow-hidden">
            <div
              class="absolute inset-y-0 left-0 bg-white/50 transition-[width] duration-300"
              :style="{ width: `${loadProgress}%` }"
            />
          </div>
          <span class="text-[9px] font-mono tracking-[0.45em] text-white/30 animate-terminal-flicker">
            DECODIFICANDO — {{ loadProgress }}%
          </span>
        </div>
      </Transition>

      <!-- Visualizer (waveform + spectrogram stacked, always in DOM for canvas sizing) -->
      <div
        class="relative transition-opacity duration-500"
        :class="isReady ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        style="height: 80px"
      >
        <div
          class="absolute inset-0 overflow-hidden transition-opacity duration-300"
          :class="showSpectrogram ? 'opacity-0 pointer-events-none' : 'opacity-100'"
        >
          <div ref="containerRef" />
        </div>

        <div
          class="absolute inset-0 overflow-hidden transition-opacity duration-300"
          :class="showSpectrogram ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        >
          <div ref="spectrogramRef" />
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex items-center gap-4 pt-4 flex-wrap">

      <!-- Time -->
      <span class="text-white/50 text-xs font-mono tracking-wider tabular-nums shrink-0">
        {{ fmt(currentTime) }}<span class="text-white/25 mx-1">/</span>{{ fmt(totalDuration) }}
      </span>

      <div class="flex-1" />

      <!-- Transport -->
      <div class="flex items-center gap-3 shrink-0">

        <button
          class="w-8 h-8 flex items-center justify-center text-white/45 hover:text-white transition-colors duration-200"
          title="Retroceder 5s"
          @click="skip(-5)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
            <text x="12.5" y="15.5" text-anchor="middle" font-size="5.5" font-family="monospace" font-weight="bold" fill="currentColor">5</text>
          </svg>
        </button>

        <button
          class="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200"
          :title="isPlaying ? 'Pausar' : 'Reproducir'"
          @click="togglePlay"
        >
          <svg v-if="!isPlaying" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          <svg v-else width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        </button>

        <button
          class="w-8 h-8 flex items-center justify-center text-white/45 hover:text-white transition-colors duration-200"
          title="Adelantar 5s"
          @click="skip(5)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.01 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
            <text x="11.5" y="15.5" text-anchor="middle" font-size="5.5" font-family="monospace" font-weight="bold" fill="currentColor">5</text>
          </svg>
        </button>
      </div>

      <div class="flex-1" />

      <!-- Secondary controls -->
      <div class="flex items-center gap-3 shrink-0">

        <!-- WF / SP toggle switch -->
        <div class="flex items-center gap-1.5 shrink-0">
          <span
            class="text-[9px] font-mono tracking-widest transition-colors duration-200"
            :class="!showSpectrogram ? 'text-white/70' : 'text-white/25'"
          >WF</span>
          <button
            class="relative w-9 h-[18px] border border-white/20 transition-all duration-300 shrink-0"
            :class="showSpectrogram ? 'bg-white/10' : 'bg-transparent'"
            title="Cambiar entre forma de onda y espectrograma"
            @click="showSpectrogram = !showSpectrogram"
          >
            <span
              class="absolute top-[3px] w-[10px] h-[10px] rounded-full bg-white/65 transition-all duration-300"
              :class="showSpectrogram ? 'right-[3px]' : 'left-[3px]'"
            />
          </button>
          <span
            class="text-[9px] font-mono tracking-widest transition-colors duration-200"
            :class="showSpectrogram ? 'text-white/70' : 'text-white/25'"
          >SP</span>
        </div>

        <!-- Zoom -->
        <div class="flex items-center gap-1">
          <button
            class="w-6 h-6 flex items-center justify-center text-sm font-mono text-white/35 hover:text-white/75 transition-colors duration-200"
            title="Alejar zoom"
            @click="zoomOut"
          >−</button>
          <button
            class="w-6 h-6 flex items-center justify-center text-sm font-mono text-white/35 hover:text-white/75 transition-colors duration-200"
            title="Acercar zoom"
            @click="zoomIn"
          >+</button>
        </div>

        <!-- Mute -->
        <button
          class="w-6 h-6 flex items-center justify-center text-white/45 hover:text-white transition-colors duration-200 shrink-0"
          :title="isMuted ? 'Activar sonido' : 'Silenciar'"
          @click="toggleMute"
        >
          <svg v-if="!isMuted && volume > 0.5" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
          <svg v-else-if="!isMuted && volume > 0" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        </button>

        <!-- Volume slider -->
        <input
          type="range"
          min="0"
          max="1"
          step="0.02"
          :value="isMuted ? 0 : volume"
          class="volume-range w-24 shrink-0"
          @input="onVolumeChange"
        />
      </div>
    </div>
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
