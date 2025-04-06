import React, { useState, useEffect } from 'react'
import { useTasks } from '../context/TaskContext'
import { BsCalendar, BsStar, BsStarFill, BsPlus, BsX } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import '../styles/TaskAdding.css'
import CustomDropdown from './CustomDropdown'
import { API_URL } from '../config/api';


function TaskAdding() {
  const { setTasks, setLoading, setError } = useTasks()
  const [categories, setCategories] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [formData, setFormData] = useState({
    Task: '',
    duedate: '',
    category: '',
    important: false
  })

  const userEmail = JSON.parse(localStorage.getItem('userData'))?.email

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`)
        const data = await response.json()
        setCategories(data.categories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.Task.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/tasks/${userEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      if (response.ok) {
        setTasks(data.tasks)
        setError(null)
        setFormData({
          Task: '',
          duedate: '',
          category: '',
          important: false
        })
        setIsExpanded(false)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to create task')
      console.error('Error creating task:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Add touch event handlers for mobile
  const handleTouchStart = (e) => {
    if (!isExpanded) {
      e.preventDefault()
      setIsExpanded(true)
    }
  }

  // Prevent form submission on mobile when closing
  const handleClose = (e) => {
    e.preventDefault()
    setIsExpanded(false)
    setFormData({
      Task: '',
      duedate: '',
      category: '',
      important: false
    })
  }

  return (
    <div 
      className={`task-adding ${isExpanded ? 'expanded' : 'fab'}`}
      onTouchStart={handleTouchStart}
    >
      {!isExpanded ? (
        <button 
          className="fab-button" 
          onClick={() => setIsExpanded(true)}
          aria-label="Add new task"
        >
          <BsPlus className="fab-icon" />
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>Add New Task</h3>
            <button 
              type="button" 
              className="close-button"
              onClick={handleClose}
              aria-label="Close form"
            >
              <BsX className="close-icon" />
            </button>
          </div>
          <div className="input-container">
            <input 
              type="text"
              name="Task"
              placeholder="Add a task"
              value={formData.Task}
              onChange={handleChange}
            />
            <div className="task-options">
              <div className="option-row">
                <div className="date-option">
                  <BsCalendar className="icon" />
                  <input 
                    type="date"
                    name="duedate"
                    value={formData.duedate}
                    onChange={handleChange}
                  />
                </div>
                <div className="category-option">
                  <BiCategory className="icon" />
                  <CustomDropdown
                    options={categories}
                    value={formData.category}
                    onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    placeholder="Select category"
                  />
                </div>
                <div className="important-option">
                  {formData.important ? (
                    <BsStarFill 
                      className="icon active"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        important: !prev.important
                      }))}
                      title="Mark as not important"
                    />
                  ) : (
                    <BsStar 
                      className="icon"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        important: !prev.important
                      }))}
                      title="Mark as important"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="button-container">
            <button 
              type="submit"
              className={formData.Task.trim() ? 'active' : ''}
              disabled={!formData.Task.trim()}
            >
              Add Task
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default TaskAdding