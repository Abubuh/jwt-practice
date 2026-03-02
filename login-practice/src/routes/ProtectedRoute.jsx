import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" state={{ message: 'No estas loggeado' }} />;
  }
  return children
};

export default ProtectedRoute;
