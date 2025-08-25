
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  if (!user || user.role !== 'Admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
