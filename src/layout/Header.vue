<script lang="ts" setup>
import NavLink from '../components/NavLink.vue'
import LangSelectorBtn from '../components/LangSelectorBtn.vue'
</script>

<template>
  <header class="main-container-with mx-auto pt-8 pb-8 flex justify-end items-center">
    <nav class="flex items-center gap-1">
      <NavLink route="/" text="Home" />
      <NavLink route="/audio" text="Audio" />
      <NavLink route="/video" text="Video" />
      <NavLink route="/credits" text="Credits" />
      <NavLink route="/redacted" text="Redacted" />
      <NavLink route="/contact" text="Contact" />
    </nav>
    <LangSelectorBtn />
  </header>
</template>
