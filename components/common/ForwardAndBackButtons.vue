<template>
  <div class="flex justify-center gap-6 flex-wrap mt-6">
    <button
        v-if="prevStep"
        @click="toPrevStep"
        class="px-6 py-2 rounded-lg bg-cyan-500 shadow-lg disabled:bg-gray-600 hover:bg-cyan-400 hover:shadow-cyan-500/40 transition-all duration-300"
    >
      Назад
    </button>
    <button
        v-if="nextStep"
        @click="toNextStep"
        :disabled="!!disabled"
        class="px-6 py-2 rounded-lg bg-cyan-500 shadow-lg disabled:bg-gray-600 hover:bg-cyan-400 hover:shadow-cyan-500/40 transition-all duration-300"
    >
      Далее
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  disabled?: boolean | null;
  nextStep?: string;
  nextStepId?: number | string;
  prevStep?: string;
  prevStepId?: number | string;
}>();

const router = useRouter();

function toNextStep() {
  if (!props.disabled) {
    router.push({ name: props.nextStep, params: { id: props.nextStepId }});
  }
}

function toPrevStep() {
  router.push({ name: props.prevStep, params: { id: props.prevStepId } });
}
</script>