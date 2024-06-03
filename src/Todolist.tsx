import { FilterValuesType } from "./App"

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
  changeFilter: (newFilterValue: FilterValuesType) => void
}

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

  const tasksElements: Array<JSX.Element> | JSX.Element = props.tasks.length !== 0
  ? props.tasks.map(task => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} />
        <span>{task.title}</span>
        <button onClick={() => props.removeTask(task.id)}>x</button>
      </li>
    )
  })
  : <span>Your tasks list is empty</span>

  return (
    <div className="todolist">
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasksElements}
      </ul>
      <div>
        <button onClick={() => props.changeFilter("all")}>All</button>
        <button onClick={() => props.changeFilter("active")}>Active</button>
        <button onClick={() => props.changeFilter("completed")}>Completed</button>
      </div>
    </div>
  )
}