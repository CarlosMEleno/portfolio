<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import audioImg from '@images/audio.jpg'

const { useViewBackground } = usePageBackground()

useViewBackground({
  imageSrc: audioImg,
  speed: 0.6,
  type: 'scroll',
})

const tracks = [
  { title: 'audio.track-1-title', year: 'audio.track-1-year', genre: 'audio.track-1-genre', desc: 'audio.track-1-desc' },
  { title: 'audio.track-2-title', year: 'audio.track-2-year', genre: 'audio.track-2-genre', desc: 'audio.track-2-desc' },
  { title: 'audio.track-3-title', year: 'audio.track-3-year', genre: 'audio.track-3-genre', desc: 'audio.track-3-desc' },
  { title: 'audio.track-4-title', year: 'audio.track-4-year', genre: 'audio.track-4-genre', desc: 'audio.track-4-desc' },
  { title: 'audio.track-5-title', year: 'audio.track-5-year', genre: 'audio.track-5-genre', desc: 'audio.track-5-desc' },
  { title: 'audio.track-6-title', year: 'audio.track-6-year', genre: 'audio.track-6-genre', desc: 'audio.track-6-desc' },
]

const approaches = [
  { label: 'audio.approach-1-label', text: 'audio.approach-1-text' },
  { label: 'audio.approach-2-label', text: 'audio.approach-2-text' },
  { label: 'audio.approach-3-label', text: 'audio.approach-3-text' },
  { label: 'audio.approach-4-label', text: 'audio.approach-4-text' },
]
</script>

<template>
  <div class="text-white pb-24">

    <!-- Hero -->
    <h1 class="text-orange-500 text-3xl font-semibold tracking-wide">
      {{ $t('audio.title') }}
    </h1>
    <p class="mt-1 text-white/50 text-sm uppercase tracking-widest">
      {{ $t('audio.subtitle') }}
    </p>
    <p class="mt-6 text-white/75 leading-relaxed max-w-xl">
      {{ $t('audio.description') }}
    </p>

    <!-- Language check -->
    <p class="mt-4 text-xs text-white/30 italic">
      {{ $t('audio.language-note') }}
    </p>

    <!-- Featured projects -->
    <div class="mt-16">
      <h2 class="text-lg font-semibold tracking-wide text-white/90">
        {{ $t('audio.featured-title') }}
      </h2>
      <p class="mt-2 text-white/50 text-sm leading-relaxed max-w-lg">
        {{ $t('audio.featured-description') }}
      </p>

      <div class="mt-8 flex flex-col divide-y divide-white/10">
        <div
          v-for="(track, i) in tracks"
          :key="i"
          class="py-6 flex flex-col gap-2"
        >
          <div class="flex items-baseline justify-between gap-4">
            <span class="text-white font-medium">{{ $t(track.title) }}</span>
            <span class="text-white/30 text-xs tabular-nums shrink-0">{{ $t(track.year) }}</span>
          </div>
          <span class="text-xs uppercase tracking-widest text-orange-500/70">{{ $t(track.genre) }}</span>
          <p class="text-white/55 text-sm leading-relaxed max-w-lg">{{ $t(track.desc) }}</p>
        </div>
      </div>
    </div>

    <!-- Process -->
    <div class="mt-20 border-t border-white/10 pt-12">
      <h2 class="text-lg font-semibold tracking-wide text-white/90">
        {{ $t('audio.process-title') }}
      </h2>
      <div class="mt-6 flex flex-col gap-5 max-w-xl">
        <p class="text-white/65 leading-relaxed">{{ $t('audio.process-p1') }}</p>
        <p class="text-white/65 leading-relaxed">{{ $t('audio.process-p2') }}</p>
        <p class="text-white/65 leading-relaxed">{{ $t('audio.process-p3') }}</p>
      </div>
    </div>

    <!-- Approach -->
    <div class="mt-20 border-t border-white/10 pt-12">
      <h2 class="text-lg font-semibold tracking-wide text-white/90">
        {{ $t('audio.approach-title') }}
      </h2>
      <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div v-for="(item, i) in approaches" :key="i">
          <span class="text-xs uppercase tracking-widest text-orange-500/70">{{ $t(item.label) }}</span>
          <p class="mt-2 text-white/60 text-sm leading-relaxed">{{ $t(item.text) }}</p>
        </div>
      </div>
    </div>

    <!-- Tools -->
    <div class="mt-20 border-t border-white/10 pt-12">
      <h2 class="text-lg font-semibold tracking-wide text-white/90">
        {{ $t('audio.tools-title') }}
      </h2>
      <p class="mt-4 text-white/45 text-sm leading-loose">
        {{ $t('audio.tools-text') }}
      </p>
    </div>

    <!-- CTA -->
    <div class="mt-20 border-t border-white/10 pt-12">
      <p class="text-white/60 text-sm">{{ $t('audio.contact-cta') }}</p>
      <router-link
        to="/contact"
        class="inline-block mt-3 text-sm text-orange-500 hover:text-orange-400 transition-colors tracking-wide"
      >
        {{ $t('audio.contact-link') }} →
      </router-link>
    </div>

  </div>
</template>
