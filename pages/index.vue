<template>
  <div class="container mx-auto p-6 text-white min-h-screen">
    <h1 class="text-3xl font-bold mb-6">Выберите расу</h1>
    <div>
<!--      Имя: Как хотите назвать своего героя?-->
<!--      Краткая история: Откуда он и зачем отправился в приключение?-->
<!--      Внешний вид: краткое описание внешности.-->
<!--      Особенности: наличие каких-то уникальных навыков или предметов (например, семейная реликвия).-->

      <p class="mb-4 text-lg">
        В фэнтезийных мирах, таких как Dungeons & Dragons (D&D), раса определяет происхождение вашего персонажа, его особенности, культуру и физические данные. Каждая раса имеет свои уникальные бонусы и характеристики.
      </p>
      <p class="mb-6 text-lg">
        Если вы новичок, Человек – хороший старт, так как он не имеет сложных механик. Если вам нравится идея стойкого воина, выбирайте Дварфа или Полуорка. Если хочется играть за ловкого героя – Эльф или Халфлинг подойдут лучше.
      </p>

    </div>
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <li
          v-for="race in data"
          :key="race.id"
          class="relative block bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-all border-2 border-transparent"
          :class="{ '!border-blue-500 !bg-gray-700': selectedRace === race.id }"
      >
        <label class="flex flex-col items-center gap-2 cursor-pointer p-4">
          <img
              :src="race.image"
              :alt="race.name"
              class="w-full h-32 object-cover rounded-md mb-4"
          />
          <input
              type="radio"
              :value="race.id"
              v-model="selectedRace"
              class="hidden"
          />
          <span class="text-lg font-semibold">{{ race.name }}</span>
          <span class="text-sm text-gray-300 mt-2">{{ race.description }}</span>
        </label>
      </li>
    </ul>
    <button
        @click="nextStep"
        :disabled="!selectedRace"
        class="mt-6 block mx-auto bg-blue-600 px-6 py-2 rounded-lg text-white font-bold disabled:bg-gray-600 transition-all hover:bg-blue-700"
    >
      Далее
    </button>
  </div>
</template>

<script setup lang="ts">
import { useStateStore } from '~/stores/state';
import { storeToRefs } from 'pinia';

const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;

export interface Races {
  id: number;
  name: string;
  description: string;
  image: string;
}

const { data } = await useFetch<Races[]>(`${baseUrl}/races`);

const stateStore = useStateStore();

const { cart } = storeToRefs(stateStore);
console.log('cart', cart.value);
console.log('data.value', data.value);

const selectedRace = ref<number | null>(null);
console.log('selectedRace', selectedRace.value);
const router = useRouter();

const nextStep = () => {
  if (selectedRace.value) {
    router.push(`/class?race=${selectedRace.value}`);
  }
};

watch(() => selectedRace.value, (val) => {
  console.log(val, 'selectedRace.value val')
})
</script>

<style scoped>

</style>