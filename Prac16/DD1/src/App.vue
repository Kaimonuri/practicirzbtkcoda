<template>
  <div class="container">
    <h1>Список дел</h1>

    <input
      v-model="newTask"
      @keyup.enter="addTask"
      placeholder="Введите задачу"
    />

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <template v-if="editingId === task.id">
          <input
            v-model="task.text"
            @keyup.enter="saveEdit"
          />
        </template>

        <template v-else>
          {{ task.text }}
        </template>

        <button @click="deleteTask(task.id)">
          Удалить
        </button>

        <button @click="editTask(task.id)">
          Изменить
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const newTask = ref("");

const tasks = ref([
  {
    id: 1,
    text: "Подписаться на канал",
  },
  {
    id: 2,
    text: "Поставить лайк",
  },
  {
    id: 3,
    text: "Изучить Vue.js",
  },
]);

const editingId = ref(null);

const addTask = () => {
  if (!newTask.value.trim()) return;

  tasks.value.push({
    id: Date.now(),
    text: newTask.value,
  });

  newTask.value = "";
};

const deleteTask = (id) => {
  tasks.value = tasks.value.filter(
    (task) => task.id !== id
  );
};

const editTask = (id) => {
  editingId.value = id;
};

const saveEdit = () => {
  editingId.value = null;
};
</script>

<style>
.container {
  max-width: 700px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 20px;
}

input {
  padding: 10px;
  width: 300px;
  margin-bottom: 20px;
}

li {
  margin: 15px 0;
}

button {
  margin-left: 10px;
  padding: 6px 10px;
}
</style>