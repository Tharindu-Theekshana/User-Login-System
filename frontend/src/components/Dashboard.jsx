// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check if user is admin and get user info
    const adminStatus = authService.isAdmin();
    const roles = authService.getUserRoles();
    setIsAdmin(adminStatus);
    
    // You might want to fetch additional user info here
    const email = localStorage.getItem('userEmail');
    setUserEmail(email || '');
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleCreateAdmin = () => {
    navigate('/create-admin');
  };

  return (
    <div className="min-h-screen bg-purple-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-purple-800">Dashboard</h1>
            {isAdmin && (
              <span className="inline-block bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full ml-2">
                Admin
              </span>
            )}
          </div>
          <div className="flex gap-4">
            {isAdmin && (
              <button
                onClick={handleCreateAdmin}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
              >
                Create Admin
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Welcome, {userEmail}</h2>
          <p className="text-gray-600">
            {isAdmin 
              ? "You have access to administrative features."
              : "Welcome to your user dashboard!"}
          </p>
        </div>

        {isAdmin && (
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">Admin Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium text-purple-700">User Management</h4>
                <p className="text-sm text-gray-600 mt-1">Create and manage admin users</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium text-purple-700">System Overview</h4>
                <p className="text-sm text-gray-600 mt-1">View system statistics and status</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;