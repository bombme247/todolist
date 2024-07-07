import Button from "@mui/material/Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';


type PropsType = {
	addItem: (title:string) => void
}

export const AddItemForm = ({addItem}: PropsType) => {

	const [title, setTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addItemHandler = () => {
		if (title.trim() !== '') {
			addItem(title.trim())
			setTitle('')
		} else {
			setError('Title is required')
		}
	}

	const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}

	const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addItemHandler()
		}
	}

	const buttonStyles = {
		maxWidth: '39px',
		maxHeight: '39px',
		minWidth: '39px',
		minHeight: '39px',
	}

	return (
		<div>
			<TextField
				error={!!error}
				helperText={error}
				id="outlined-basic" 
				// label={error? error : "Enter a new title"} 
				label="Enter a new title"
				variant="outlined"
				size="small"
				// className={error ? 'error' : ''}
				value={title}
				onChange={changeItemHandler}
				onKeyUp={addItemOnKeyUpHandler}/>

			<Button variant="contained" onClick={addItemHandler} style={buttonStyles}>+</Button>
			{/* {error && <div className={'error-message'}>{error}</div>} */}
		</div>
	)
}


