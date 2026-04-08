<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import videoImg from '@images/video.jpg'

const { useViewBackground } = usePageBackground()

useViewBackground({
  imageSrc: videoImg,
  speed: 0.5,
  type: 'scroll-opacity',
})
</script>

<template>
  <div class="text-white pb-24">

    <h1 class="text-5xl font-semibold tracking-[0.4em] animate-terminal-flicker uppercase">
      {{ $t('video') }}
    </h1>

    <div class="mt-20 animate-terminal-flicker animation-delay-300 text-justify">
      <p class="text-lg sm:text-xl md:text-2xl bg-black/30 px-2 py-0 inline box-decoration-clone leading-[26px]">
        Para sus ojos y oídos.
        <br>
        La existencia de los siguientes materiales está confirmada hasta que se demuestre lo contrario. La Corporación
        se
        reserva el conocimiento de dónde y cuándo fueron recuperados/extraídos estos fragmentos. Es posible que la
        presencia de algunos de estos archivos resulte paradójica para algunos de ustedes, dependiendo de su ángulo de
        observación. <span class="font-bold">Mantenga la calma. No corra con tijeras.</span>
      </p>
    </div>

  </div>
</template>
