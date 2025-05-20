// src/components/AdminDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    signupUsername: '',
    signupPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await authService.createAdmin(newAdminData);
      alert('Admin user created successfully!');
      setNewAdminData({
        signupUsername: '',
        signupPassword: '',
        confirmPassword: ''
      });
      setIsCreatingAdmin(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create admin user');
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-purple-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-purple-700 px-4 py-2 rounded hover:bg-purple-800"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
          
          {!isCreatingAdmin ? (
            <button
              onClick={() => setIsCreatingAdmin(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Create New Admin
            </button>
          ) : (
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newAdminData.signupUsername}
                  onChange={(e) => setNewAdminData({...newAdminData, signupUsername: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={newAdminData.signupPassword}
                  onChange={(e) => setNewAdminData({...newAdminData, signupPassword: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  value={newAdminData.confirmPassword}
                  onChange={(e) => setNewAdminData({...newAdminData, confirmPassword: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                >
                  Create Admin
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreatingAdmin(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 