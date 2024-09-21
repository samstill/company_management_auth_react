// src/components/Dashboard.js

import React, { lazy, Suspense } from 'react';
import { useAuth } from '@harshitpadha/auth';
import rolesConfig from '../config/roles';

const Dashboard = () => {
  const { userRole } = useAuth();

  // Handle role not recognized
  if (!userRole || !rolesConfig[userRole]) {
    return <div>Role not recognized. Please contact support.</div>;
  }

  let Component;

  // Securely map userRole to the correct component
  switch (userRole) {
    case 'admin':
      Component = lazy(() => import('./AdminDashboard'));
      break;
    case 'employee':
      Component = lazy(() => import('./EmployeeDashboard'));
      break;
    case 'customer':
      Component = lazy(() => import('./CustomerDashboard'));
      break;
    default:
      return <div>Role not recognized. Please contact support.</div>;
  }

  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <Component />
    </Suspense>
  );
};

// Ensure the Dashboard component is exported as default
export default Dashboard;
