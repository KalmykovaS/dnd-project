<template>
    <div>
      <label>
        <input
            type="text"
            :value="modelValue"
            @input="handleInput"
        >
      </label>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>