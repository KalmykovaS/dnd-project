<template>
  <div class="container mx-auto text-white min-h-screen">
    <h1 class="mb-6">Выберите расу</h1>
    <div>
      <p class="mb-4 text-lg text-justify">
        В фэнтезийных мирах, таких как Dungeons & Dragons, раса определяет происхождение вашего персонажа, его особенности, культуру и физические данные. Каждая раса имеет свои уникальные бонусы и характеристики.
      </p>
      <p class="mb-6 text-lg text-justify">
        Если вы новичок, Человек – хороший старт, так как он не имеет сложных механик. Если вам нравится идея стойкого воина, выбирайте Дварфа или Полуорка. Если хочется играть за ловкого героя – Эльф или Халфлинг подойдут лучше.
      </p>

    </div>
    <div v-if="pending">
      <Loader />
    </div>
    <template v-else>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <li
            v-for="race in data"
            :key="race.id"
            class="relative block bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-all duration-300 border-2 border-transparent"
            :class="{ '!border-cyan-500 !bg-gray-700': raceState === race.codeName }"
        >
          <label class="flex flex-col gap-2 cursor-pointer p-4">
            <img
                :src="race.image"
                :alt="race.name"
                class="w-48 h-48 object-cover rounded-full mb-4 mx-auto"
            />
            <input
                type="radio"
                :value="race.codeName"
                v-model="raceState"
                class="hidden"
            />
            <span class="text-lg text-center custom-text-semibold">{{ race.name }}</span>
            <span class="text-sm text-gray-300 mt-2">{{ race.description }}</span>
          </label>
        </li>
      </ul>
      <ForwardAndBackButtons
        :prev-step="ERouteName.Main"
        :disabled="!raceState"
        :next-step="ERouteName.Class"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import Loader from '~/components/Loader.vue';
import { useStateStore } from '~/stores/state';
import { storeToRefs } from 'pinia';
import ForwardAndBackButtons from '~/components/common/ForwardAndBackButtons.vue';
import { ERouteName } from "~/app/routeName.enum";
import { Races } from "~/types/common";

const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;

const { data, pending } = await useAsyncData(() => $fetch<Races[]>(`${baseUrl}/races`));

const stateStore = useStateStore();
const { raceState } = storeToRefs(stateStore);

</script>

<style scoped>

</style>