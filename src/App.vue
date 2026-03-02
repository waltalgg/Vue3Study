<script setup>
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import { currentPage, routes } from '@/router.js'
</script>

<template>
  <TheHeader />

  <main class="flex flex-col flex-grow">
    <KeepAlive>
      <component :is="routes[currentPage]" />
    </KeepAlive>

  </main>

  <TheNav />
</template>

<style scoped></style>
