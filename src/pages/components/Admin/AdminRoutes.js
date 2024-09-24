import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from './users/Users'; // Import the Users component
import Employees from './employees/Employees'; // Import the Employees component
import Companies from './companies/Companies'; // Import the Companies component
import AdminDashboard from './AdminDashboard'; // Import AdminDashboard as the layout

const AdminRoutes = () => (
  <Routes>
    {/* AdminDashboard is the layout for all admin routes */}
    <Route path='/' element={<AdminDashboard />}>
      {/* Nested routes go here */}
      <Route path="users" element={<Users />} />
      <Route path="employees" element={<Employees />} />
      <Route path="companies" element={<Companies />} />
      <Route path="dashboard" element={<div>Dashboard Overview</div>} />
      <Route path="settings" element={<div>Settings Page</div>} />

      {/* Default route */}
      <Route path='*' element={<div>Error Code: 404 - Not Found</div>} />
    </Route>
  </Routes>
);

export default AdminRoutes;
