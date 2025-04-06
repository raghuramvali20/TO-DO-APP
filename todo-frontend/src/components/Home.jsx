import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import MainApp from './MainApp';

const Home = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div>
      <button onClick={handleLogout} className='logout-button'>Logout</button>
      <Header name={userData?.name} />
     <MainApp/>
    </div>
  );
};

export default Home;