import React from 'react'
import { useTasks } from '../context/TaskContext'
import { API_URL } from '../config/api';

function Task({ task }) {
  const { fetchTasks } = useTasks()
  const userEmail = JSON.parse(localStorage.getItem('userData'))?.email

  const handleToggle = async () => {
    try {
      await fetch(`${API_URL}/tasks/${userEmail}/${task.id}/toggle`, {
        method: 'PATCH'
      })
      // Fetch tasks with current category
      fetchTasks()
    } catch (error) {
      console.error('Error toggling task:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await fetch(`${API_URL}/tasks/${userEmail}/${task.id}`, {
        method: 'DELETE'
      })
      // Fetch tasks with current category
      fetchTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <li className={`task ${task.completed ? 'completed' : ''}`}>
      <div>
        <img 
          src={task.completed ? "./images/checked.svg" : "./images/uncheck.svg"}
          alt="toggle status"
          onClick={handleToggle}
        />
        <p className={task.completed ? 'completed' : ''}>
          {task.Task}
        </p>
        {task.important && <span className="important">⭐</span>}
      </div>
      <img 
        src="./images/delete.png" 
        alt="delete task"
        onClick={handleDelete}
      />
    </li>
  )
}

export default Task