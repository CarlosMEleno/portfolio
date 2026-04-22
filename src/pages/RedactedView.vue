<script lang="ts" setup>
import { ref } from 'vue'
import { usePageBackground } from '../composables/usePageBackground'
import redactedImg from '@images/redacted.jpg'

const { useViewBackground } = usePageBackground()

useViewBackground({
  imageSrc: redactedImg,
  speed: 0.4,
  type: 'scale',
})

// ---------------------------------------------------------------------------
// Cómo generar un hash SHA-256 para añadir una contraseña:
//   crypto.subtle.digest('SHA-256', new TextEncoder().encode('tu-contraseña'))
//     .then(b => Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,'0')).join(''))
//     .then(console.log)
// ---------------------------------------------------------------------------
interface PasswordEntry {
  hash: string
  onMatch: () => void
}

const unlocked = ref(false)

const entries: PasswordEntry[] = [
  {
    // contraseña: 'dormant'
    hash: 'c74c9a30f434ce29d2e3df50413aa85db3c0052bb28ef8a15189c3f97a79043a',
    onMatch: () => {
      unlocked.value = true
    },
  },
]

async function hashInput(str: string): Promise<string> {
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str)
  )
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

const input = ref('')
const blackout = ref(false)
const shaking = ref(false)

const submit = async () => {
  const inputText = input.value.trim().toLowerCase()

  if (inputText === '') {
    shaking.value = true
    return
  }

  const hash = await hashInput(inputText)
  const entry = entries.find((e) => e.hash === hash)

  if (entry) {
    entry.onMatch()
  } else {
    input.value = ''
    blackout.value = true
  }
}

const onBlackoutEnd = () => {
  blackout.value = false
}
</script>

<template>
  <!-- Overlay fundido a negro -->
  <Transition name="blackout">
    <div
      v-if="blackout"
      class="fixed inset-0 bg-black z-[9999] pointer-events-none"
      @animationend="onBlackoutEnd"
    />
  </Transition>

  <div
    class="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
  >
    <template v-if="!unlocked">
      <form
        class="flex flex-col items-center gap-4 w-full max-w-xs"
        @submit.prevent="submit"
      >
        <input
          v-model="input"
          type="password"
          autocomplete="off"
          class="w-full bg-transparent border-b border-white/50 focus:border-white outline-none text-center text-white font-astron tracking-[0.3em] py-2 text-sm sm:text-base transition-colors duration-200 placeholder:text-white/30"
          placeholder="_ _ _ _ _ _ _"
        />

        <button
          type="submit"
          :class="[
            'mt-2 bg-[#8e8f54] hover:bg-gray-300 hover:text-black text-white font-astron rounded-full px-6 sm:px-10 py-2 sm:py-3 text-base sm:text-lg transition-colors duration-200 cursor-pointer',
            { 'btn-void': shaking },
          ]"
          @animationend="shaking = false"
        >
          ENTER
        </button>
      </form>

      <div
        class="mt-10 animate-terminal-flicker font-['Times_New_Roman',_Times,_serif] text-white"
      >
        <p class="!text-[16px]">
          "This door seems locked. You can hear rumbling coming from the other
          side"
        </p>
        <p class="my-0.5 !text-[16px]">*</p>
        <p class="!text-[16px]">
          "La puerta parece cerrada con llave. Puedes oír un retumbar
          proveniente del otro lado"
        </p>
      </div>
    </template>

    <template v-else>
      <p
        class="animate-terminal-flicker font-astron tracking-[0.3em] text-2xl sm:text-3xl"
      >
        ACCESO CONCEDIDO
      </p>
    </template>
  </div>
</template>

<style scoped>
.btn-void {
  animation: btn-void 0.7s ease forwards;
}

@keyframes btn-void {
  0% {
    transform: translateX(0) rotate(0deg) scale(1);
    opacity: 1;
  }
  6% {
    transform: translateX(-6px) rotate(-1.5deg) scale(0.97);
    opacity: 0.4;
  }
  12% {
    transform: translateX(5px) rotate(1deg) scale(1.02);
    opacity: 0.9;
  }
  18% {
    transform: translateX(-4px) rotate(-2deg) scale(0.96);
    opacity: 0.2;
  }
  25% {
    transform: translateX(7px) rotate(0.5deg) scale(1.01);
    opacity: 1;
  }
  32% {
    transform: translateX(-5px) rotate(-1deg) scale(0.98);
    opacity: 0.3;
  }
  40% {
    transform: translateX(4px) rotate(2deg) scale(1);
    opacity: 0.85;
  }
  50% {
    transform: translateX(-3px) rotate(-0.5deg) scale(0.99);
    opacity: 0.15;
  }
  60% {
    transform: translateX(2px) rotate(1deg) scale(1);
    opacity: 0.7;
  }
  72% {
    transform: translateX(-1px) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  85% {
    transform: translateX(1px) rotate(0.5deg) scale(1);
    opacity: 0.6;
  }
  100% {
    transform: translateX(0) rotate(0deg) scale(1);
    opacity: 1;
  }
}

.blackout-enter-active {
  animation: blackout-pulse 1.4s ease forwards;
}

@keyframes blackout-pulse {
  0% {
    opacity: 0;
  }

  4% {
    opacity: 0.9;
  }

  6% {
    opacity: 0.1;
  }

  9% {
    opacity: 0.85;
  }

  11% {
    opacity: 0;
  }

  14% {
    opacity: 0.95;
  }

  16% {
    opacity: 0.2;
  }

  20% {
    opacity: 1;
  }

  24% {
    opacity: 0.15;
  }

  27% {
    opacity: 0.8;
  }

  30% {
    opacity: 0.05;
  }

  34% {
    opacity: 0.7;
  }

  37% {
    opacity: 0;
  }

  41% {
    opacity: 0.6;
  }

  44% {
    opacity: 0.1;
  }

  48% {
    opacity: 0.5;
  }

  52% {
    opacity: 0;
  }

  57% {
    opacity: 0.4;
  }

  61% {
    opacity: 0.05;
  }

  65% {
    opacity: 0.35;
  }

  70% {
    opacity: 0;
  }

  75% {
    opacity: 0.2;
  }

  80% {
    opacity: 0.02;
  }

  85% {
    opacity: 0.1;
  }

  92% {
    opacity: 0;
  }

  96% {
    opacity: 0.05;
  }

  100% {
    opacity: 0;
  }
}
</style>
