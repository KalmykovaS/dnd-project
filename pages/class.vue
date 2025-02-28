<template>
  <div class="container mx-auto text-white min-h-screen">
    <h1 class="mb-6">Выберите класс</h1>
    <div>
      <p class="mb-4 text-lg text-justify">
        Класс определяет, кем ваш персонаж является по профессии и боевым способностям. От этого зависят его умения, оружие, стиль боя и заклинания. Обратите внимание на указанные возможные варианты, здесь указаны те расы, которые наиболее подойдут для выбранного класса персонажа и чаще всего используются, так как дают много преимуществ.
      </p>

    </div>
    <div v-if="pending">
      <Loader />
    </div>
    <template v-else>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <li
            v-for="itemClass in data"
            :key="itemClass.id"
            class="relative block bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-all duration-300 border-2 border-transparent"
            :class="{ '!border-cyan-500 !bg-gray-700': classState === itemClass.codeName }"
        >
          <label class="flex flex-col gap-2 cursor-pointer p-4">
            <img
                :src="itemClass.image"
                :alt="itemClass.name"
                class="w-48 h-48 object-cover rounded-full mb-4 mx-auto"
            />
            <input
                type="radio"
                :value="itemClass.codeName"
                v-model="classState"
                class="hidden"
            />
            <span class="text-lg text-center custom-text-semibold">{{ itemClass.name }}</span>
            <span class="text-sm text-gray-300 mt-2">Возможные варианты: {{ itemClass.example }}</span>
            <span class="text-sm text-gray-300 mt-2">{{ itemClass.description }}</span>
          </label>
        </li>
      </ul>
      <ForwardAndBackButtons
        :prev-step="ERouteName.Race"
        :disabled="!classState"
        :next-step="ERouteName.Background"
        :next-step-id="classId"
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
import { Classes } from "~/types/common";

const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;

const { data, pending } = await useAsyncData(() => $fetch<Classes[]>(`${baseUrl}/classes`));

const stateStore = useStateStore();
const { classState, classStateId } = storeToRefs(stateStore);

const classId = computed(() => {
  if (classState.value && data.value) {
    return data.value.find((item) => item.codeName === classState.value)?.id;
  }
});

watch(classState, () => {
  stateStore.classStateId = classId.value;
});
</script>

<style scoped>

</style>