import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@harshitpadha/auth';
// Import global styles
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { RequireAuth } from '@harshitpadha/auth';
import { RequireNoAuth } from '@harshitpadha/auth';
import NotFound from './pages/NotFound';

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>

    </AuthProvider>
  );
}

export default App;
