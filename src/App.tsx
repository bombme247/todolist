import './App.css';
import { TaskType, Todolist } from './Todolist';

function App() {

  const todolistTitle = "What to learn"
  const tasks: Array<TaskType> = [
    {id: 1, title: "Html", isDone: true},
    {id: 2, title: "Css", isDone: true},
    {id: 3, title: "Js", isDone: false}
  ]

    return (
        <div className="App">
          <Todolist title={todolistTitle} tasks={tasks}/>
          <Todolist title={todolistTitle} tasks={tasks}/>
        </div>
    );
}

export default App;
