<template>
  <h1>Post {{ id }}</h1>
  <p>Post content</p>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'post',
})

const route = useRoute();
const id = computed(() => route.params.id);
// использовать useFetch с номером id для вывода текста

// просто $fetch это обертка над fetch, который работает на сервере, он нам нужен только, если отправлять запросы на сервер (типа формы)
// код компонентов исполняется на клиенте и на сервере. useFetch и useAsyncData скачивают данные только один раз, когда на сервере создается страница, передаются на клиент они уже внутри html и когда nuxt создается на клиентской стороне данные заново не скачиваются (позволяет 2 раза не запрашивать данные)
</script>