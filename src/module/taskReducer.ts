import { v1 } from "uuid";
import { TaskType } from "../App";

export const taskReducer = (state: TaskType[], action: any): TaskType[] => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return state.filter(task => task.id !== action.payload.id)
    }
    case 'ADD-TASK': {
      const newTask = {
        id: v1(),
        title: action.payload.title,
        isDone: false
      }
      return [...state, newTask]
    }

    default: return state
  }
}

type TaskReducerType = RemoveTaskActionType | AddTaskActionType

type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  payload: {
    id: string
  }
}

export const RemoveTaskAC = (id: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      id
    }
  } as const
}

type AddTaskActionType = {
  type: 'ADD-TASK'
  payload: {
    title: string
  }
}

export const addTaskAC = (title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      title
    }
  } as const
}