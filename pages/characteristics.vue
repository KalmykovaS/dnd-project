<template>
  <div class="container mx-auto text-white min-h-screen">
    <h1 class="mb-6">Ваш сформированный лист персонажа</h1>
    <div>
      <div
          v-if="personalPending &&
          pacePending &&
          skillsPending"
      >
        <Loader />
      </div>
      <template v-else>
        <!-- Основная информация -->
        <div class="space-y-4">
          <p class="text-xl font-bold">Имя персонажа: <span class="text-lg">{{ characterPersonalName }}</span></p>
          <p class="text-xl font-bold">Класс персонажа: <span class="text-lg">{{ personal?.name }}</span></p>
          <p class="text-xl font-bold">Раса: <span class="text-lg">{{ raceState }}</span></p>
          <p class="text-xl font-bold">Предыстория: <span class="text-lg">{{ personal?.background?.name }}</span></p>
          <p class="text-xl font-bold">Мировоззрение: <span class="text-lg">{{ worldviewState }}</span></p>
        </div>

        <!-- Дополнительная информация -->
        <div class="space-y-4">
          <div>
            <p class="text-xl">Класс доспеха (КД): {{ personal?.characteristics?.armorClass.name }}</p>
            <p>{{ personal?.characteristics?.armorClass.value }}</p>
          </div>
          <div class="text-xl">Инициатива: {{ personal?.characteristics?.initiative }}</div>
          <div class="text-xl">Скорость: {{ personal?.characteristics?.speed }}</div>
        </div>

        <div class="text-xl">Максимум хитов (hit points): {{ personal?.characteristics?.hitPoints }}</div>

        <!-- Характеристики -->
        <div class="space-y-4">
          <h2 class="text-2xl font-semibold">Характеристики:</h2>
          <ul class="space-y-2">
            <li v-for="char in characteristicsWithModifiers" :key="char.name" class="flex justify-between">
              <span class="block">{{ char.name }}</span>
              <span class="block">{{ char.value }}</span>
              <span class="block">({{ char.modifier > 0 ? '+' : '' }}{{ char.modifier }})</span>
            </li>
          </ul>
        </div>

        <!-- Бонус мастерства -->
        <div class="text-xl">
          <p>+{{ personal?.characteristics?.masteryBonus }} Бонус мастерства</p>
        </div>

        <!-- Спасброски -->
        <div class="space-y-4">
          <h2 class="text-2xl font-semibold">Спасброски:</h2>
          <ul class="space-y-2">
            <li v-for="savingThrow in savingThrowsWithModifiers" :key="savingThrow.name" class="flex justify-between">
              <span class="block">{{ savingThrow.name }}</span>
              <span class="block">({{ savingThrow.modifier > 0 ? '+' : '' }}{{ savingThrow.modifier }})</span>
            </li>
          </ul>
        </div>

        <!-- Навыки -->
        <div class="space-y-4">
          <h2 class="text-2xl font-semibold">Навыки:</h2>
          <ul class="space-y-2">
            <li v-for="skill in skillsWithModifiers" :key="skill.name" class="flex justify-between">
              <span class="block">{{ skill.name }}</span>
              <span class="block">({{ skill.modifier > 0 ? '+' : '' }}{{ skill.modifier }})</span>
            </li>
          </ul>
        </div>

        <ForwardAndBackButtons :prev-step="ERouteName.Character" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ERouteName} from "~/app/routeName.enum";
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
  worldviewState
} = storeToRefs(stateStore);

const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;

const [
  { data: personal, pending: personalPending },
  { data: pace, pending: pacePending },
  { data: skills, pending: skillsPending },
] = await Promise.all([
  useAsyncData(() => $fetch<ItemsList>(`${baseUrl}/classes/${classStateId.value}`)),
  useAsyncData(() => $fetch<ItemsList[]>(`${baseUrl}/races`)),
  useAsyncData(() => $fetch<Skill[]>(`${baseUrl}/skills`))
]);

const characterPersonalName = computed(() => characterName.value || 'Не выбрано' );

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

</script>