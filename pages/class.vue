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
      <RadioList
          :items="data || []"
          :modal-value="classState"
          @update:modelValue="classState = $event"
      />
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
import RadioList from "~/components/common/RadioList.vue";
import ForwardAndBackButtons from '~/components/common/ForwardAndBackButtons.vue';
import { ERouteName } from "~/app/routeName.enum";
import type { ItemsList } from "~/types/common";

const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;

const { data, pending } = await useAsyncData(() => $fetch<ItemsList[]>(`${baseUrl}/classes`));

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