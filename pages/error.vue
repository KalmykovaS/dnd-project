<template>
  <template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 class="!text-9xl font-bold text-cyan-500">404</h1>
      <p class="text-2xl mt-4">Страница не найдена</p>
      <p class="text-gray-400 mt-2">Кажется, вы забрели в неизведанные земли...</p>

      <NuxtLink
          :to="{ name: ERouteName.Main }"
          class="mt-6 px-6 py-3 bg-cyan-500 text-gray-900 custom-font-semibold rounded-lg shadow-md hover:bg-cyan-400 hover:shadow-cyan-500/40 transition-all duration-300"
      >
        Вернуться на главную
      </NuxtLink>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { ERouteName } from "~/app/routeName.enum";

</script>

<style scoped>

</style>