import { ChangeEvent, useState } from "react"
import { Button } from "./Button"
import { KeyboardEvent } from "react"


type Props = {
  addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: Props) => {

  const [taskTitle, setTaskTitle] = useState("")
  const [taskInputError, setTaskInputError] = useState<string | null>(null)

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    taskInputError && setTaskInputError(null)
    setTaskTitle(e.currentTarget.value)
  }

  const addItemHandler = () => {
    if(taskTitle.trim() !== '') {
      addItem(taskTitle.trim())
      setTaskTitle("")
    } else {
      setTaskInputError('Title should not be empty!')
    }
  }
  
  const isAddTaskBtnDisabled = !taskTitle || taskTitle.length > 25

  const userTaskTitleLengthWarning = taskTitle.length > 15 && <div>Title should contain less than 15 characters</div>

  const userEmptyTaskWarning = taskInputError && <div>{taskInputError}</div>

  const keyDownAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && addItemHandler()
  }

  return (
    <div>
      <input 
        className={taskInputError ? 'taskInputError' : ''}
        value={taskTitle}
        onChange={changeTaskTitleHandler}
        onKeyUp={keyDownAddItemHandler}
        />
      <Button title="+" onClickHandler={addItemHandler} disabled={isAddTaskBtnDisabled} />
      {userTaskTitleLengthWarning}
      {userEmptyTaskWarning}
    </div>
  )
}