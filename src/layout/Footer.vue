<script setup lang="ts">
import instagram from "@images/instagram.svg";
import youtube from "@images/youtube.svg";
import bandcamp from "@images/bandcamp.svg";
import soundcloud from "@images/soundcloud.svg";
//import link from "@images/link.svg";
</script>
<template>
  <footer class="w-full px-4 sm:px-6 lg:px-8 pb-8">
    <div class="max-w-6xl mx-auto pt-12 pb-6">
      <div class="flex justify-center items-center gap-8">
        <a href="https://www.instagram.com/8zymandias/" target="_blank" rel="noopener noreferrer"
          class="text-white/60 hover:text-white transition-colors duration-200 cursor-pointer" aria-label="Instagram">
          <img :src="instagram" alt="Instagram"
            class="w-8 h-8 invert opacity-60 hover:opacity-100 transition-opacity" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
          class="text-white/60 hover:text-white transition-colors duration-200 cursor-pointer" aria-label="YouTube">
          <img :src="youtube" alt="YouTube" class="w-12 h-12 invert opacity-60 hover:opacity-100 transition-opacity" />
        </a>
        <a href="https://linvega.bandcamp.com/" target="_blank" rel="noopener noreferrer"
          class="text-white/60 hover:text-white transition-colors duration-200 cursor-pointer" aria-label="Bandcamp">
          <img :src="bandcamp" alt="Bandcamp"
            class="w-11 h-11 invert opacity-60 hover:opacity-100 transition-opacity" />
        </a>

        <a href="https://soundcloud.com/linvega_sai14" target="_blank" rel="noopener noreferrer"
          class="text-white/60 hover:text-white transition-colors duration-200 cursor-pointer" aria-label="SoundCloud">
          <img :src="soundcloud" alt="SoundCloud"
            class="w-11 h-11 invert opacity-60 hover:opacity-100 transition-opacity" />
        </a>


        <!--
        <a href="#" target="_blank" rel="noopener noreferrer"
          class="text-white/60 hover:text-white transition-colors duration-200 cursor-pointer" aria-label="Link">
          <img :src="link" alt="Link" class="w-6 h-6 invert opacity-60 hover:opacity-100 transition-opacity" />
        </a>
        -->
      </div>
    </div>
  </footer>
</template>
