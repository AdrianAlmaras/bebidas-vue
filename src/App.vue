<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Modal from './components/Modal.vue';
</script>

<template>
  <Header/>

  <main class="container mx-auto mt-8">
     <RouterView/>
  </main>
 
  <Modal/>
</template>

<style scoped>

</style>
