<script setup>
import { RouterView } from 'vue-router';
import CabecalhoVue from './components/Cabecalho.vue';
</script>

<template>
  <CabecalhoVue/>
  <main class="container container-lista">
      <RouterView />
  </main>
</template>