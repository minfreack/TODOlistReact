import React, { useState } from 'react'
import { Task } from './Task'


export const TaskGrid = () => {


    const [tasks, setTasks] = useState(
        (JSON.parse(localStorage.getItem('tasks'))) ? JSON.parse(localStorage.getItem('tasks')) : []
    );

    const [inputTask, setInputTask] = useState('');

    const [selectedButton, setSelectedButton] = useState('all');

    const addTask = (e) => {
        const task = {
            task: inputTask,
            completed: false
        }
        e.preventDefault();
        setTasks([ ...tasks, task]);
        localStorage.setItem('tasks', JSON.stringify([ ...tasks, task ]));
        setInputTask('');
    }

    const handleOnChange = (e) => {
        setInputTask(e.target.value);
    }


    const handleChecked = (id, completed) => {
        setTasks((prevState) => {const copyArray = prevState.slice()
             copyArray[id]= {
                 ...copyArray[id],
                 completed : !completed
                }
            localStorage.setItem('tasks', JSON.stringify([ ...copyArray ]));
            return copyArray});
    }

    const getLocalStorageTasks = () => {
        setTasks(JSON.parse(localStorage.getItem('tasks')));
    }

    const allTasks = () => {
        getLocalStorageTasks();
    }

    const pendingTasks = () => {
        getLocalStorageTasks();
        setTasks( (prevState) => prevState.filter( (task) => task.completed === false))
    }

    const completeTasks = () => {
        getLocalStorageTasks();
        setTasks( (prevState) => prevState.filter( (task) => task.completed === true))
    }
    
    const deleteCompleteTasks = () => {
        getLocalStorageTasks();
        setTasks( (prevState) => { const copyArray = prevState.filter( (task) => task.completed === false)
            localStorage.setItem('tasks', JSON.stringify([ ...copyArray ]));
            return copyArray;
        })
    }

    const deleteTask = (task) => {
        getLocalStorageTasks();
        const index = tasks.indexOf(task);
        console.log(index);
        setTasks( (prevState) => {const copyArray = prevState.slice()
            copyArray.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify([ ...copyArray ]));
            return copyArray;
        })
    }

    return (
        <div>
            <section className="todoapp">
			<header className="header">
				<h1>To do list</h1>
                <form onSubmit={addTask}>
				<input className="new-todo" value={inputTask} onChange={handleOnChange} placeholder="¿Qué harás hoy?" autoFocus></input>
                </form>
			</header>
			<section className="main">
				<ul className={`${tasks.length>0 ? 'todo-list' : 'isEmpty'}`} >
                    {
                        tasks?.map( ( task , index) => <Task  key={index} index={index} task={task} handleChecked={handleChecked} deleteTask={deleteTask} />
                        )
                    }
				</ul>
			</section>
			<footer className="footer">
				<span className="todo-count"><strong>{tasks.filter( task => task.completed === false).length}</strong> pendiente(s)</span>
				<ul className="filters">
					<li>
						<a className={`filtro ${selectedButton ==='all' && 'selected' }`} id="all" href="/" onClick={() => {allTasks(); setSelectedButton('all');}}>Todos</a>
					</li>
					<li>
						<a className={`filtro ${selectedButton ==='pendings' && 'selected' }`} id="pendings" href="#pendings" onClick={ () => {pendingTasks();setSelectedButton('pendings') }} >Pendientes</a>
					</li>
					<li>
						<a className={`filtro ${selectedButton ==='completed' && 'selected' }`} id="completed" href="#completed" onClick={ () => {completeTasks(); setSelectedButton('completed')}} >Completados</a>
					</li>
				</ul>
				<button className="clear-completed" id="delete" href="#deleteCompleted" onClick={deleteCompleteTasks}>Borrar completados</button>
			</footer>
		</section>
        </div>
    )
}
