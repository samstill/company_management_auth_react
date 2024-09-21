import React, { lazy, Suspense, useMemo } from 'react';
import {useAuth} from '@harshitpadha/auth'; // Ensure correct import path
import rolesConfig from '../config/roles';

// Import dashboard components statically
const AdminDashboard = lazy(() => import('./AdminDashboard'));
const EmployeeDashboard = lazy(() => import('./EmployeeDashboard'));
const CustomerDashboard = lazy(() => import('./CustomerDashboard'));

const Dashboard = () => {
  const { userRole } = useAuth();

  // Create a static map of role to component
  const dashboardComponents = {
    admin: AdminDashboard,
    employee: EmployeeDashboard,
    customer: CustomerDashboard,
  };

  // Memoize the correct component based on userRole
  const Component = useMemo(() => {
    if (userRole && dashboardComponents[userRole]) {
      return dashboardComponents[userRole];
    }
    return null; // Return null if the role is invalid or no component exists
  }, [userRole]);

  // Handle role not recognized
  if (!userRole || !rolesConfig[userRole]) {
    return <div>Role not recognized. Please contact support.</div>;
  }

  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      {Component ? <Component /> : <div>Failed to load dashboard component. Please contact support.</div>}
    </Suspense>
  );
};

export default Dashboard;
