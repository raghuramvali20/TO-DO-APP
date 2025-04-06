import React, { createContext, useState, useContext } from 'react'
import { API_URL } from '../config/api'

const TaskContext = createContext()

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentCategory, setCurrentCategory] = useState('All Tasks')

  const fetchTasks = async (type = currentCategory) => {
    const userEmail = JSON.parse(localStorage.getItem('userData'))?.email
    if (!userEmail) return
    
    setLoading(true)
    try {
      let endpoint = `/tasks/${userEmail}`
      
      switch(type) {
        case 'My Day':
          endpoint += '/today'
          break
        case 'Important':
          endpoint += '/important'
          break
        case 'All Tasks':
          break
        default:
          if (type !== 'All Tasks') {
            endpoint += `/category/${type}`
          }
      }

      const response = await fetch(`${API_URL}${endpoint}`)
      const data = await response.json()
      setTasks(data.tasks)
      setError(null)
    } catch (err) {
      setError('Failed to fetch tasks')
      console.error('Error fetching tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      setTasks, 
      loading, 
      setLoading, 
      error, 
      setError,
      currentCategory,
      setCurrentCategory,
      fetchTasks
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => useContext(TaskContext)