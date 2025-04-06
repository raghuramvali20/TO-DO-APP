import React from 'react'
import { HiMenu } from 'react-icons/hi'

function Header({ name }) {
  const toggleAside = () => {
    const aside = document.getElementById('aside');
    aside.classList.toggle('aside-active');
  }

  return (
    <div id='header'>
      <button className="menu-button" onClick={toggleAside}>
        <HiMenu size={24} />
      </button>
      <span>Welcome {name}</span>
    </div>
  )
}

export default Header
