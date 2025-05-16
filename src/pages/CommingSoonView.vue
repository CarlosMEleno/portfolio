<template>
  <div
    class="min-h-screen bg-[#000000] flex items-center justify-center overflow-hidden relative px-1 sm:px-4"
  >
    <!-- Industrial/tech background pattern -->
    <div class="absolute inset-0 z-0">
      <svg
        class="w-full h-full opacity-10"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="#ffa069"
            stroke-width="7"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <!-- Main content with futuristic frame -->
    <div class="relative z-10 max-w-4xl w-full">
      <!-- Industrial frame with animated border -->
      <div class="p-[5px] relative">
        <div
          class="absolute inset-0 bg-gradient-to-r from-cake-orange via-cake-green to-cake-orange opacity-100 animate-pulse"
        ></div>
        <div class="relative bg-black border border-[#ffa069]/30 p-8">
          <!-- Corner accents -->
          <div
            class="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-cake-green animate-pulse"
          ></div>
          <div
            class="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-cake-green animate-pulse"
          ></div>
          <div
            class="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-cake-green animate-pulse"
          ></div>
          <div
            class="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-cake-green animate-pulse"
          ></div>

          <!-- Decorative circular element -->
          <div
            class="absolute top-4 right-4 w-[8px] h-[24px] rounded-full bg-cake-orange/30 border border-cake-green animate-pulse"
          ></div>

          <div
            class="absolute top-4 right-[30px] w-[8px] h-[8px] rounded-full bg-cake-orange/30 border border-cake-green animate-pulse"
          ></div>

          <div
            class="absolute bottom-4 left-4 w-[8px] h-[24px] rounded-full bg-cake-orange/30 border border-cake-green animate-pulse"
          ></div>

          <div
            class="absolute bottom-4 left-[30px] w-[8px] h-[8px] rounded-full bg-cake-orange/30 border border-cake-green animate-pulse"
          ></div>

          <div
            class="absolute top-4 left-[15px] w-[8px] h-[8px] rounded-full bg-cake-orange/30 border border-cake-green animate-pulse"
          ></div>

          <div
            class="absolute bottom-4 right-[15px] w-[8px] h-[8px] rounded-full bg-cake-orange/30 border border-cake-green animate-pulse"
          ></div>

          <div class="text-center pb-16 pt-8">
            <div
              class="text-[#f5f5f5] text-4xl font-thedus-stencil-wide font-[600] mb-12"
            >
              <div class="animate-marquee">
                <template v-for="i in 40" :key="i">
                  <h1>
                    <span class="ms-3 text-cake-orange animate-glitch-1"
                      >DORMANT SOUNDS</span
                    >
                  </h1>
                  <h1>
                    <span class="ms-3 text-cake-green animate-glitch-2"
                      >DORMANT SOUNDS</span
                    >
                  </h1>
                </template>
              </div>
            </div>
            <div class="h-[1px] max-w-120 mx-auto bg-cake-orange"></div>
            <p
              class="!text-[#a0a0a0] mt-8 text-2xl font-thedus-condensed-light"
            >
              System initialization in progress
            </p>

            <!-- Loading indicator -->
            <div
              class="mt-9 max-w-64 h-2 bg-gray-800 mx-auto rounded-full overflow-hidden"
            >
              <div class="h-full bg-[#bffbca] animate-loading-bar"></div>
            </div>
            <p class="!text-[#8ccbc2] mt-4 text-xl font-thedus-condensed-light">
              # STANDBY FOR FURTHER INSTRUCTIONS
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes text-banish {
  0%,
  100% {
    opacity: 0;
  }

  20% {
    opacity: 0.3;
  }

  30% {
    opacity: 0.4;
  }

  40% {
    opacity: 0.6;
  }

  50% {
    opacity: 0.9;
  }

  70% {
    opacity: 0.3;
  }

  80% {
    opacity: 0;
  }
}

@keyframes loading-bar {
  0% {
    width: 0;
  }

  50% {
    width: 70%;
  }

  100% {
    width: 100%;
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.2;
  }
}

.animate-glitch-1 {
  animation: text-banish 7s infinite linear alternate-reverse;
}

.animate-glitch-2 {
  animation: text-banish 4.7s infinite linear alternate-reverse;
}

.animate-loading-bar {
  animation: loading-bar 8s infinite alternate-reverse;
}

.animate-marquee {
  white-space: nowrap;
  overflow: hidden;
  position: relative;
}

.animate-marquee h1 {
  display: inline-block;
  animation: marquee 80s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-2000%);
  }
}
</style>
