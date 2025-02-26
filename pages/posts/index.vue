<template>
  <h1>All posts</h1>
  <div v-if="status === 'pending'">Loading...</div>
  <ul v-else>
    <li v-for="post in data" :key="post.id">
      <NuxtLink :to="{ name: 'posts-id', params: { id: post.id } }">
        {{ post.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
type Post = {
  id: number;
  title: string;
  body: string;
}
const { public: { apiBase } } = useRuntimeConfig();

const { data, status } = await useFetch<Post[]>(`${apiBase}/posts`, { lazy: true });
console.log('data', data.value)
</script>

<style lang="scss" scoped>

</style>