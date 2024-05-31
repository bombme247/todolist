
type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
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
      <li>
        <input type="checkbox" checked={task.isDone} />
        <span>{task.title}</span>
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
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}