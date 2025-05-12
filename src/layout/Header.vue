<script lang="ts" setup>

import NavLink from '../components/NavLink.vue'
import LangSelectorBtn from '../components/LangSelectorBtn.vue'

</script>
<template>
    <header class="main-container-with mx-auto pt-8 pb-8 items-center relative">

        <LangSelectorBtn />

        <div class="flex items-center w-full justify-between">

            <div class="flex-none">
                <h1 class="text-3xl text-gray-800 leading-6">
                    <span class="text-cake-orange">D</span>orma<span class="text-cake-green">n</span><span
                        class="text-cake-orange">t<br>
                        S</span>oun<span class="text-cake-green">d</span><span class=" text-cake-orange">s</span>
                </h1>
            </div>

            <div class="flex-none">
                <nav class="flex gap-2">

                    <NavLink route="/" text="Home" />

                    <NavLink route="/work" text="Work" />

                    <NavLink route="/credits" text="Credits" />

                    <NavLink route="/discography" text="Discography" />

                    <NavLink route="/audio" text="Audio" />

                    <NavLink route="/contact" text="Contact" />
                </nav>
            </div>
        </div>
    </header>
</template>