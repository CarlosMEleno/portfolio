<script setup lang="ts">
import Header from './layout/Header.vue'
import Footer from './layout/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">

    <Header />

    <main class="main-container-with mx-auto flex-grow py-8">
      <router-view />
    </main>

    <Footer />
  </div>
</template>
