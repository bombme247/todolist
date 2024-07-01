import { ChangeEvent, useState } from "react"

type Props = { 
  oldTitle: string
  updateItem: (newTitle: string) => void
}

export const EditableSpan = (props: Props) => {

  const [editMode, setEditMode] = useState(false);
  
  const [newTitle, setNewTitle] = useState(props.oldTitle);

  const activateEditModeHandler = () => {
    setEditMode(!editMode)
    if(editMode) {
      addItemHandler()
    } 
  }

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  const addItemHandler = () => {
    props.updateItem(newTitle)
  }

  return (
    editMode  ? <input 
                  type="text"
                  onChange={changeTitleHandler} 
                  value={newTitle} 
                  onBlur={activateEditModeHandler} 
                  autoFocus/>
              : <span onDoubleClick={activateEditModeHandler}>{props.oldTitle}</span>
  )
}