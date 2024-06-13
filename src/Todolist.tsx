import { title } from "process"
import { FilterValuesType } from "./App"
import { Button } from "./Button"
import { ChangeEvent, useRef, useState } from "react"
import { KeyboardEvent } from "react"

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (newFilterValue: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

const [taskTitle, setTaskTitle] = useState("")

  const tasksElements: Array<JSX.Element> | JSX.Element = props.tasks.length !== 0
  ? props.tasks.map(task => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} onChange={(e)=> props.changeTaskStatus(task.id, e.currentTarget.checked)}/>
        <span>{task.title}</span>
        <Button onClickHandler={() => props.removeTask(task.id)} title="x"/>
      </li>
    )
  })
  : <span>Your tasks list is empty</span>

  const addTaskHandler = () => {
    props.addTask(taskTitle)
    setTaskTitle("")
  }

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

  const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && addTaskHandler()
  }

  const isAddTaskBtnDisabled = !taskTitle || taskTitle.length > 25

  const userTaskTitleLengthWarning = taskTitle.length > 15 && <div>Title should contain less than 15 characters</div>

  return (
    <div className="todolist">
      <h3>{props.title}</h3>
      <div>
        <input value={taskTitle} 
        onChange = {changeTaskTitleHandler} 
        onKeyDown={keyDownAddTaskHandler}/>
        <Button title="+" onClickHandler={addTaskHandler} disabled={isAddTaskBtnDisabled}/>
        {userTaskTitleLengthWarning}
          
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