import { useState } from 'react';
import './App.css';
import {  Todolist } from './Todolist';
import { v1 } from 'uuid';

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

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(list => list.id !== todolistId))
  }

  //create
  const addTask = (todolistId: string, title: string) => {
    const newTask = {id: v1(), title:  title, isDone: false}
    // const copyState = [...tasks]
    // copyState.push(newTask)
    // setTasks(copyState)
    // сокращенный вариант(иммутабельная работа)
    setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
  }
  //delete
  const removeTask = (todolistId: string, taskId: string) => {
    setTasks( {...tasks, [todolistId]: tasks[todolistId].filter(list => list.id !== taskId)} )
    // const newState = tasks.filter(task => task.id !== taskId)
    // setTasks(newState)
  }
  //update
  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map( list => list.id === taskId ? {...list, isDone} : list) })
  } 

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    // const currentTodo = todolists.find(list => list.id === todolistId)
    // if (currentTodo) {
    // currentTodo.filter = filter
    // setTodolists([...todolists])
    setTodolists(todolists.map(list => list.id === todolistId ? { ...list, filter: filter } : list))
    // }
  }


  return (
    <div className="App">

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
            todolistId={list.id}
            title={list.title}
            tasks={filteredTasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={list.filter} 
            removeTodolist={removeTodolist}/>
        )
      })}

    </div>
  );
}

export default App;
