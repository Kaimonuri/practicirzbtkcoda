<template>
  <div class="container">
    <h1>{{ counter }}</h1>

    <div class="buttons">
      <button @click="counter++">+1</button>

      <button @click="counter--">-1</button>

      <button @mouseover="resetCounter">
        Reset counter
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const counter = ref(0);

const resetCounter = () => {
  counter.value = 0;
};
</script>

<style>
.container {
  text-align: center;
  margin-top: 100px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 80px;
  margin-bottom: 40px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

button {
  padding: 12px 20px;
  font-size: 20px;
  cursor: pointer;
}
</style>