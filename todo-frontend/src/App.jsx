import React, { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { TaskProvider } from './context/TaskContext'

function App() {

  return (
    <>
     <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path ={'/home'} element={<Home />}></Route>
          <Route path={'/signup'} element={<SignUp />}></Route>
          <Route path={'/login'} element={<Login />}></Route>
          <Route path={'/'} element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
     </TaskProvider>
    </>
  )
}

export default App
