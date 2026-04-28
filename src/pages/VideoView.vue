<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import videoImg from '@images/video.jpg'
import VideoPlayer from '../components/VideoPlayer.vue'
import { useMainWidth } from '../composables/useMainWidth'
const { useViewWidth } = useMainWidth()
const { useViewBackground } = usePageBackground()

useViewWidth('max-w-5xl')

useViewBackground({
  imageSrc: videoImg,
})
</script>

<template>
  <div class="text-white pb-24">
    <h1
      class="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.4em] animate-terminal-flicker uppercase"
    >
      {{ $t('video') }}
    </h1>

    <div
      class="mt-8 md:mt-20 animate-terminal-flicker animation-delay-300 text-justify"
    >
      <p
        class="text-lg sm:text-xl md:text-2xl bg-black/30 px-2 py-0 inline box-decoration-clone leading-[26px]"
        v-html="$t('video.intro')"
      ></p>
    </div>

    <div class="mt-16 md:mt-20 flex flex-col gap-24">
      <VideoPlayer video-id="rmHXOcQxVOE" video-position="left">
        <p
          class="text-lg sm:text-xl md:text-2xl bg-black/30 px-2 py-0 inline box-decoration-clone leading-[26px]"
          v-html="$t('video.project-1-desc')"
        ></p>
      </VideoPlayer>

      <VideoPlayer video-id="7DbQNOJ_l4g" video-position="right">
        <p
          class="text-lg sm:text-xl md:text-2xl bg-black/30 px-2 py-0 inline box-decoration-clone leading-[26px]"
          v-html="$t('video.project-2-desc')"
        ></p>
      </VideoPlayer>
    </div>
  </div>
</template>
