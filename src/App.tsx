import { useState } from 'react';
import './App.css';
import {  TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

type TodolistType = {
  id: string 
  title: string
}

export type FilterValuesType = "all" | "active" | "completed";

type TasksStateType = {
  data: TaskType[]
  filter: FilterValuesType
}

type TasksType = {
    [key: string]: TasksStateType
}

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
      {id: todolistId1, title: "What to learn"},
      {id: todolistId2, title: "What to buy"}
  ])

  let [tasks, setTasks] = useState<TasksType>({
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
    const newTask = {id: v1(), title:  title, isDone: false};
    setTasks({...tasks, [todolistId]: {...tasks[todolistId],data:[newTask, ...tasks[todolistId].data]}})
  }

  //delete
  const removeTask = (todolistId: string, taskId: string) => {
    setTasks( {...tasks, [todolistId]: {...tasks[todolistId],data: tasks[todolistId].data.filter(task => task.id !== taskId)}} )
  }
  //update
  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.map(task => task.id === taskId ? {...task, isDone} : task)}})
  } 

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    setTasks({...tasks, [todolistId]: {...tasks[todolistId], filter: filter}})
  }


  return (
    <div className="App">

      {todolists.map(list => {
        let tasksForTodolist = tasks[list.id].data;
        return (
          <Todolist
            todolistId={list.id}
            title={list.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tasks[list.id].filter} 
            removeTodolist={removeTodolist}/>
        )
      })}

    </div>
  );
}

export default App;
