<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import contactImg from '@images/contact.jpg'
import bandcampIcon from '@images/bandcamp.svg'
import soundcloudIcon from '@images/soundcloud.svg'
import instagramIcon from '@images/instagram.svg'
import { useMainWidth } from '../composables/useMainWidth'
import { contact } from '../config/contact'

const { useViewWidth } = useMainWidth()
const { useViewBackground } = usePageBackground()

useViewWidth('max-w-4xl')

useViewBackground({
  imageSrc: contactImg,
  speed: 1.3,
  mdSpeed: 2,
  initialOffset: 280,
  mdInitialOffset: 360,
  type: 'scroll',
})
</script>

<template>
  <div>
    <h1
      class="!text-2xl sm:!text-4xl md:!text-5xl font-semibold tracking-[0.4em] animate-terminal-flicker uppercase"
    >
      {{ $t('contact') }}
    </h1>
    <div
      class="mt-10 flex flex-col md:flex-row animate-terminal-flicker animation-delay-300 !text-justify"
    >
      <div class="md:mt-12 w-full md:w-4/6 md:pr-8">
        <h2 class="!font-nunito-sans !text-[27px] font-bold">
          {{ $t('contact.who-title') }}
        </h2>
        <h3 class="mt-6 !font-nunito-sans !text-[22px]">
          {{ $t('contact.name') }}
        </h3>
        <p
          class="mt-6 !text-[19px] animate-terminal-flicker animation-delay-300 !text-justify"
          v-html="$t('contact.bio')"
        ></p>
      </div>
      <div
        class="w-full md:w-2/6 mt-10 md:mt-12 flex flex-col gap-10 !text-right"
      >
        <div>
          <p class="!text-[19px] tracking-[0.3em] uppercase !font-bold mb-3">
            {{ $t('contact.email-label') }}
          </p>
          <a
            :href="`mailto:${contact.email}`"
            class="!text-[17px] hover:underline break-all"
          >
            {{ contact.email }}
          </a>
        </div>

        <div>
          <p class="!text-[19px] tracking-[0.3em] uppercase !font-bold mb-3">
            {{ $t('contact.music-label') }}
          </p>
          <div class="flex flex-col gap-3">
            <a
              :href="contact.bandcamp"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-end gap-2 !text-[17px] hover:underline"
            >
              @Bandcamp
              <img
                :src="bandcampIcon"
                class="w-5 h-5 invert"
                alt=""
                aria-hidden="true"
              />
            </a>
            <a
              :href="contact.soundcloud"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-end gap-2 !text-[17px] hover:underline"
            >
              @Soundcloud
              <img
                :src="soundcloudIcon"
                class="w-5 h-5 invert"
                alt=""
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <div>
          <p class="!text-[19px] tracking-[0.3em] uppercase !font-bold mb-3">
            {{ $t('contact.social-label') }}
          </p>
          <a
            :href="contact.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-end gap-2 !text-[17px] hover:underline"
          >
            @8zymandias
            <img
              :src="instagramIcon"
              class="w-5 h-5 invert"
              alt=""
              aria-hidden="true"
            />
          </a>
          <p class="!text-[12px] !text-white/50 mt-1">
            {{ $t('contact.instagram-note') }}
          </p>
        </div>

        <div>
          <p class="!text-[19px] tracking-[0.3em] uppercase !font-bold">
            {{ $t('contact.tfg-label') }}
          </p>
          <p class="!text-[16px] !text-white/70 mb-5">
            {{ $t('contact.tfg-description') }}
          </p>
          <a
            href="/tfg.pdf"
            download
            class="inline-block bg-[rgba(248,240,222,0.4)] hover:bg-gray-300 hover:!text-black !text-white font-astron rounded-full px-6 py-1.5 text-sm transition-colors duration-200"
          >
            {{ $t('contact.tfg-download') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
