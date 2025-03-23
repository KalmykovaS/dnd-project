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
      <RadioList
          :items="data || []"
          :modal-value="worldviewState"
          @update:modelValue="worldviewState = $event"
      />
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
import RadioList from "~/components/common/RadioList.vue";
import ForwardAndBackButtons from '~/components/common/ForwardAndBackButtons.vue';
import { ERouteName } from "~/app/routeName.enum";
import type { ItemsList } from "~/types/common";

const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;

const { data, pending, error } = await useAsyncData(() => $fetch<ItemsList[]>(`${baseUrl}/worldview`));

if (error.value) {
  throw createError({
    statusCode: error.value?.statusCode,
    statusMessage: error.value?.statusMessage
  })
}

const stateStore = useStateStore();
const { classStateId, worldviewState } = storeToRefs(stateStore);
</script>