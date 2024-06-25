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
  // filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: {
    data: object,
    filter: string
  }
}

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = { id: string, title: string, filter: FilterValuesType }
type TasksType = {
    [key: string]: TaskType[]
}

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
      {id: todolistId1, title: "What to learn"},
      {id: todolistId2, title: "What to buy"}
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
      [todolistId1]: {
          data: [
              {id: v1(), title: "HTML&CSS1111", isDone: true},
              {id: v1(), title: "JS1111", isDone: true}
          ],
          filter: "all"
      },
      [todolistId2]: {
          data: [
              {id: v1(), title: "HTML&CSS22222", isDone: true},
              {id: v1(), title: "JS2222", isDone: true}
          ],
          filter: "all"
      }
  });

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(list => list.id !== todolistId))
  }

  //create
  const addTask = (todolistId: string, title: string) => {
    const newTask = {id: v1(), title:  title, isDone: false}

    setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
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
