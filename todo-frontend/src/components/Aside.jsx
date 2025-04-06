import React, { useState, useEffect, forwardRef } from 'react'
import { API_URL } from '../config/api';

const Aside = forwardRef(({ activeCategory, setActiveCategory, onCategoryChange }, ref) => {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState('')
  const [isAdding, setIsAdding] = useState(false)

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

  const handleItemClick = (type) => {
    setActiveCategory(type)
    onCategoryChange(type)
  }

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return

    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category: newCategory })
      })

      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories)
        setNewCategory('')
        setIsAdding(false)
      }
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  return (
    <div id='aside' ref={ref}>
      <ul>
        <li 
          onClick={() => handleItemClick('My Day')}
          className={activeCategory === 'My Day' ? 'active' : ''}
        >
          My Day
        </li>
        <li 
          onClick={() => handleItemClick('Important')}
          className={activeCategory === 'Important' ? 'active' : ''}
        >
          Important
        </li>
        <li 
          onClick={() => handleItemClick('All Tasks')}
          className={activeCategory === 'All Tasks' ? 'active' : ''}
        >
          All Tasks
        </li>     
      </ul>
      <hr />
      <ul>
        {categories.map((category) => (
          <li 
            key={category}
            onClick={() => handleItemClick(category)}
            className={activeCategory === category ? 'active' : ''}
          >
            {category}
          </li>
        ))}
        <li key={'addNewCategory'}>
          {isAdding ? (
            <div>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
              />
              <button onClick={handleAddCategory}>Save</button>
              <button onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setIsAdding(true)}>+ Add new category</button>
          )}
        </li>
      </ul>
    </div>
  )
})

export default Aside