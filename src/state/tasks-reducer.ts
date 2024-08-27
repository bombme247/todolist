import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import { TaskType } from '../Todolist';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) : TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state,
                [action.todolistId]: state[action.todolistId].filter (t => t.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return { ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            // let copyState = {...state}
            // delete copyState[action.id]
            // return copyState
            const {[action.id]: [], ...rest} = state
            return rest
        }
        default:
            throw new Error("I don't understand this type")
            // state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: "REMOVE-TASK", taskId, todolistId } as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: "ADD-TASK", title, todolistId } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean,todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", todolistId, taskId, isDone } as const
}
export const changeTaskTitleAC = (taskId: string, todolistId: string, title: string) => {
    return {type: "CHANGE-TASK-TITLE", taskId, todolistId, title} as const
}