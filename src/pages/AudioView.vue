<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import audioImg from '@images/audio.jpg'
import AudioPlayer from '../components/AudioPlayer.vue'
import audioTest from "../audio/Traversing the Ecumen Refinery.wav"
const { useViewBackground } = usePageBackground()

useViewBackground({
  imageSrc: audioImg,
  speed: 0.6,
  type: 'scroll',
})
</script>

<template>
  <div class="text-white pb-24">

    <h1 class="text-5xl font-semibold tracking-[0.4em] animate-terminal-flicker uppercase">
      {{ $t('audio.title') }}
    </h1>

    <div class="mt-20 w-max">
      <p class="text-lg sm:text-xl md:text-2xl max-w-2xl bg-black/30 p-3 animate-terminal-flicker
      animation-delay-300 text-justify">
        Como parte de nuestra labor en Dormant Sounds, creemos firmemente que el medio sonoro posee un potencial todavía
        por explotar. Pese a ser habitualmente menospreciado, el oído es un sentido íntimamente ligado con nuestra
        percepción y comprensión del mundo. De forma subconsciente, el oído es nuestro sensor más rápido y agudo cuando
        se
        trata de percibir aquello que está fuera de lugar.
        <br><br>
        La vista es fácil de engañar. El oído no es tan ingenuo. Su sensibilidad para percibir las anomalías en el
        entorno
        mucho antes de que el cerebro pueda racionalizarlas lo convierten en nuestro "ángel de la guarda" atávico.
        <br><br>
        La recuperación/archivado de estos materiales sonoros refleja nuestra convicción de que el descubrimiento de la
        naturaleza de lo que nos rodea, pasa inevitablemente por nuestros oídos. Los materiales que va a escuchar a
        continuación son la prueba viviente de ello.
        <br><br><br>
        Oír para creer.
      </p>
      <div class="mt-20 flex justify-end w-full">
        <div class="clear-both  w-[800px]">
          <AudioPlayer :src="audioTest" />
        </div>
      </div>
    </div>
  </div>
</template>
