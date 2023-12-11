import { STATUS } from "./defaultSettings";
export function deleteTask(id, arr) {
   return arr.filter(task => task.id !== id)
}

export function addTask(task, arr) {
    return [...arr, task]
}

export function changeStatusTask(id, arr) {
    return arr.map(task => {
      if (task.id ===  id) {
        task.status = !task.status;
        return task;
      }

      return task;
    })
}

export function filterPriorityListTask(condition, priority, listTask) {
    if (!condition) {
      return listTask.filter(task => task.priority === priority)
    }

    return listTask.filter(task => {
      if (task.priority === priority && task.status !== STATUS.DONE) {
        return task
      }
    })
  }