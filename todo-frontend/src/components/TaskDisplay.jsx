import React from 'react'
import Task from './Task'
import { useTasks } from '../context/TaskContext'

function TaskDisplay() {
  const { tasks, loading, error } = useTasks()

  if (loading) return <div style={{marginTop:'25%',fontSize:'20px'}}>Loading tasks...</div>
  if (error) return <div style={{marginTop:'25%',fontSize:'20px'}}>Error: {error}</div>
  if (!tasks?.length) return <div style={{marginTop:'25%'}}>No tasks found</div>

  return (
    <div className="task-display">
      <ul>
        {tasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </div>
  )
}

export default TaskDisplay