<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <li
        v-for="item in data"
        :key="item.id"
        class="relative block bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-all duration-300 border-2 border-transparent"
        :class="{ '!border-cyan-500 !bg-gray-700': raceState === item.codeName }"
    >
      <label class="flex flex-col items-center gap-2 cursor-pointer p-4">
        <img
            :src="item.image"
            :alt="item.name"
            class="w-48 h-48 object-cover rounded-full mb-4"
        />
        <input
            type="radio"
            :value="item.codeName"
            v-model="raceState"
            class="hidden"
        />
        <span class="text-lg font-semibold">{{ item.name }}</span>
        <span class="text-sm text-gray-300 mt-2">{{ item.description }}</span>
      </label>
    </li>
  </ul>
</template>

<script lang="ts" setup>
export interface Races {
  id: number;
  name: string;
  codeName: string;
  description: string;
  image: string;
}

defineProps<{
  data: Races[];
}>()
</script>