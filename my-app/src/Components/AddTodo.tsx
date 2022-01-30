import { AddTodoProps } from '../types';
import { ReactComponent as PlusIcon } from '../assets/svg/plus.svg';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Radio, RadioGroup } from '@mui/material';

export const AddTodo = ({
	handleSubmitTodo,
	task,
	handleChange,
	handleFilterTodo,
}: AddTodoProps) => (
	<form className='flex justify-between w-full' onSubmit={handleSubmitTodo}>
		<input
			type='text'
			name='task'
			value={task}
			className='flex-1 rounded shadow p-2 text-grey-dark mr-2'
			onChange={handleChange}
		/>
		<button type='submit' aria-label='Add todo'>
			<PlusIcon />
		</button>
		<RadioGroup>
			<FormControlLabel control={<Radio onChange={handleFilterTodo} value={''}/>} label='All' />
			<FormControlLabel control={<Radio onChange={handleFilterTodo} value={true} />} label='Done' />
			<FormControlLabel control={<Radio onChange={handleFilterTodo} value={false}/>} label='Undone' />
		</RadioGroup>
	</form>
);
