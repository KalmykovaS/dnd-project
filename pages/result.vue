<template>
  <div class="container">
    <h1>Ваш персонаж</h1>
    <p><strong>Раса:</strong> {{ race }}</p>
    <p><strong>Класс:</strong> {{ characterClass }}</p>
    <button @click="downloadPDF">📥 Скачать</button>
  </div>
</template>

<script setup lang="ts">
import { jsPDF } from "jspdf";
//import robotoFont from "~/assets/fonts/Roboto-Regular.ttf";

const route = useRoute();
const apiBase = useRuntimeConfig().public.apiBase;

const { data: races } = await useFetch<{ id: number; name: string }[]>(`${apiBase}/races`);
const { data: classes } = await useFetch<{ id: number; name: string }[]>(`${apiBase}/classes`);

const race = computed(() => races.value?.find(r => r.id === Number(route.query.race))?.name || "Неизвестно");
const characterClass = computed(() => classes.value?.find(c => c.id === Number(route.query.class))?.name || "Неизвестно");

const downloadPDF = () => {
  const doc = new jsPDF();
  doc.addFileToVFS("Roboto-Regular.ttf", robotoFont);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto", "normal");
  doc.text('This is a test',10, 10)
  doc.setLanguage("ru")

  doc.text("Ваш персонаж DnD", 10, 20);
  doc.text(`Раса: ${race.value}`, 10, 30);
  doc.text(`Класс: ${characterClass.value}`, 10, 40);
  doc.save("dnd-character.pdf");
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
button {
  margin-top: 20px;
}
</style>