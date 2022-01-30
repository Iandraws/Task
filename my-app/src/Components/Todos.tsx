import React, { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Row } from './Row';
import { data } from '../todos';
import { AddTodo } from './AddTodo';
import { Todo } from '../types';

export const Todos = () => {
	const [todos, setTodos] = useState<Todo[]>(data);
	const [task, setTask] = useState('');
	const [filter, setFilter] = useState<boolean | string>(true);
	// const [text, setText] = useState("");
	const todosLength = todos.length;
	const hasTodos = todos.length > 0;
	

	const handleCheckTodo = (id: string) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					isCompleted: !todo.isCompleted,
				};
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	const handleDeleteTodo = (id: string) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
	};

	const handleAddTodo = (todo: Todo) => {
		const updatedTodos = [...todos, todo];
		setTodos(updatedTodos);
		setTask('');
	};

	const handleChange = (e: ChangeEvent) => {
		const { value } = e.target as HTMLInputElement;
		setTask(value);
	};

	const handleSubmitTodo = (e: FormEvent) => {
		e.preventDefault();

		const todo = {
			id: uuidv4(),
			task: task,
			isCompleted: false,
		};
		task && handleAddTodo(todo);
	};
	const handleFilterTodo = (e: ChangeEvent<HTMLInputElement>) => {
		let switchValue = e.target.value;

		if (switchValue === '') {
			setFilter('');
		} else {
			setFilter(switchValue === 'true');
		}
	};

	return (
		<section className='w-10/12 lg:w-1/2 max-w-2xl flex flex-col items-center'>
			<AddTodo
				handleFilterTodo={handleFilterTodo}
				handleChange={handleChange}
				handleSubmitTodo={handleSubmitTodo}
				task={task}
			/>
			<div className='h-10' />
			{todos
				.filter((todo) => {
					console.log(filter);
					console.log(todo.isCompleted);
					console.log(todo.isCompleted === filter);
					if (filter === '') {
						return true;
					}
					return todo.isCompleted === filter;
				})
				.map((todo) => (
					<Row
						key={todo.id}
						todo={todo}
						handleDeleteTodo={handleDeleteTodo}
						handleCheckTodo={handleCheckTodo}
					/>
				))}
			{!hasTodos && (
				<p className='mb-5 text-xl text-red-500 uppercase'>
					Please add a todo!
				</p>
			)}
		
		</section>
	);
};
