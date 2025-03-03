<template>
  <header class="bg-gray-800 header">
    <div class="flex justify-between items-center container mx-auto header__container">
      <NuxtLink
          :to="{ name: ERouteName.Main }"
          class="text-gray-400 hover:text-cyan-200 transition duration-300"
      >
        <img width="100" height="auto" src="/image/dnd-logo.svg" alt="Лого">
      </NuxtLink>
      <nav class="flex gap-8">
        <NuxtLink
          :to="{ name: ERouteName.Main }"
          class="text-gray-400 hover:text-cyan-200 transition duration-300"
        >
          Главная
        </NuxtLink>
        <NuxtLink
            :to="{ name: ERouteName.Characteristics }"
            class="text-gray-400 hover:text-cyan-200 transition duration-300"
        >
          Лист персонажа
        </NuxtLink>
      </nav>
    </div>
  </header>
  <main>
    <slot/>
  </main>
  <footer class="bg-gray-900 text-gray-400 text-center p-2">D&D project, {{ currentYear }}</footer>
</template>

<script setup lang="ts">
import {ERouteName} from "~/app/routeName.enum";

const currentYear = ref<number>(new Date().getFullYear());
</script>

<style scoped>
.header__container {
  padding: 0 15em;
  margin-bottom: 4em;
}

@media screen and (max-width: 1024px) {
  .header__container {
    padding: 0 2em;
  }
}
</style>