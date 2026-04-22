<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { changeLang } from '../helpers/language'
import { LANGUAGE_CONFIGS } from '../types/language'

const { locale } = useI18n()
</script>

<template>
  <div class="flex items-center gap-1.5 ml-4 pl-4 border-l border-white/20">
    <template v-for="(lang, index) in LANGUAGE_CONFIGS" :key="lang.code">
      <span v-if="index > 0" class="text-white/20 select-none">·</span>
      <button
        class="text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer"
        :class="
          locale === lang.code
            ? 'text-white'
            : 'text-white/35 hover:text-white/65'
        "
        @click="changeLang(lang.code)"
      >
        {{ lang.code }}
      </button>
    </template>
  </div>
</template>
