<template>
  <div class="container mx-auto text-white min-h-screen">
    <h1 class="mb-6">Лист персонажа</h1>
    <div>
      <div v-if="loading">
        <Loader />
      </div>
      <div v-else>
        <template v-if="raceState">
          <div class="space-y-6">
            <div class="bg-gray-800 p-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-4">
              <p>
                <span class="text-sm opacity-50 custom-text-semibold block">Имя персонажа: </span>
                <span class="text-lg">{{ characterPersonalName }}</span>
              </p>
              <p>
                <span class="text-sm opacity-50 custom-text-semibold block">Класс персонажа: </span>
                <span class="text-lg">{{ personal?.name }}</span>
              </p>
              <p>
                <span class="text-sm opacity-50 custom-text-semibold block">Раса: </span>
                <span class="text-lg">{{ chosenRace?.name }}</span>
              </p>
              <p>
                <span class="text-sm opacity-50 custom-text-semibold block">Предыстория: </span>
                <span class="text-lg">{{ personal?.background?.name }}</span>
              </p>
              <p>
                <span class="text-sm opacity-50 custom-text-semibold block">Мировоззрение: </span>
                <span class="text-lg">{{ chosenWorldview?.name }}</span>
              </p>
            </div>

            <div class="bg-gray-800 p-4 rounded-lg shadow-md space-y-2">
              <h2 class="text-2xl custom-text-semibold mb-5">Боевые характеристики</h2>
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <p>
                  <span class="text-sm opacity-50 custom-text-semibold block">Класс доспеха (КД): </span>
                  <span class="text-lg">{{ personal?.characteristics?.armorClass.value }}</span>
                </p>
                <p>
                  <span class="text-sm opacity-50 custom-text-semibold block">Инициатива: </span>
                  <span class="text-lg">{{ personal?.characteristics?.initiative }}</span>
                </p>
                <p>
                  <span class="text-sm opacity-50 custom-text-semibold block">Максимум хитов (HP): </span>
                  <span class="text-lg">{{ personal?.characteristics?.hitPoints }}</span>
                </p>
                <p>
                  <span class="text-sm opacity-50 custom-text-semibold block">Скорость: </span>
                  <span class="text-lg">{{ personal?.characteristics?.speed }}</span>
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 class="text-2xl font-semibold mb-5 text-center">Характеристики</h2>
                <div class="flex flex-col gap-4">
                  <div
                      v-for="(char, index) in characteristicsWithModifiers"
                      :key="index"
                      class="flex flex-col gap-2 items-center bg-gradient-to-b from-cyan-900 via-gray-800 to-gray-800 p-4 rounded-xl shadow-md border border-cyan-700">

                    <span class="text-lg custom-text-semibold text-cyan-200">{{ char.name }}</span>
                    <span class="text-3xl custom-text-bold">{{ char.value }}</span>
                    <span>
                    <span class="text-sm opacity-70">Модификатор: </span>
                    <span class="text-lg text-cyan-200 custom-text-semibold">{{ char.modifier > 0 ? '+' : '' }}{{ char.modifier }}</span>
                  </span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-4">
                <div class="bg-gradient-to-b from-cyan-900 via-gray-800 to-gray-800 p-4 rounded-xl shadow-md border border-cyan-700">
                  <span class="text-lg">Бонус мастерства: </span>
                  <span class="text-2xl text-cyan-200">+{{ personal?.characteristics?.masteryBonus }}</span>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg shadow-md">
                  <h2 class="text-2xl font-semibold mb-5">Спасброски</h2>
                  <ul class="space-y-2">
                    <li
                        v-for="(savingThrow, index) in savingThrowsWithModifiers"
                        :key="index"
                        class="flex justify-between border-b border-gray-600 pb-1">
                      <span class="text-lg opacity-80">{{ savingThrow.name }}</span>
                      <span class="text-xl text-cyan-200">{{ savingThrow.modifier > 0 ? '+' : '' }}{{ savingThrow.modifier }}</span>
                    </li>
                  </ul>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg shadow-md">
                  <h2 class="text-2xl font-semibold mb-5">Атаки</h2>
                  <div class="flex flex-col gap-4 pb-2">
                    <div>
                      <p class="text-sm opacity-70 custom-text-semibold">Название:</p>
                      <p class="text-lg mt-1">{{ personal?.characteristics?.weapon.name }}</p>
                    </div>
                    <div>
                      <p class="text-sm opacity-70 custom-text-semibold">Бонус атаки</p>
                      <p class="text-lg mt-1">{{ personal?.characteristics?.weapon.attack }}</p>
                    </div>
                    <div>
                      <p class="text-sm opacity-70 custom-text-semibold">Урон</p>
                      <p class="text-lg mt-1">{{ personal?.characteristics?.weapon.damage }}</p>
                    </div>
                  </div>

                </div>
              </div>

              <div class="bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 class="text-2xl font-semibold mb-5">Навыки</h2>
                <ul class="space-y-2">
                  <li
                      v-for="(skill, index) in skillsWithModifiers"
                      :key="index"
                      class="flex justify-between border-b border-gray-600 pb-1">
                    <span class="text-lg opacity-80">{{ skill.name }}</span>
                    <span class="text-xl text-cyan-200">{{ skill.modifier > 0 ? '+' : '' }}{{ skill.modifier }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 class="text-2xl font-semibold mb-5">Личное описание</h2>
              <div class="flex flex-col gap-4">
                <p>
                  <span class="text-sm opacity-50 custom-text-semibold">Краткая история: </span>
                  <span class="text-lg">{{ characterPersonalHistory }}</span>
                </p>
                <p>
                  <span class="text-sm opacity-50 custom-text-semibold">Внешний вид: </span>
                  <span class="text-lg">{{ characterPersonalExternalFeatures }}</span>
                </p>
                <p>
                  <span class="text-sm opacity-50 custom-text-semibold">Особенности: </span>
                  <span class="text-lg">{{ characterPersonalFeatures }}</span>
                </p>
              </div>
            </div>
          </div>

          <ForwardAndBackButtons :prev-step="ERouteName.Character" />
        </template>
        <div
            v-else
            class="flex flex-col items-center justify-center bg-gray-900 text-white"
        >
          <span class="text-lg mt-15 mb-4">Сначала пройдите опрос</span>
          <NuxtLink
              :to="{ name: ERouteName.Main }"
              class="px-6 py-3 bg-cyan-500 text-gray-900 custom-font-semibold rounded-lg shadow-md hover:bg-cyan-400 hover:shadow-cyan-500/40 transition-all duration-300"
          >
            Вернуться на главную
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ERouteName } from "~/app/routeName.enum";
import Loader from "~/components/Loader.vue";
import ForwardAndBackButtons from "~/components/common/ForwardAndBackButtons.vue";
import { useStateStore } from '~/stores/state';
import { storeToRefs } from 'pinia';
import type { ItemsList, CommonStats, SavingThrows, Skill } from "~/types/common";

