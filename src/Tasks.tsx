// // import {DataType} from "./App"

// type TasksPropsType = {
//   data: DataType
// }

// export const Tasks = (props: TasksPropsType) => {

//   const tasksElements: Array<JSX.Element> = props.data.tasks.map(task => {
//     return (
//       <li>
//         <span>{task.taskId}</span>
//         <input type="checkbox" checked={task.isDone} />
//         <span>{task.title}</span>
//       </li>
//     )
//   })


//   return (
//     <div className="todolist">
//       <h3>{props.data.title}</h3>
//       <ul>
//         {tasksElements}
//       </ul>
//       <ul>
//         {props.data.students.map(student => {
//           return (
//           <li>{student}</li>
//           )
//         })}
//       </ul>
//     </div>
//   )
// }