<template>
  <div class="container mx-auto text-white min-h-screen">
    <h1 class="font-semibold mb-6">
      Проработка персонажа
    </h1>
    <p class="mb-4 text-lg">
      Перед вами четыре необязательных вопроса, которые помогут вам детальнее представить своего героя. Ответив на них, вы сделаете персонажа более живым и интересным.
    </p>
    <div>
      <div class="flex flex-col gap-4">
        <Textarea
            v-model="characterName"
            title="Имя:"
            placeholder="Как хотите назвать своего героя?"
        />
        <Textarea
            v-model="characterHistory"
            title="Краткая история:"
            placeholder="Откуда он и зачем отправился в приключение?"
        />
        <Textarea
            v-model="externalFeatures"
            title="Внешний вид:"
            placeholder="Краткое описание внешности"
        />
        <Textarea
            v-model="features"
            title="Особенности:"
            placeholder="Наличие каких-то уникальных навыков или предметов (например, семейная реликвия)?"
        />
      </div>
      <ForwardAndBackButtons
          :prev-step="ERouteName.Worldview"
          :next-step="ERouteName.Characteristics"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStateStore } from '~/stores/state';
import { storeToRefs } from 'pinia';
import { ERouteName } from "~/app/routeName.enum";
import ForwardAndBackButtons from "~/components/common/ForwardAndBackButtons.vue";

const stateStore = useStateStore();

const {
  characterName,
  characterHistory,
  externalFeatures,
  features
} = storeToRefs(stateStore);
</script>

<style scoped>
</style>