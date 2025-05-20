// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import CreateAdmin from "./components/CreateAdmin";
import { ProtectedRoute } from "./components/ProtectedRoute";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/create-admin" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <CreateAdmin />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/dashboard"
          element={
            
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute> 
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;