<script setup lang="ts">
import CommingSoonView from './pages/CommingSoonView.vue'
import Header from './layout/Header.vue'
import Footer from './layout/Footer.vue'

import { COMMING_SOON_MODE } from './constants'
</script>

<template>
  <CommingSoonView v-if="COMMING_SOON_MODE" />
  <div v-else class="flex flex-col min-h-screen">
    <Header />

    <main class="main-container-with mx-auto flex-grow py-8">
      <router-view />
    </main>

    <Footer />
  </div>
</template>
