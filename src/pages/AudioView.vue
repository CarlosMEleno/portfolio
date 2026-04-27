<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import { usePageBackground } from '../composables/usePageBackground'
import audioImg from '@images/audio.jpg'
import audioTrack1 from '../audio/Traversing the Ecumen Refinery.mp3'
import audioTrack2 from '../audio/Test signal - archivo 002.mp3'
import audioTrack3 from '../audio/Under the scorching Chanai 1.mp3'

import LazyMount from '../components/LazyMount.vue'

const AudioPlayer = defineAsyncComponent(
  () => import('../components/AudioPlayer.vue')
)

const { useViewBackground } = usePageBackground()

useViewBackground({
  imageSrc: audioImg,
  speed: 0.5,
  mdSpeed: 0.8,
  initialOffset: 300,
  mdInitialOffset: 350,
  type: 'scroll',
})

const moveToFirstAudioSectionElement = () => {
  const audioSectionElements = document.querySelectorAll('.audio-section')
  if (audioSectionElements[0]) {
    audioSectionElements[0].scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="text-white pb-24">
    <h1
      class="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.4em] animate-terminal-flicker uppercase"
    >
      {{ $t('audio.title') }}
    </h1>

    <button
      class="mt-10 md:mt-20 bg-[rgba(248,240,222,0.4)] hover:bg-gray-300 hover:!text-black text-white font-astron rounded-full px-6 sm:px-10 py-2 sm:py-3 text-base sm:text-lg ml-auto w-full transition-colors duration-200 animate-terminal-flicker animation-delay-200 flex justify-center"
      @click="moveToFirstAudioSectionElement"
    >
      {{ $t('audio.listen') }}
    </button>

    <div class="mt-10 md:mt-12 ml-auto w-full">
      <p
        class="text-[19px] bg-black/30 p-3 animate-terminal-flicker animation-delay-300 text-justify"
        v-html="$t('audio.intro')"
      ></p>
    </div>

    <!-- Audio entries -->
    <div class="flex flex-col items-center w-full">
      <div class="w-full border-t border-white/25 my-14"></div>

      <div class="w-full audio-section">
        <div
          class="text-base sm:text-lg bg-black/30 p-3 w-fit text-justify"
          v-html="$t('audio.entry-1-data')"
        ></div>

        <LazyMount class="mt-10">
          <AudioPlayer :src="audioTrack1" :title="$t('audio.entry-1-title')" />
        </LazyMount>

        <div
          class="mt-6 text-base sm:text-lg bg-black/30 p-3 text-justify"
          v-html="$t('audio.entry-1-desc')"
        ></div>
      </div>

      <div class="w-full border-t border-white/25 my-14"></div>

      <div class="w-full audio-section">
        <LazyMount>
          <AudioPlayer :src="audioTrack3" :title="$t('audio.entry-3-title')" />
        </LazyMount>

        <div
          class="mt-6 text-base sm:text-lg bg-black/30 p-3 text-justify"
          v-html="$t('audio.entry-3-desc')"
        ></div>
      </div>

      <div class="w-full border-t border-white/25 my-14"></div>

      <div class="w-full audio-section">
        <LazyMount>
          <AudioPlayer :src="audioTrack2" :title="$t('audio.entry-2-title')" />
        </LazyMount>

        <div
          class="mt-6 text-base sm:text-lg bg-black/30 p-3 text-justify"
          v-html="$t('audio.entry-2-desc')"
        ></div>
      </div>
    </div>
  </div>
</template>
