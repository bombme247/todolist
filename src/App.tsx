import { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';


export type FilterValuesType = "all"|"active"|"completed"

function App() {

  const todolistTitle = "What to learn"

  //state
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: "Html", isDone: true},
    {id: v1(), title: "Css", isDone: true},
    {id: v1(), title: "Js", isDone: false},
  ])


//create
  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    // const copyState = [...tasks]
    // copyState.push(newTask)
    // setTasks(copyState)
    // сокращенный вариант(иммутабельная работа)
    setTasks([...tasks, newTask])

  }

  //delete
  const removeTask = (taskId: string) => {
    const newState = tasks.filter(task => task.id !== taskId)
    setTasks(newState)
    console.log(newState)
  }

  //update
  const changeTaskStatus = (taskId: string, newIsdoneValue: boolean) => {
    const newState: Array<TaskType> = tasks.map(t => t.id === taskId? {...t, isDone: newIsdoneValue} : t)
    setTasks(newState)
  }


  const [filter, setFilter] = useState<FilterValuesType>("all")
  //какие такси отдать в Туду на отрисовку? => см. filter

  let filteredTasksForTodolist: Array<TaskType> = tasks;
  if(filter === "active"){
    filteredTasksForTodolist = tasks.filter(task => task.isDone === false)
  }
  if(filter === "completed"){
    filteredTasksForTodolist = tasks.filter(task => task.isDone === true)
  }

  const changeFilter = (newFilterValue: FilterValuesType) => {
    setFilter(newFilterValue)
  }

    return (
        <div className="App">
          <Todolist title={todolistTitle}
          tasks={filteredTasksForTodolist}
          removeTask={removeTask} 
          changeFilter={changeFilter}
          addTask={addTask}
          changeTaskStatus={changeTaskStatus}/> 
        </div>
    );
}



// ------------------ additional(optional) homework--------------

// export type TasksType = {
//   taskId: number
//   title: string
//   isDone: boolean
// }
// export type DataType = {
//   title: string
//   tasks: Array<TasksType> //TaskType[]
//   students: Array<string> //string[]
// }
// function App() {

//   const data1 = {
//       title: "What to do",
//       tasks: [
//           {taskId: 1, title: "HTML&CSS2", isDone: true},
//           {taskId: 2, title: "JS2", isDone: true}
//       ],
//       students: [
//           'Jago Wormald1',
//           'Saul Milne2',
//           'Aariz Hester3',
//           'Dion Reeve4',
//           'Anisa Ortega5',
//           'Blade Cisneros6',
//           'Malaikah Phelps7',
//           'Zeeshan Gallagher8',
//           'Isobella Vo9',
//           'Rizwan Mathis10',
//           'Menaal Leach11',
//           'Kian Walton12',
//           'Orion Lamb13',
//           'Faizah Huynh14',
//           'Crystal Vaughan15',
//           'Vivien Hickman16',
//           'Stuart Lu17',
//           'Karol Davison18',
//           'Dario Burns19',
//           'Chloe Rich20',
//           'Martyna Felix',
//           'Nida Glass',
//           'Maeve Miles',
//           'Hasnain Puckett',
//           'Ayman Cano',
//           'Safwan Perry',
//           'Fox Kelly',
//           'Louise Barlow',
//           'Malaki Mcgill',
//           'Leanna Cline',
//           'Willard Hodge',
//           'Amelia Dorsey',
//           'Kiah Porter',
//           'Jeanne Daly',
//           'Mohsin Armstrong',
//           'Laurie Rangel',
//           'Princess Tierney',
//           'Kasim Kendall',
//           'Darryl Cope',
//           'Elysha Ray',
//           'Liyana Harris',
//           'Kashif Blackburn',
//           'Atif Zimmerman',
//           'Sila Hartley',
//           'Ralphie Hebert',
//       ]
//   }
//   const data2 =   {
//       title: "What to learn",
//       tasks: [
//           {taskId: 1, title: "HTML&CSS", isDone: true},
//           {taskId: 2, title: "JS", isDone: true}
//       ],
//       students: [
//           'Rick Kane',
//           'Finnlay Bentley',
//           'Samia North',
//           'Isaac Morton',
//           'Lily-Ann Clifford',
//           'Thalia Park',
//           'Sapphire Cruz',
//           'Cieran Vazquez',
//           'Anya Estes',
//           'Dominika Field',
//           'Rosanna Chung',
//           'Safiyah Davey',
//           'Ryley Beasley',
//           'Kalvin Trejo',
//           'Evie-Mae Farrell',
//           'Juliet Valencia',
//           'Astrid Austin',
//           'Lyle Montgomery',
//           'Nisha Mora',
//           'Kylie Callaghan',
//           'Star Wilks',
//           'Marissa Colley',
//           'Asa Fuller',
//           'Leigh Kemp',
//           'Avleen Dawson',
//           'Sammy Bonilla',
//           'Acacia Becker',
//           'Coral Shepherd',
//           'Melina Molina',
//           'Kiran Bailey',
//           'Clara Escobar',
//           'Alexandru Horn',
//           'Brandon-Lee Mercado',
//           'Elouise Weston',
//           'King Long',
//           'Kerri Searle',
//           'Kanye Hamer',
//           'Elwood Benitez',
//           'Mikail Whitaker',
//           'Bobby Hardy',
//           'Talha Ferry',
//           'Priscilla Landry',
//           'Olivia-Grace Cain',
//           'Kiaan Wallace',
//           'Wesley Padilla90',
//           'Ella-Grace Wooten91',
//           'Kaif Molloy92',
//           'Kamal Broadhurst93',
//           'Bianca Ferrell94',
//           'Micheal Talbot95',
//       ]
//   }

//   return (
//       <div className="App">
//         <Tasks data={data1}/>
//         <Tasks data={data2}/>
//       </div>
//   );
// }

export default App;
