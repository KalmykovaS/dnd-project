<template>
  <div class="flex flex-col space-y-2">
    <label class="text-lg font-semibold italic">{{ title }}</label>
    <textarea
        :value="modelValue"
        @input="handleInput"
        class="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none
            focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-none
            placeholder-gray-400"
        rows="4"
        :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string
  title?: string,
  placeholder?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
};
</script>