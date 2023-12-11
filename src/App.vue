<script setup>
  import ScreenTask from './components/ScreenTask.vue'
  import { STATUS, PRIORITY, LIST } from './defaultSettings'
  import { computed, ref } from 'vue'
  import { 
    deleteTask, 
    addTask, 
    changeStatusTask, 
    filterPriorityListTask 
  } from './control'

  const task = ref('');
  const listTasks = ref(LIST);
  const hideCompleted = ref(false)

  const listHighTask = computed(() => 
    filterPriorityListTask(hideCompleted.value, PRIORITY.HIGH, listTasks.value));
  const listLowTask = computed(() => 
    filterPriorityListTask(hideCompleted.value, PRIORITY.LOW, listTasks.value));

  function buttonTogleClickHandler() {
    hideCompleted.value = !hideCompleted.value
  }

  function buttonDeleteClickHandler(id) {
    listTasks.value = deleteTask(id, listTasks.value)
  }

  function checkboxClickHandler(id) {
    listTasks.value = changeStatusTask(id, listTasks.value)
  }

  function formSubmitHandler(e) {
    e.preventDefault()
    //проверка на пустотую строки
    if (!task.value.trim()) {
      return;
    }

    listTasks.value = addTask({
      id: Date.now(), 
      text: task.value, 
      priority: e.target.priority.value, 
      status: STATUS.IN_PROGRESS
    }, listTasks.value)

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
      <ScreenTask 
        title="Задачи с высоким приоритетом"
        :listTask="listHighTask"
        :delete="buttonDeleteClickHandler"
        :togleCheckbox="checkboxClickHandler"
      />
      <hr/> 
      <ScreenTask 
        title="Задачи с низким приоритетом"
        :listTask="listLowTask"
        :delete="buttonDeleteClickHandler"
        :togleCheckbox="checkboxClickHandler"
      />
      <hr/>
      <div>
        Скрыть завершенные
        <button @:click="buttonTogleClickHandler">
          {{ hideCompleted ? 'показать' : 'скрыть' }}
        </button>
      </div>
    </div>
  </div>
</template>


