// =======todolist 2-week4(reducer) (на примере задания 1 спринта)=====

import './App.css';
import {Todolist} from "./Todolist";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import { RemoveTaskAC, addTaskAC, taskReducer } from './module/taskReducer';
import { changeFilterAC, filterReducer } from './module/filterReducer';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

	const [tasks, dispatchTasks] = useReducer(taskReducer, [
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
	])

	// const [filter, setFilter] = useState<FilterValuesType>('all')
	const [filter, dispatchFilter] = useReducer(filterReducer, 'all')

	const removeTask = (taskId: string) => {
		dispatchTasks(RemoveTaskAC(taskId))
		// const filteredTasks = tasks.filter((task) => {
		// 	return task.id !== taskId
		// })
		// setTasks(filteredTasks)
	}

	const addTask = (title: string)=> {
		dispatchTasks(addTaskAC(title))
		// const newTask = {
		// 	id: v1(),
		// 	title: title,
		// 	isDone: false
		// }
		// const newTasks = [newTask, ...tasks]
		// setTasks(newTasks)
	}

	const changeFilter = (filter: FilterValuesType) => {
		dispatchFilter(changeFilterAC(filter))
	}

	let tasksForTodolist = tasks
	if (filter === 'active') {
		tasksForTodolist = tasks.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(task => task.isDone)
	}

	return (
		<div className="App">
			<Todolist
				title="What to learn"
				tasks={tasksForTodolist}
				removeTask={removeTask}
				changeFilter={changeFilter}
				addTask={addTask}
			/>
		</div>
	);
}

export default App;
