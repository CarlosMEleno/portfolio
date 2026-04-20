<script lang="ts" setup>
import { usePageBackground } from '../composables/usePageBackground'
import creditsImg from '@images/credits.jpg'

const { useViewBackground } = usePageBackground()

useViewBackground({
  imageSrc: creditsImg,
  speed: 4.6,
  type: 'scroll',
  imgSize: 'cover',
  //imgPosition: 'top',
  initialOffset: 390,
  scale: 1,
})
</script>

<template>
  <div>
    <h1 class="text-5xl font-semibold tracking-[0.4em] animate-terminal-flicker uppercase">
      {{ $t('credits') }}
    </h1>

    <div class="mt-20 bg-black/30 p-6 animate-terminal-flicker animation-delay-300 space-y-8">

      <!-- DISCOGRAFÍA -->
      <section>
        <h3 class="credits-heading">DISCOGRAFÍA</h3>
        <ul class="credits-list mt-4">
          <li>Linvega</li>
          <li>
            <span>Otros proyectos</span>
            <ul class="credits-sublist mt-2">
              <li>Sanakjan - WarCrime Waifu (PURE HATE 000 - A DISTANT HOWL VA)</li>
            </ul>
          </li>
          <li>
            <span>Colaboraciones</span>
            <ul class="credits-sublist mt-2">
              <li>Garrote - A Love Letter to Salvador Puig Antich (DEATHBED TAPES - Die Destruktion VA) [con Komossas]
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <!-- BANDA SONORA -->
      <section>
        <h3 class="credits-heading">BANDA SONORA</h3>
        <div class="mt-4 space-y-6">
          <div class="">
            <p class="font-semibold">Those Who Wander</p>
            <p class="!text-[17px]">Dir: Adrián González Fernández "Disso"</p>
            <p class="!text-[17px]">Banda Sonora Original, Diseño Sonoro</p>
            <a href="https://www.youtube.com/watch?v=rmHXOcQxVOE" target="_blank" rel="noopener noreferrer"
              class="credits-link">https://www.youtube.com/watch?v=rmHXOcQxVOE</a>
          </div>

          <div class="">
            <p class="font-semibold">PLANES, HUECOS II Festival de Cortos Pelabravo Express</p>
            <p class="!text-[17px]">Grupo: La Zarrampla</p>
            <p class="!text-[17px]">Banda Sonora, Grabación y Diseño Sonoros</p>
            <a href="https://www.youtube.com/watch?v=7DbQNOJ_l4g&t=1s" target="_blank" rel="noopener noreferrer"
              class="credits-link">https://www.youtube.com/watch?v=7DbQNOJ_l4g&t=1s</a>
          </div>
        </div>
      </section>

      <!-- SONIDO - DISEÑO SONORO -->
      <section>
        <h3 class="credits-heading">SONIDO - DISEÑO SONORO</h3>
        <div class="mt-4">
          <p class="font-semibold">PLANES, HUECOS</p>
          <p>II Festival de Cortos Pelabravo Express</p>
          <p>Grabación y Diseño Sonoros</p>
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
