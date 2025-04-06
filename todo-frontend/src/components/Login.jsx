import React from 'react'
import { useState } from 'react'  
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../config/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      
      if (res.status === 200) {
        // Store user data in localStorage if needed
        const userData = {
          email: data.user.email,
          name: data.user.name,
          isAuthenticated: true
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        navigate('/home'); // Remove the query parameter from URL
      
      } else if (res.status === 401) {
        alert(data.message || 'Invalid email or password');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  return (
    <div className='signUpAndLoginPages'>
      <form onSubmit={handleSubmit}
        className='slForm'>
        <label htmlFor="email">Enter your mail</label>
        <input 
          type="email" 
          id="email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <label htmlFor="password">Enter your password</label>
        <input 
          type="password" 
          id="password"
          value={formData.password}
          onChange={handleChange}
          required 
        />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  )
}

export default Login