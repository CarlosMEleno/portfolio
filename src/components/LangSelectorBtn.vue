<script lang="ts" setup>
import { ref } from 'vue'
import { useI18nInstance } from '../services/i18n'
import { changeLang } from '../helpers/language'
const languages = ref({
  en: 'English',
  es: 'Español',
})

const selectedLanguage = ref(useI18nInstance().locale)
const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const selectLanguage = (code) => {
  selectedLanguage.value = code
  showDropdown.value = false
  changeLang(code)
}
</script>
<template>
  <div
    :class="[
      'absolute z-10 top-[8px] right-[8px] md:top-[45px] md:right-[35px] lg:top-[60px] lg:right-[58px] rounded transition-all',
      showDropdown
        ? 'bg-[#3a3c3c] p-[10px] !top-[-2px] !right-[-2px] md:!top-[35px] md:!right-[25px] lg:!top-[50px] lg:!right-[48px]'
        : 'p-0',
    ]"
  >
    <div class="flex flex-col justify-center">
      <button
        class="flex justify-center px-[6px] py-[8px] w-[42px] h-[40px] border rounded bg-transparent hover:bg-[#ffffff40] group"
        @click="toggleDropdown"
      >
        <span class="text-amber-50">{{ languages[selectedLanguage] }}</span>
      </button>
      <div v-if="showDropdown" class="mt-3 bg-transparent border rounded">
        <button
          v-for="(svg, code, index) in languages"
          v-show="code != selectedLanguage"
          :key="code"
          :class="[
            'flex justify-center px-[6px] py-[8px] w-[40px] h-[40px] hover:bg-[#ffffff40] group',
            // set te border when index more than 1
            index > 1 ||
            // Or the previous element is not selected and the current element index not be 0
            (index !== 0 &&
              Object.keys(languages)[index - 1] !== selectedLanguage)
              ? 'border-t border-white'
              : undefined,
          ]"
          @click="selectLanguage(code)"
        >
          <span class="text-amber-50">{{ languages[code] }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
