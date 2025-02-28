<template>
  <div class="container mx-auto text-white min-h-screen">
    <div class="relative mb-6">
      <img
          src="/main-min.png"
          alt="Главное изображение"
          class="w-full h-80 object-cover rounded-lg shadow-lg"
      />
      <div class="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
    </div>
    <div class="content">
      <h1 class="mb-6">
        Добро пожаловать в мир приключений!
      </h1>
      <p class="mb-4 text-lg">
        Dungeons & Dragons — это мир героев и злодеев, магии и клинков, великих свершений и смертельных опасностей. Здесь вас ждут захватывающие путешествия, древние тайны, встречи с легендарными существами и испытания, которые проверят вашу смекалку, храбрость и дух.
      </p>
      <p class="mb-4 text-lg">
        В этом мире вы можете стать кем угодно: от храброго воина, готового сразиться с драконом, до хитроумного мага, плетущего заклинания древней силы. Вместе с отрядом единомышленников вам предстоит исследовать загадочные подземелья, заключать союзы, раскрывать заговоры и, конечно же, становиться частью эпической истории, где каждое ваше решение имеет значение.
      </p>
      <p class="mb-4 text-lg">
        Ваше приключение начинается прямо здесь — с создания персонажа, который станет вашим воплощением в этом мире. Готовы ли вы ступить на путь героя?
      </p>
    </div>
    <div class="flex justify-center gap-6 flex-wrap mt-6">
      <NuxtLink
          v-if="!raceState"
          :to="{name: ERouteName.Race}"
          class="text-gray-900 custom-text-semibold px-6 py-2 rounded-lg bg-cyan-500 shadow-lg disabled:bg-gray-600 hover:bg-cyan-400 hover:shadow-cyan-500/40 transition-all duration-300"
      >
        Начать
      </NuxtLink>
      <button
          v-else
          @click="clearAllFromLocalStorage"
          class="px-6 py-2 rounded-lg bg-cyan-500 shadow-lg disabled:bg-gray-600 hover:bg-cyan-400 hover:shadow-cyan-500/40 transition-all duration-300"
      >
        Начать заново
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ERouteName} from "~/app/routeName.enum";
import { useStateStore } from '~/stores/state';
import { storeToRefs } from 'pinia';

const stateStore = useStateStore();
const { raceState } = storeToRefs(stateStore);

function clearAllFromLocalStorage() {
  stateStore.clearStorage();
}
</script>

<style scoped>
</style>