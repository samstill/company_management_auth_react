// src/config/roles.js
const rolesConfig = {
    admin: {
        allowedRoutes: ['/admin', '/employee', '/customer'],
        dashboardComponent: 'AdminDashboard',
    },
    employee: {
        allowedRoutes: ['/employee', '/customer'],
        dashboardComponent: 'EmployeeDashboard',
    },
    customer: {
        allowedRoutes: ['/customer'],
        dashboardComponent: 'CustomerDashboard',
    },
    // Add new roles here as needed
};

export default rolesConfig;
