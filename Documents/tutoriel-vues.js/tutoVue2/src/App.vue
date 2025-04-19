<template>
  <button @click="showTimer = !showTimer">Afficher / Masquer</button>
  <Timer v-if="showTimer" />
<Layout>
  <template v-slot:header>
    En tête
  </template>
  <template v-slot:aside>
   Sidebar
  </template>
  <template v-slot:main>
    Main
  </template>
  <template v-slot:footer>
    Footer
  </template>
</Layout>
    <form @submit.prevent="addTodo" action="">
    <fieldset role="group">
      <input
        v-model="newTodo"
          type="text"
             placeholder="Tâche a effectuer"
      >
      <button :disabled="newTodo.length === 0">Ajouter</button>
    </fieldset>
  </form>
<div v-if="todos.length === 0">
  Vous n'avez pas de tâche a faire
</div>
  <div v-else>
    <ul>
      <li   v-for="todo in sortedTodo"
            :key="todo.date"
            :class="{completed:todo.completed}"
      >
        <Checkbox :label="todo.title"
                  class="class1"
                  v-model="todo.completed"
                 />
      </li>
    </ul>
    <div>
      <label for="">
        <input v-model="hiddenCompleted" type="checkbox" >
        Masquer les tâches complétée
      </label>
    </div>
    <p v-if="remainingTodo > 0">Le nombre de tâche{{remainingTodo > 1 ? 's' : ""}} a faire : {{remainingTodo}}</p>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from "vue";
import Checkbox from "@/Checkbox.vue";
import Button from "@/Button.vue";
import Layout from "@/Layout.vue";
import Timer from "@/Timer.vue";
const todos = ref([])
onMounted(() => {
  fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(v => todos.value = v.map((t) => ({...t,date:t.id})))
})
const  showTimer = ref(true)
const newTodo = ref('')
const hiddenCompleted = ref(false);
const addTodo = () => {
  todos.value.push({
    title:newTodo.value,
    completed: false,
    date:Date.now(),
  });
  newTodo.value = "";
}
const sortedTodo = computed(()=> {
  const sortedTodo = todos.value.toSorted((a,b) => a.completed > b.completed ? 1 : -1);
  if(hiddenCompleted.value === true){
    return sortedTodo.filter(t => t.completed === false)
  }
  return sortedTodo
})
const remainingTodo = computed(() => {
  return todos.value.filter(t => t.completed === false).length;
})

</script>
<style>
.completed {
  opacity: .5;
  text-decoration: line-through;

}
</style>

