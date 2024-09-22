import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@harshitpadha/auth';
// Import global styles
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { RequireAuth } from '@harshitpadha/auth';
import { RequireNoAuth } from '@harshitpadha/auth';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/components/Admin/AdminDashboard';
import { RequireRole } from '@harshitpadha/auth';
import AdminRoutes from './pages/components/Admin/AdminRoutes';
import Users from './pages/components/Admin/Users';
import Employees from './pages/components/Admin/Employees';
import Companies from './pages/components/Admin/Companies';
import './chart';


function App() {
  return (
    <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <RequireNoAuth>
                  <Login />
                </RequireNoAuth>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />

            <Route
            path="/admin/*"
            element={
              <RequireAuth>
                <RequireRole role="admin">
                  <AdminDashboard />
                  
                </RequireRole>

              </RequireAuth>
            }>
    
        <Route path="users" element={<Users />} />
        <Route path="employees" element={<Employees />} />
        <Route path="companies" element={<Companies />} />
      </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>

    </AuthProvider>
  );
}

export default App;
