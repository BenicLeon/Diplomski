import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Home from './components/Pages/Home';
import ProtectedRoute from './components/Helpers/ProtectedRoute';
import AdminRoute from './components/Helpers/AdminRoute';
import AdminPanel from './components/Pages/AdminPanel';
import PlaneDistanceCalculator from './components/Calculators/PlaneDistanceCalculator';
import PlaneAngleCalculator from './components/Calculators/PlaneAngleCalculator';
import PlaneLineAngleCalculator from './components/Calculators/PlaneLineAngleCalculator';
import PointBelongingChecker from './components/Calculators/PointBelongingChecker';
import PlaneOriginChecker from './components/Calculators/PlaneOriginChecker';
import PlanePointDistanceCalculator from './components/Calculators/PlanePointDistanceCalculator';
import PointDistanceCalculator from './components/Calculators/PointDistanceCalculator';
import LineFromPointsCalculator from './components/Calculators/LineFromPointsCalculator';
import PlaneFromThreePointsCalculator from './components/Calculators/PlaneFromThreePointsCalculator';
import { getStoredToken, isTokenExpired } from '../src/services/authService';

const AppWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = getStoredToken();
    const unprotectedRoutes = ['/', '/login', '/register'];
    const currentPath = location.pathname;

    const isProtectedRoute = !unprotectedRoutes.includes(currentPath);

    if (isProtectedRoute && (!token || isTokenExpired(token))) {
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    }
  }, [navigate, location]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      />
      <Route
        path="/plane-distance"
        element={
          <ProtectedRoute>
            <PlaneDistanceCalculator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/plane-angle"
        element={
          <ProtectedRoute>
            <PlaneAngleCalculator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/angle-between-plane-line"
        element={
          <ProtectedRoute>
            <PlaneLineAngleCalculator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/point-checker"
        element={
          <ProtectedRoute>
            <PointBelongingChecker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/origin-checker"
        element={
          <ProtectedRoute>
            <PlaneOriginChecker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/plane-point-distance"
        element={
          <ProtectedRoute>
            <PlanePointDistanceCalculator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/point-distance"
        element={
          <ProtectedRoute>
            <PointDistanceCalculator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/line-from-points"
        element={
          <ProtectedRoute>
            <LineFromPointsCalculator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/plane-from-points"
        element={
          <ProtectedRoute>
            <PlaneFromThreePointsCalculator />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
