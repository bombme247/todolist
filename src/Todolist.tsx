import { AddItemForm } from "./AddItemForm"
import { FilterValuesType, TaskType } from "./App"
import { Button } from "./Button"
import { EditableSpan } from "./EditableSpan"

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
  updateTask: (todolistId: string, taskId: string, newTitle: string) => void
  updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
  const {
    title,
    tasks,
    filter,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    todolistId,
    removeTodolist,
    updateTask,
    updateTodolist
  } = props

  const changeFilterTaskHandler = (filter: FilterValuesType) => {
    changeFilter(props.todolistId, filter)
  }
  const removeTodolistHandler = () => {
    removeTodolist(todolistId)
  }
  const addTaskHandler = (title: string) => {
    addTask(props.todolistId, title)
  }
const updateTodolistHandler = (title: string) => {
  updateTodolist(todolistId, title)
}

const updateTaskHandler = (taskId: string, newTitle: string) => {
  updateTask(todolistId, taskId, newTitle)
}

  return (
    <div className="todolist">
      <h3>
        <EditableSpan oldTitle={title} updateItem={updateTodolistHandler}/>
        <Button title="x" onClickHandler={removeTodolistHandler} />
      </h3>
      <AddItemForm addItem={addTaskHandler} />
      {
        tasks.length !== 0
          ? <ul>
            {tasks.map(task => {

// const updateTaskHandler = (newTitle: string) => {
//   updateTask(todolistId, task.id, newTitle)
// }

              return (
                <li key={task.id} className={task.isDone ? 'completed-task' : 'task'}>
                  <input type="checkbox" checked={task.isDone} onChange={(e) => changeTaskStatus(todolistId, task.id, e.currentTarget.checked)} />
                  <EditableSpan oldTitle={task.title} updateItem={(newTitle)=>updateTaskHandler(task.id, newTitle)}/>
                  <Button onClickHandler={() => removeTask(todolistId, task.id)} title="x" />
                </li>
              )
            })}
          </ul>
          : <span>Your tasks list is empty</span>
      }
      <div>
        <Button onClickHandler={() => changeFilterTaskHandler("all")} title="All" styles={filter === 'all' ? 'active' : ''} />
        <Button onClickHandler={() => changeFilterTaskHandler("active")} title="Active" styles={filter === 'active' ? 'active' : ''} />
        <Button onClickHandler={() => changeFilterTaskHandler("completed")} title="Completed" styles={filter === 'completed' ? 'active' : ''} />
      </div>
    </div>
  )
}