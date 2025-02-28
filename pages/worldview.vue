<template>
  <div class="container mx-auto text-white min-h-screen">
    <h1 class="mb-6">Выберите мировоззрение</h1>
    <div>
      <p class="mb-4 text-lg text-justify">
        это важный аспект, который помогает определить, как персонаж воспринимает мир и что для него важно в определенных ситуациях. В игре мировоззрение не только влияет на принятие решений персонажа, но и помогает лучше понять его мотивацию, цели и подход к взаимодействию с другими.
      </p>
    </div>
    <div v-if="pending">
      <Loader />
    </div>
    <template v-else>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <li
            v-for="view in data"
            :key="view.id"
            class="relative block bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-all duration-300 border-2 border-transparent"
            :class="{ '!border-cyan-500 !bg-gray-700': worldviewState === view.codeName }"
        >
          <label class="flex flex-col gap-2 cursor-pointer p-4">
            <input
                type="radio"
                :value="view.codeName"
                v-model="worldviewState"
                class="hidden"
            />
            <span class="text-lg text-center custom-text-semibold">{{ view.title }}</span>
            <span class="text-sm text-gray-300 mt-2">{{ view.description }}</span>
          </label>
        </li>
      </ul>
      <ForwardAndBackButtons
          :prev-step="ERouteName.Background"
          :prev-step-id="classStateId"
          :disabled="!worldviewState"
          :next-step="ERouteName.Character"
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
import { Worldview } from "~/types/common";

const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;

const { data, pending } = await useAsyncData(() => $fetch<Worldview[]>(`${baseUrl}/worldview`));

const stateStore = useStateStore();
const { classStateId, worldviewState } = storeToRefs(stateStore);

console.log(classStateId.value)
</script>

<style scoped>

</style>