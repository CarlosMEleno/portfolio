<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import creditsImg from '@images/credits.jpg'

const { useViewBackground } = usePageBackground()

useViewBackground({
  imageSrc: creditsImg,
})
</script>

<template>
  <div>
    <h1
      class="text-xl sm:text-4xl md:text-5xl font-semibold tracking-[0.4em] animate-terminal-flicker uppercase"
    >
      {{ $t('credits') }}
    </h1>

    <div
      class="mt-8 md:mt-20 bg-black/30 p-6 animate-terminal-flicker animation-delay-300 space-y-8"
    >
      <!-- DISCOGRAFÍA -->
      <section>
        <h3 class="credits-heading">{{ $t('credits.discography-title') }}</h3>
        <ul class="credits-list mt-4">
          <li>{{ $t('credits.discography-linvega') }}</li>
          <li>
            <span>{{ $t('credits.discography-other-projects') }}</span>
            <ul class="credits-sublist mt-2">
              <li>{{ $t('credits.discography-sanakjan') }}</li>
            </ul>
          </li>
          <li>
            <span>{{ $t('credits.discography-collaborations') }}</span>
            <ul class="credits-sublist mt-2">
              <li>{{ $t('credits.discography-garrote') }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <!-- BANDA SONORA -->
      <section>
        <h3 class="credits-heading">{{ $t('credits.soundtrack-title') }}</h3>
        <div class="mt-4 space-y-6">
          <div class="">
            <p class="font-semibold">{{ $t('credits.soundtrack-1-name') }}</p>
            <p class="!text-[17px]">
              {{ $t('credits.soundtrack-1-director') }}
            </p>
            <p class="!text-[17px]">{{ $t('credits.soundtrack-1-role') }}</p>
            <a
              href="https://www.youtube.com/watch?v=rmHXOcQxVOE"
              target="_blank"
              rel="noopener noreferrer"
              class="credits-link"
              >https://www.youtube.com/watch?v=rmHXOcQxVOE</a
            >
          </div>

          <div class="">
            <p class="font-semibold">{{ $t('credits.soundtrack-2-name') }}</p>
            <p class="!text-[17px]">{{ $t('credits.soundtrack-2-group') }}</p>
            <p class="!text-[17px]">{{ $t('credits.soundtrack-2-role') }}</p>
            <a
              href="https://www.youtube.com/watch?v=7DbQNOJ_l4g&t=1s"
              target="_blank"
              rel="noopener noreferrer"
              class="credits-link"
              >https://www.youtube.com/watch?v=7DbQNOJ_l4g&t=1s</a
            >
          </div>
        </div>
      </section>

      <!-- SONIDO - DISEÑO SONORO -->
      <section>
        <h3 class="credits-heading">{{ $t('credits.sound-design-title') }}</h3>
        <div class="mt-4">
          <p class="font-semibold !text-[17px]">
            {{ $t('credits.sound-1-name') }}
          </p>
          <p class="!text-[17px]">{{ $t('credits.sound-1-event') }}</p>
          <p class="!text-[17px]">{{ $t('credits.sound-1-role') }}</p>
        </div>
      </section>

      <!-- EN VIVO -->
      <section>
        <h3 class="credits-heading">{{ $t('credits.live-title') }}</h3>
        <div class="mt-4">
          <p class="font-semibold !text-[17px]">
            {{ $t('credits.live-1-name') }}
          </p>
          <p class="!text-[17px]">{{ $t('credits.live-1-event') }}</p>
          <p class="!text-[17px]">{{ $t('credits.live-1-role') }}</p>
          <p class="!text-[17px]">{{ $t('credits.live-1-date') }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.credits-heading {
  font-size: 20px;
  font-weight: 600;
  font-family: var(--font-nunito-sans);
  letter-spacing: 0.05em;
}

.credits-link {
  display: inline-block;
  margin-top: 0.25rem;
  font-size: 1rem;
  opacity: 0.65;
  word-break: break-all;
  transition: opacity 0.2s;
}

.credits-link:hover {
  opacity: 1;
}

/* First-level list: filled white disc */
.credits-list {
  list-style-type: disc;
  list-style-position: outside;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  line-height: 1.7;
}

/* Nested list: hollow white circle */
.credits-sublist {
  list-style-type: circle;
  list-style-position: outside;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  line-height: 1.7;
}
</style>
