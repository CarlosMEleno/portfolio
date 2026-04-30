<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import { usePageMeta } from '../composables/usePageMeta'
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
})

usePageMeta('meta.contact.title', 'meta.contact.description')
</script>

<template>
  <div>
    <div
      class="flex flex-col md:flex-row animate-terminal-flicker animation-delay-300 !text-justify"
    >
      <div class="w-full md:w-4/6 md:pr-8">
        <h1 class="!font-nunito-sans !text-[27px] font-bold">
          {{ $t('contact.who-title') }}
        </h1>
        <h3 class="mt-6 !font-nunito-sans !text-[22px]">
          {{ $t('contact.name') }}
        </h3>
        <p
          class="mt-6 !text-[19px] animate-terminal-flicker animation-delay-300 !text-justify"
          v-html="$t('contact.bio')"
        ></p>
      </div>
      <div class="w-full md:w-2/6 mt-10 flex flex-col gap-10 !text-right">
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
            href="/resources/MARTÍNEZ_ELENO_CARLOS_TFG_2022 - 4 publicar DEF 1 col.pdf"
            download
            class="inline-block bg-[rgba(248,240,222,0.4)] hover:bg-gray-300 hover:!text-black font-astron rounded-full px-6 py-1.5 !text-[12px] transition-colors duration-200"
          >
            <svg
              viewBox="0 -2 30 30"
              class="w-5 h-5 inline-block mr-2 fill-current"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29,0 L1,0 C0.448,0 0,0.448 0,1 L0,9 C0,9.553 0.448,10 1,10 C1.552,10 2,9.553 2,9 L2,2 L28,2 L28,9 C28,9.553 28.448,10 29,10 C29.552,10 30,9.553 30,9 L30,1 C30,0.447 29.552,0 29,0 Z M19.267,18.3 L16,22.26 L16,8.002 C16,7.449 15.552,7 15,7 C14.448,7 14,7.449 14,8.002 L14,22.298 L10.702,18.3 C10.31,17.905 9.674,17.905 9.282,18.3 C8.89,18.693 8.89,19.332 9.282,19.726 L14.224,25.717 C14.433,25.927 14.71,26.017 14.984,26.002 C15.258,26.017 15.536,25.927 15.745,25.717 L20.687,19.726 C21.079,19.332 21.079,18.693 20.687,18.3 C20.295,17.905 19.659,17.905 19.267,18.3 Z"
              />
            </svg>
            <span>{{ $t('contact.tfg-download') }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
