import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from './Users';
import Employees from './Employees';
import Companies from './Companies';

const AdminRoutes = () => (
  <Routes>
    <Route path="users" element={<Users />} />
    <Route path="employees" element={<Employees />} />
    <Route path="companies" element={<Companies />} />
    {/* ... other routes */}
  </Routes>
);

export default AdminRoutes;
