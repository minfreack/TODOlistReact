import React from 'react'

export const Task = ({task, handleChecked, deleteTask, index}) => {
    return (
        <div>
            <li className={`${task.completed ? 'completed' : ''}`}  data-id={index}>
				<div className="view">
				<label className="checkbox">
  					<input className="checkbox__input" type="checkbox" onChange={() => handleChecked(index, task.completed)} checked={task.completed}></input>
  					<svg className="checkbox__check" width="24" height="24">
    					<polyline points="20 6 9 17 4 12"></polyline>
  					</svg>
				</label>
					<label className="task">{task.task}</label>
					<button className="destroy" onClick={() => deleteTask(task)}></button>
		    	</div>
			</li> 
        </div>
		
    )
}
