<template>
  <div class="container mx-auto text-white min-h-screen">
    <h1 class="mb-6">Ваша предыстория</h1>
    <div>
      <p class="mb-4 text-lg text-justify">
        Истоки истории вашего персонажа могут описывать, почему он выбрал дорогу приключений, и как он стал тем, кем является. Некоторые персонажи вступают на путь искателей приключений после трагедии, например, гибели родных, разрушения их деревни или предательства со стороны друзей. Другие же были избраны судьбой — божество, пророчество или таинственный артефакт могли направить их к великому предназначению.
      </p>
      <p class="mb-4 text-lg text-justify">
        Предыстория ниже выбрана на основании класса, она нужна для некоторых характеристик, вы можете описать свою предысторию более подробно на следующих страницах.
      </p>

    </div>
    <div v-if="pending">
      <Loader />
    </div>
    <template v-else>
      <div class="flex items-center flex-wrap md:flex-nowrap gap-8 p-6 bg-gray-800 text-white rounded-2xl shadow-lg mt-12">
        <img
            :src="backgroundData?.image"
            :alt="backgroundData?.codeName"
            class="w-80 h-80 object-cover rounded-lg border-4 border-gray-500 shadow-md"
        />
        <div>
          <h2 class="text-2xl custom-text-semibold">{{ backgroundData?.name }}</h2>
          <p class="text-gray-300 mt-2">{{ backgroundData?.description }}</p>
        </div>
      </div>
      <ForwardAndBackButtons
          :prev-step="ERouteName.Class"
          :next-step="ERouteName.Worldview"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ERouteName } from "~/app/routeName.enum.js";
import Loader from "~/components/Loader.vue";
import ForwardAndBackButtons from "~/components/common/ForwardAndBackButtons.vue";
import type { ItemsList } from "~/types/common";

const route = useRoute();

const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;

const { data, pending, error } = await useAsyncData(() => $fetch<ItemsList>(`${baseUrl}/classes/${route.params.id}`));

if (error.value) {
  console.error("Ошибка при загрузке данных:", error);

  throw createError({
    statusCode: error.value?.statusCode,
    statusMessage: error.value?.statusMessage
  })
}

const backgroundData = computed(() => data.value?.background);

</script>