// src/components/Dashboard.js
import React, { useContext, lazy, Suspense } from 'react';
import AuthContext from '../context/AuthContext';
import rolesConfig from '../config/roles';

const Dashboard = () => {
    const { userRole } = useContext(AuthContext);

    if (userRole && rolesConfig[userRole]) {
        const Component = lazy(() => import(`./${rolesConfig[userRole].dashboardComponent}`));
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Component />
            </Suspense>
        );
    }

    return <div>Role not recognized. Please contact support.</div>;
};

export default Dashboard;
