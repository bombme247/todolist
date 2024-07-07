import { FilterValuesType, TaskType } from "./App";
import { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ButtonGroup from "@mui/material/ButtonGroup";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";


type PropsType = {
	title: string
	todolistId: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
	updateTask: (todolistId: string, taskId: string, title: string) => void
	updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
	const {
		title,
		tasks,
		filter,
		removeTask,
		changeFilter,
		addTask,
		changeTaskStatus,
		todolistId,
		removeTodolist,
		updateTask,
		updateTodolist
	} = props

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter, props.todolistId)
	}

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}

	const addTaskCallback = (title: string) => {
		addTask(title, props.todolistId)
	}

	const updateTodolistHandler = (title: string) => {
		updateTodolist(props.todolistId, title)
	}

	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3>
					<EditableSpan value={title} onChange={updateTodolistHandler} />
					<IconButton aria-label="delete" onClick={removeTodolistHandler}>
						<DeleteIcon fontSize="inherit" />
					</IconButton>
				</h3>
			</div>
			<AddItemForm addItem={addTaskCallback} />
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue, todolistId)
							}

							const changeTaskTitleHandler = (title: string) => {
								updateTask(todolistId, task.id, title)
							}

							return <ListItem
								key={task.id}
								sx={getListItemSx(task.isDone)}
							>
								<div>
									<Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
									<EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
								</div>
								
								<IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
									<DeleteIcon fontSize="small" />
								</IconButton>
							</ListItem>
						})}
					</List>
			}
			<ButtonGroup sx={filterButtonsContainerSx}>
				<Button variant={filter === 'all' ? "contained" : "outlined"} color={"info"} onClick={() => changeFilterTasksHandler('all')}>All</Button>
				<Button variant={filter === 'active' ? "contained" : "outlined"} color={"secondary"} onClick={() => changeFilterTasksHandler('active')}>Active</Button>
				<Button variant={filter === 'completed' ? "contained" : "outlined"} color={"primary"} onClick={() => changeFilterTasksHandler('completed')}>Completed</Button>
			</ButtonGroup>
		</div>
	)
}
