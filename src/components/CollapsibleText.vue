<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const props = defineProps<{
  html: string
}>()

const isExpanded = ref(false)
const hasOverflow = ref(false)
const innerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (innerRef.value) {
    // Show toggle only when content actually overflows the collapsed height
    hasOverflow.value =
      innerRef.value.scrollHeight > innerRef.value.clientHeight
  }
})
</script>

<template>
  <div>
    <!--
      Wrapper: overflow:hidden clips both the text AND the gradient overlay.
      The gradient lives INSIDE here so it properly fades the last visible lines.
    -->
    <div
      ref="innerRef"
      class="relative bg-black/30 p-3 text-base sm:text-lg text-justify overflow-hidden transition-[max-height] duration-500 ease-in-out"
      :style="{ maxHeight: isExpanded ? '200rem' : '8rem' }"
    >
      <!-- Actual text content -->
      <div v-html="props.html" />

      <!--
        Gradient overlay — absolute, anchored to the bottom of the clipping box.
        from-black/80: strong enough to make the last line truly fade to nothing.
        h-16: covers the bottom ~2 lines, creating a gradual dissolve.
      -->
      <Transition name="fade">
        <div
          v-if="hasOverflow && !isExpanded"
          class="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-black/80 to-transparent"
        />
      </Transition>
    </div>

    <!-- Toggle button — only when there is hidden content -->
    <div
      v-if="hasOverflow"
      class="relative z-10 flex justify-end transition-[margin-top] duration-500 ease-in-out"
      :style="{ marginTop: isExpanded ? '0.25rem' : '-2.75rem' }"
    >
      <button
        class="p-1.5 bg-white/90 border border-white text-black hover:bg-white hover:border-white/60 transition-colors duration-200 cursor-pointer"
        :title="isExpanded ? 'Plegar' : 'Desplegar'"
        @click="isExpanded = !isExpanded"
      >
        <!-- Chevron down: expand -->
        <svg
          v-if="!isExpanded"
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
        </svg>
        <!-- Chevron up: collapse -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
