<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
    <li
        v-for="item in items"
        :key="item.id"
        class="relative block bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-all duration-300 border-2 border-transparent"
        :class="{ '!border-cyan-500 !bg-gray-700': modalValue === item.codeName }"
    >
      <label class="flex flex-col gap-2 cursor-pointer p-4">
        <img
            v-if="item.image"
            :src="item.image"
            :alt="item.name"
            class="w-48 h-48 object-cover rounded-full mb-4 mx-auto"
        />
        <input
            type="radio"
            :value="item.codeName"
            :checked="modalValue === item.codeName"
            @change="$emit('update:modelValue', item.codeName)"
            class="hidden"
        />
        <span class="text-lg text-center custom-text-semibold">{{ item.name }}</span>
        <span
            v-if="item.example"
            class="text-sm text-gray-300 mt-2"
        >
          Возможные варианты: {{ item.example }}
        </span>
        <span class="text-sm text-gray-300 mt-2">{{ item.description }}</span>
      </label>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { ItemsList } from "~/types/common";

defineProps<{
  items: ItemsList[];
  modalValue: string;
}>();

defineEmits(['update:modelValue']);

</script>