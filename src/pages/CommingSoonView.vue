<template>
  <div
    class="min-h-screen bg-[#000000] flex items-center justify-center overflow-hidden relative"
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
            stroke-width="5"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <!-- Main content with futuristic frame -->
    <div class="relative z-10 max-w-4xl w-full">
      <!-- Industrial frame with animated border -->
      <div class="p-1 relative">
        <div
          class="absolute inset-0 bg-gradient-to-r from-[#ffa069] via-[#bffbca] to-[#ffa069] opacity-30 animate-pulse"
        ></div>
        <div class="relative bg-black border border-[#ffa069]/30 p-8">
          <!-- Corner accents -->
          <div
            class="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-[#bffbca]"
          ></div>
          <div
            class="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-[#bffbca]"
          ></div>
          <div
            class="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-[#bffbca]"
          ></div>
          <div
            class="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-[#bffbca]"
          ></div>

          <!-- Content -->
          <div class="text-center py-16">
            <h1
              class="text-[#f5f5f5] text-7xl font-bold tracking-widest mb-8 glitch-text"
            >
              <span class="relative inline-block w-full h-20">
                <span
                  class="absolute top-0 left-0 w-full h-full text-[#ffa069] animate-glitch-1"
                  >Dormant Sounds</span
                >
                <span
                  class="absolute top-0 left-0 w-full h-full text-[#bffbca] animate-glitch-2"
                  >Dormant Sounds</span
                >
              </span>
            </h1>
            <div class="h-1 w-64 mx-auto bg-[#ffa069]"></div>
            <p
              class="!text-[#a0a0a0] mt-8 text-2xl font-thedus-condensed-light"
            >
              System initialization in progress
            </p>

            <!-- Loading indicator -->
            <div
              class="mt-12 w-64 h-2 bg-gray-800 mx-auto rounded-full overflow-hidden"
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

<style scoped>
@keyframes glitch-1 {
  0%,
  100% {
    opacity: 0;
    transform: translate(0);
  }

  20% {
    opacity: 0.3;
    transform: translate(-4px, 2px);
  }

  40% {
    opacity: 0;
  }

  60% {
    opacity: 0.3;
    transform: translate(2px, -1px);
  }

  80% {
    opacity: 0;
  }
}

@keyframes glitch-2 {
  0%,
  100% {
    opacity: 0;
    transform: translate(0);
  }

  20% {
    opacity: 0.3;
    transform: translate(5px, -2px);
  }

  40% {
    opacity: 0;
  }

  60% {
    opacity: 0.3;
    transform: translate(-2px, 0px);
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
  animation: glitch-1 3s infinite linear alternate-reverse;
}

.animate-glitch-2 {
  animation: glitch-2 2.7s infinite linear alternate-reverse;
}

.animate-loading-bar {
  animation: loading-bar 8s infinite;
}

.animate-blink {
  animation: blink 1.5s infinite;
}
</style>
