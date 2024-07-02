type Props = {
  updateTask: (todolistid: string, newTitle: string, taskId: string) => void 
}

export const Task = ({updateTask, }: Props) => {

  const updateTaskHandler = (taskId: string, newTitle: string) => {
    updateTask(todolistId, taskId, newTitle)
  }

  return (
    <li key={task.id} className={task.isDone ? 'completed-task' : 'task'}>
    <input type="checkbox" checked={task.isDone} onChange={(e) => changeTaskStatus(todolistId, task.id, e.currentTarget.checked)} />
    <EditableSpan oldTitle={task.title} updateItem={(newTitle)=>updateTaskHandler(task.id, newTitle)}/>
    <Button onClickHandler={() => removeTask(todolistId, task.id)} title="x" />
  </li>
  )
}