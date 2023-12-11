<script setup>
  import { STATUS, PRIORITY, LIST } from './defaultSettings'
  import { computed, ref } from 'vue'
  const task = ref('');
  const listTasks = ref(LIST);
  const hideCompleted = ref(false)

  const listHighTask = computed(() => {
    if (!hideCompleted.value) {
      return listTasks.value.filter(task => task.priority === PRIORITY.HIGH)
    }

    return listTasks.value.filter(task => {
      if (task.priority === PRIORITY.HIGH && task.status !== STATUS.DONE) {
        return task
      }
    })
  });

  let listLowTask = computed(() => {
    if (!hideCompleted.value) {
      return listTasks.value.filter(task => task.priority === PRIORITY.LOW)
    }

    return listTasks.value.filter(task => {
      if (task.priority === PRIORITY.LOW && task.status !== STATUS.DONE) {
        return task
      }
    })
  });

  function deleteTask(id) {
    listTasks.value = listTasks.value.filter(task => task.id !== id)
  }

  function addTask(task) {
    listTasks.value = [...listTasks.value, task]
  }

  function changeTask(id) {
    listTasks.value = [...listTasks.value].map(task => {
      if (task.id ===  id) {
        task.status = !task.status;
        return task;
      }

      return task;
    })
  }

  function buttonTogleClickHandler() {
    hideCompleted.value = !hideCompleted.value
    console.log(listHighTask.value)
  }

  function formSubmitHandler(e) {
    e.preventDefault()
    if (!task.value.trim()) {
      return;
    }

    addTask({
      id: Date.now(), 
      text: task.value, 
      priority: e.target.priority.value, 
      status: STATUS.IN_PROGRESS
    })
    task.value = ''
  }


</script>

<template>
  <div>
    <form method="get" action="#" @submit="formSubmitHandler">
      <input type="text" v-model="task"/>
      <select name="priority">
        <option value='high'>High</option>
        <option value="low">Low</option>
      </select>
      <button type="submit">+</button>
    </form>

    <div>
      <div>Задачи с высоким приоритетом</div>
      <ul v-for="task in listHighTask" :key="task.id">
        <li :class="{ done: task.status }">
          <input 
            type="checkbox" 
            :checked="task.status" 
            @click="changeTask(task.id)"
          />
          {{ task.text }} 
          <button v-on:click="deleteTask(task.id)" type="button">-</button>
        </li>
      </ul>

      <hr/>

      <div>Задачи с низким приориетом</div>
      <ul v-for="task in listLowTask" :key="task.id">
        <li :class="{ done: task.status}">
          <input 
            type="checkbox" 
            :checked="task.status" 
            @click="changeTask(task.id)"
          />
          {{ task.text }} 
          <button @click="deleteTask(task.id)" type="button">-</button>
        </li>
      </ul>

      <hr/>
      <div>
        Скрыть завершенные
        <button v-on:click="buttonTogleClickHandler">
          {{ hideCompleted ? 'показать' : 'скрыть' }}
        </button>
      </div>
    </div>
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
