<template>
  <div class="loader">
    <div class="loader-circle"></div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.loader-circle {
  width: 80px;
  height: 80px;
  border: 6px solid #364153;
  border-top: 6px solid #2b7fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>