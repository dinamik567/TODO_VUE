<script setup>
    defineProps({
        title: String,
        listTask: Array,
        delete: Function,
        togleCheckbox: Function
    })

</script>

<template>
    <div>
        <div>{{ title }}</div>
        <ul v-for="task in listTask" :key="task.id">
            <li :class="{ done: task.status}">
            <input 
                type="checkbox" 
                :checked="task.status" 
                @click="togleCheckbox(task.id)"
            />
            {{ task.text }} 
            <button @click="delete(task.id)" type="button">-</button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
  ul {
    list-style-type: none;
  }

  .done {
    text-decoration: line-through;
  }
</style>