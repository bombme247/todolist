import { FilterValuesType } from "./App"
import { Button } from "./Button"
import { ChangeEvent, useState } from "react"
import { KeyboardEvent } from "react"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  todolistId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, newFilterValue: FilterValuesType) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

  const [taskTitle, setTaskTitle] = useState("")
  const [taskInputError, setTaskInputError] = useState<string | null>(null)

  // const tasksElements: Array<JSX.Element> | JSX.Element = props.tasks.length !== 0
  // ? props.tasks.map(task => {
  //   return (
  //     <li key={task.id}>
  //       <input type="checkbox" checked={task.isDone} onChange={(e)=> props.changeTaskStatus(props.todolistId, task.id, e.currentTarget.checked)}/>
  //       <span className={task.isDone ? 'completed-task' : 'task'}>{task.title}</span>
  //       <Button onClickHandler={() => props.removeTask(props.todolistId, task.id)} title="x"/>
  //     </li>
  //   )
  // })
  // : <span>Your tasks list is empty</span>

  const addTaskHandler = () => {
    if (taskTitle.trim() !== '') {
      props.addTask(props.todolistId, taskTitle.trim())
      setTaskTitle("")
    } else {
      setTaskInputError('Title should not be empty!')
    }
  }

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    taskInputError && setTaskInputError(null)
    setTaskTitle(e.currentTarget.value)
  }

  const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && addTaskHandler()
  }

  const isAddTaskBtnDisabled = !taskTitle || taskTitle.length > 25

  const userTaskTitleLengthWarning = taskTitle.length > 15 && <div>Title should contain less than 15 characters</div>

  const userEmptyTaskWarning = taskInputError && <div>{taskInputError}</div>

  const changeFilterTaskHandler = (filter: FilterValuesType) => {
    props.changeFilter(props.todolistId, filter)
  }

  
  let tasksForTodolist = props.tasks
  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter(task => task.isDone === false)
  }
  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(task => task.isDone === true)
  }

  return (
    <div className="todolist">
      <h3>
        {props.title}
        <Button title="x" onClickHandler={() => { props.removeTodolist(props.todolistId) }} />
      </h3>
      <div>
        <input value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={keyDownAddTaskHandler}
          className={taskInputError ? 'taskInputError' : ''} />
        <Button title="+" onClickHandler={addTaskHandler} disabled={isAddTaskBtnDisabled} />
        {userTaskTitleLengthWarning}
        {userEmptyTaskWarning}
      </div>
      <ul>
        {
          tasksForTodolist.length !== 0
            ? tasksForTodolist.map(task => {
              return (
                <li key={task.id}>
                  <input type="checkbox" checked={task.isDone} onChange={(e) => props.changeTaskStatus(props.todolistId, task.id, e.currentTarget.checked)} />
                  <span className={task.isDone ? 'completed-task' : 'task'}>{task.title}</span>
                  <Button onClickHandler={() => props.removeTask(props.todolistId, task.id)} title="x" />
                </li>
              )
            })
            : <span>Your tasks list is empty</span>
        }
      </ul>
      <div>
        <Button onClickHandler={() => changeFilterTaskHandler("all")} title="All" styles={props.filter === 'all' ? 'active' : ''} />
        <Button onClickHandler={() => changeFilterTaskHandler("active")} title="Active" styles={props.filter === 'active' ? 'active' : ''} />
        <Button onClickHandler={() => changeFilterTaskHandler("completed")} title="Completed" styles={props.filter === 'completed' ? 'active' : ''} />
      </div>
    </div>
  )
}