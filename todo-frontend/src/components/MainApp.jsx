import React, { useEffect, useRef } from 'react'
import { useTasks } from '../context/TaskContext'
import Aside from './Aside'
import Herosection from './Herosection'

function MainApp() {
  const { fetchTasks, currentCategory, setCurrentCategory } = useTasks()
  const userEmail = JSON.parse(localStorage.getItem('userData'))?.email
  const asideRef = useRef(null)

  useEffect(() => {
    fetchTasks('All Tasks')
  }, [userEmail])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768) {
        const aside = asideRef.current
        const menuButton = document.querySelector('.menu-button')
        
        if (aside && !aside.contains(event.target) && !menuButton.contains(event.target)) {
          aside.classList.remove('aside-active')
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCategoryChange = (category) => {
    setCurrentCategory(category)
    fetchTasks(category)
    // Close menu on mobile after category selection
    if (window.innerWidth <= 768) {
      const aside = document.getElementById('aside')
      aside.classList.remove('aside-active')
    }
  }

  return (
    <div id='mainSection'>
      <Aside 
        ref={asideRef}
        activeCategory={currentCategory}
        setActiveCategory={setCurrentCategory}
        onCategoryChange={handleCategoryChange}
      />
      <Herosection />
    </div>
  )
}

export default MainApp