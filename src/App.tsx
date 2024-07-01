import { useState } from 'react';
import './App.css';
import {  Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistType = {
  id: string 
  title: string
  filter: FilterValuesType
}

type TasksType = {
  [key: string]: TaskType[]
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])

  let [tasks, setTasks] = useState<TasksType>({
   [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true }, 
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })

const updateTask = (todolistId: string, taskId: string, title: string) => {
  setTasks( {...tasks, [todolistId]: tasks[todolistId].map( task => task.id === taskId ? {...task, title} : task)} )
}

const updateTodolist = (todolistId: string, title: string) => {
  setTodolists(todolists.map(list => list.id === todolistId ? {...list, title: title} : list ))
}

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(list => list.id !== todolistId))
  }

  //create
  const addTask = (todolistId: string, title: string) => {
    const newTask = {id: v1(), title:  title, isDone: false}
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
  }
  //delete
  const removeTask = (todolistId: string, taskId: string) => {
    setTasks( {...tasks, [todolistId]: tasks[todolistId].filter(list => list.id !== taskId)} )
  }
  //update
  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map( list => list.id === taskId ? {...list, isDone} : list) })
  } 

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    setTodolists(todolists.map(list => list.id === todolistId ? { ...list, filter: filter } : list))
    // }
  }

  const addTodolist = (title: string) => {
    const newId = v1()
    const newList:TodolistType = {id: newId, title: title, filter: 'all'}
    setTodolists([ newList, ...todolists])
    setTasks({[newId]: [], ...tasks})
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist}/>

      {todolists.map(list => {

        let filteredTasksForTodolist: Array<TaskType> = tasks[list.id]
        if (list.filter === "active") {
          filteredTasksForTodolist = tasks[list.id].filter(task => task.isDone === false)
        }
        if (list.filter === "completed") {
          filteredTasksForTodolist = tasks[list.id].filter(task => task.isDone === true)
        }

        return (
          <Todolist
            key={list.id}
            todolistId={list.id}
            title={list.title}
            tasks={filteredTasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={list.filter} 
            removeTodolist={removeTodolist}
            updateTask={updateTask}
            updateTodolist={updateTodolist}/>
        )
      })}

    </div>
  );
}

export default App;
