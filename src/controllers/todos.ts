import {RequestHandler} from 'express';
import {Todo} from '../models/todo';

/* initialize our 'database' */
const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req,res,next) => {
	const text = (req.body as {text:string}).text;
	const newTodo = new Todo(Math.random().toString(), text);

	TODOS.push(newTodo);

	res.status(201).json({message:"Todo created!!!", createdTodo: newTodo});
}

export const getTodos: RequestHandler = (req, res,next)=>{
	res.json({todos: TODOS});
}

export const updateTodo: RequestHandler<{id:string}> = (req, res, next)=>{
	const id = req.params.id;
	const text = (req.body as {text:string}).text;
	const toDoIdx = TODOS.findIndex(todo=>todo.id===id);
	if(toDoIdx<0){
		throw new Error('Could not find todo with that index!!!');
	}

	TODOS[toDoIdx] = new Todo(TODOS[toDoIdx].id, text);

	res.json({message:"Todo updated!!!", updated:TODOS[toDoIdx]})
}

export const deleteTodo: RequestHandler<{id:string}> = (req, res, next)=>{
	const id = req.params.id;
	const toDoIdx = TODOS.findIndex(todo=>todo.id===id);
	if(toDoIdx<0){
		throw new Error('Could not find todo with that index!!!');
	}

	TODOS.splice(toDoIdx, 1);

	res.json({message:"Todo deleted!!!"})
}