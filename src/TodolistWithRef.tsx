import { title } from "process"
import { FilterValuesType } from "./App"
import { Button } from "./Button"
import { useRef } from "react"

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (newFilterValue: FilterValuesType) => void
  addTask: (title: string) => void
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

  const taskInputRef = useRef<HTMLInputElement>(null)

  const tasksElements: Array<JSX.Element> | JSX.Element = props.tasks.length !== 0
  ? props.tasks.map(task => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} />
        <span>{task.title}</span>
        <Button onClickHandler={() => props.removeTask(task.id)} title="x"/>
      </li>
    )
  })
  : <span>Your tasks list is empty</span>

  const addTaskHandler = () => {
    if (taskInputRef.current) {
        props.addTask(taskInputRef.current.value)
      taskInputRef.current.value = ""
    }
  }

  return (
    <div className="todolist">
      <h3>{props.title}</h3>
      <div>
        <input ref={taskInputRef}/>
        <Button title="+" onClickHandler={addTaskHandler}/>
          
      </div>
      <ul>
        {tasksElements}
      </ul>
      <div>
        <Button onClickHandler={() => props.changeFilter("all")} title="All"/>
        <Button onClickHandler={() => props.changeFilter("active")} title="Active"/>
        <Button onClickHandler={() => props.changeFilter("completed")} title="Completed"/>
      </div>
    </div>
  )
}