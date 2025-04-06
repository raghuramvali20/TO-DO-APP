import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('userData');

  if (!isAuthenticated) {
    confirm('You are not logged in. Please log in to access this page.');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;