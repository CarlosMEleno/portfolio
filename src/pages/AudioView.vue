<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import { usePageBackground } from '../composables/usePageBackground'
import audioImg from '@images/audio.jpg'
import audioTrack1 from "../audio/Traversing the Ecumen Refinery.wav"
import audioTrack2 from "../audio/Test signal - archivo 002.mp3"
import LazyMount from '../components/LazyMount.vue'

const AudioPlayer = defineAsyncComponent(() => import('../components/AudioPlayer.vue'))

const { useViewBackground } = usePageBackground()

useViewBackground({
  imageSrc: audioImg,
  speed: 0.6,
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

    <h1 class="text-5xl font-semibold tracking-[0.4em] animate-terminal-flicker uppercase">
      {{ $t('audio.title') }}
    </h1>

    <button
      class="mt-14 bg-[rgba(248,240,222,0.4)] hover:bg-gray-300 text-white font-astron rounded-full px-6 sm:px-10 py-2 sm:py-3 text-base sm:text-lg ml-auto w-full transition-colors duration-200 animate-terminal-flicker animation-delay-200 flex justify-center"
      @click="moveToFirstAudioSectionElement">
      LISTEN
    </button>

    <div class="mt-10 ml-auto w-full">
      <p class="text-[19px] bg-black/30 p-3 animate-terminal-flicker animation-delay-300 text-justify">
        Como parte de nuestra labor en Dormant Sounds, creemos firmemente que el medio sonoro posee un potencial todavía
        por explotar. Pese a ser habitualmente menospreciado, el oído es un sentido íntimamente ligado con nuestra
        percepción y comprensión del mundo. De forma subconsciente, el oído es nuestro sensor más rápido y agudo cuando
        se trata de percibir aquello que está fuera de lugar.
        <br><br>
        La vista es fácil de engañar. El oído no es tan ingenuo. Su sensibilidad para percibir las anomalías en el
        entorno mucho antes de que el cerebro pueda racionalizarlas lo convierten en nuestro "ángel de la guarda"
        atávico.
        <br><br>
        La recuperación/archivado de estos materiales sonoros refleja nuestra convicción de que el descubrimiento de la
        naturaleza de lo que nos rodea, pasa inevitablemente por nuestros oídos. Los materiales que va a escuchar a
        continuación son la prueba viviente de ello.
        <br><br><br>
        Oír para creer.
      </p>
    </div>

    <!-- Audio entries -->
    <div class="flex flex-col items-center w-full">

      <div class="w-full border-t border-white/25 my-16"></div>

      <div class="w-full audio-section">

        <div class="text-[16px] bg-black/30 p-3 w-fit">
          <span class="font-bold text-[19px]">Mu Arae (HD 160691) “Cervantes”</span><br><br>
          <span class="font-bold">Constellation</span> Ara<br>
          <span class="font-bold">Right Ascension</span> 17h 44m 08.70s<br>
          <span class="font-bold">Declination</span> −51° 50′ 02.6″<br>
          <span class="font-bold line-through">Apparent</span> Magnitude 5.15<br>
          <span class="font-bold">Distance (ly)</span> 51<br>
          <span class="font-bold">Spectral Type</span> G3IV-V<br>
          <span class="font-bold">Mass (Solar Masses)</span> 1.077<br>
          <span class="font-bold">Temperature (K)</span> 5704<br>
          <span class="font-bold">Age (Gyr)</span> 6.413<br>
          <span class="font-bold">Confirmed (unconfirmed) Planets</span> 4<br>
        </div>

        <LazyMount class="mt-10">
          <AudioPlayer :src="audioTrack1" title="Traversing the Ecumen Refinery" />
        </LazyMount>

        <div class="mt-6 text-[16px] bg-black/30 p-3">
          The system 's four planets known as c, d, b, e (from closest to farthest to the star), also respectively known
          as Dulcinea, Rocinante, Quijote and Sancho.<br>
          <br>
          Planet b (Quijote) contains a refinery and processing station of the star’s main materials (iron and helium).
          Quijote, although being a gas giant, possesses a solid moon, called “Dorotea”. This is where the Ecumen
          Company established their biggest refinery to date, known as “Barataria 2”, known around the working classes
          as “the gallows”. No public records have been found about the reason for naming Barataria as a second (2), nor
          of a hypothetical prior Barataria 1 station.
        </div>

      </div>

      <div class="w-full border-t border-white/25 my-16"></div>

      <div class="w-full audio-section">
        <LazyMount>
          <AudioPlayer :src="audioTrack2" title="Test Signal — Archivo 002" />
        </LazyMount>

        <div class="mt-6 text-[16px] bg-black/30 p-3">
          Grabación de uno de los primeros intentos registrados de Transporte de Materiales en Tiempo Cero. La
          antigüedad de la grabación dificulta su datación, a la par que explica que la transición entre espacios
          realizada por el dispositivo de grabación no sea instantánea, sino una especie de fundido (véase hundimiento).
          El aspecto más llamativo de la grabación es el entorno al que el dispositivo es transportado. Basándonos en el
          registro sonoro, parece tratarse de un espacio de clase Sears-Lombarde no registrado, pese a discrepancias por
          parte de <span class="tracking-[-0.015em]">█████</span> <span class="tracking-[-0.015em]">████████</span> y
          <span class="tracking-[-0.015em]">███ ██████</span>, debido a evidencias de manipulación por parte de <span
            class="tracking-[-0.015em]">██ ████████ ██████</span>.
          Dataciones posteriores llevadas a cabo mediante <span class="tracking-[-0.015em]">███████ ████████ ████ ████
            ██████ ██ ██ ██████ █████</span> (Oshkosh, Wisconsin).
        </div>
      </div>

    </div>

  </div>
</template>
