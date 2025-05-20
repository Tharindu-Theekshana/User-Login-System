import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/api';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isAdmin = authService.isAdmin();
  
  console.log('Protected Route Check:', {
    path: location.pathname,
    hasToken: !!token,
    isAdmin,
    requireAdmin,
    storedIsAdmin: localStorage.getItem('isAdmin'),
    storedRoles: localStorage.getItem('userRoles')
  });

  // If no token, redirect to login
  if (!token) {
    console.log('No token found - redirecting to login');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If admin access is required but user is not admin
  if (requireAdmin && !isAdmin) {
    console.log('Admin access required but user is not admin - redirecting to dashboard');
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  // If user is admin but trying to access non-admin routes
  if (isAdmin && location.pathname === '/dashboard') {
    console.log('Admin user accessing dashboard - redirecting to admin dashboard');
    return <Navigate to="/admin" replace />;
  }

  return children;
}; 