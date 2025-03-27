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
      <RadioList
          :items="data || []"
          :modal-value="raceState"
          @update:modelValue="raceState = $event"
      />
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
import RadioList from '~/components/common/RadioList.vue';
import ForwardAndBackButtons from '~/components/common/ForwardAndBackButtons.vue';
import { ERouteName } from "~/app/routeName.enum";
import type { ItemsList } from "~/types/common";

const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;

const { data, pending, error } = await useAsyncData(() => $fetch<ItemsList[]>(`${baseUrl}/races`));

if (error.value) {
  console.error("Ошибка при загрузке данных:", error);

  throw createError({
    statusCode: error.value?.statusCode,
    statusMessage: error.value?.statusMessage
  })
}

const stateStore = useStateStore();
const { raceState } = storeToRefs(stateStore);

</script>