interface CharacteristicWithModifier {
  name: string;
  value: number;
  modifier: number;
}

interface SavingThrowsWithModifier {
  name: string;
  modifier: number;
}

const stateStore = useStateStore();
const {
  classStateId,
  characterName,
  raceState,
  worldviewState,
  characterHistory,
  externalFeatures,
  features,
} = storeToRefs(stateStore);

const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;

const [
  { data: personal, pending: personalPending, error: personalError },
  { data: paces, pending: pacePending, error: paceError },
  { data: skills, pending: skillsPending, error: skillsError },
  { data: worldviews, pending: worldviewsPending, error: worldviewError },
] = await Promise.all([
  useAsyncData(() => $fetch<ItemsList>(`${baseUrl}/classes/${classStateId.value}`)),
  useAsyncData(() => $fetch<ItemsList[]>(`${baseUrl}/races`)),
  useAsyncData(() => $fetch<Skill[]>(`${baseUrl}/skills`)),
  useAsyncData(() => $fetch<ItemsList[]>(`${baseUrl}/worldview`))
]);

watchEffect(() => {
  const errorToThrow = personalError.value || paceError.value || skillsError.value || worldviewError.value;
  if (errorToThrow) {
    throw createError({
      statusCode: errorToThrow?.statusCode,
      statusMessage: errorToThrow?.statusMessage
    })
  }
});

const loading = computed(() => {
  return personalPending.value &&
      pacePending.value &&
      skillsPending.value &&
      worldviewsPending.value
});

const characterPersonalName = computed(() => characterName.value || 'Не выбрано' );
const characterPersonalHistory = computed(() => characterHistory.value || 'Не выбрано' );
const characterPersonalExternalFeatures = computed(() => externalFeatures.value || 'Не выбрано' );
const characterPersonalFeatures = computed(() => features.value || 'Не выбрано' );

const characteristicNames: Record<string, string> = {
  strength: "Сила",
  dexterity: "Ловкость",
  constitution: "Телосложение",
  intelligence: "Интеллект",
  wisdom: "Мудрость",
  charisma: "Харизма"
};

const calculateModifier = (value: number): number => Math.floor((value - 10) / 2);

const characteristicsWithModifiers = computed<CharacteristicWithModifier[]>(() => {
  if (!personal.value?.characteristics?.common) return [];

  return Object.entries(personal.value.characteristics.common).map(([key, value]) => ({
    name: characteristicNames[key] || key,
    value: value as number,
    modifier: calculateModifier(value as number),
  }));
});

const savingThrowsWithModifiers = computed<SavingThrowsWithModifier[]>(() => {
  const characteristics = personal.value?.characteristics;
  if (!characteristics?.savingThrows || !characteristics.common) return [];

  return Object.entries(characteristics.common).map(([key, value]) => {
    const isSavingThrow = characteristics.savingThrows[key as keyof SavingThrows];
    const baseModifier = calculateModifier(value);

    const modifier = isSavingThrow ? baseModifier + 2 : baseModifier;

    return {
      name: characteristicNames[key as keyof CommonStats] || key,
      modifier,
    };
  });
});

const skillsWithModifiers = computed(() => {
  if (!skills || !personal.value?.characteristics) return [];

  const characteristics = personal.value.characteristics.common;
  const personalSkills = personal.value.characteristics.personalSkills || [];

  return skills.value?.map((skill) => {
    // Получаем соответствующую характеристику для навыка
    const characteristicValue = characteristics[skill.modifier as keyof CommonStats];

    // Если характеристика есть, считаем базовый модификатор
    const baseModifier = calculateModifier(characteristicValue);

    // Проверяем, есть ли данный навык в личных навыках
    const isPersonalSkill = personalSkills
        .some((personalSkill) => personalSkill.codeName === skill.codeName);

    // Если навык в personalSkills, добавляем +2 к модификатору
    const modifier = isPersonalSkill ? baseModifier + 2 : baseModifier;

    return {
      name: skill.name,
      modifier,
    };
  });
});

const chosenRace = computed(() => {
  return paces?.value?.find((race) => race.codeName === raceState.value);
});

const chosenWorldview = computed(() => {
  return worldviews?.value?.find((worldview) => worldview.codeName === worldviewState.value);
});

</script>