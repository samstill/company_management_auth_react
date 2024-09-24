import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Employees from './Employees';
import EmployeePerformanceDashboard from './EmployeePerformanceDashboard';

const EmployeeRoutes = () => {
    return (
        <Routes>
            {/* Remove the leading "/" from the nested routes */}
            <Route index element={<Employees />} /> {/* Use index route for Employees */}
            <Route path=":employeeId/performance" element={<EmployeePerformanceDashboard />} />
        </Routes>
    );
};

export default EmployeeRoutes;
