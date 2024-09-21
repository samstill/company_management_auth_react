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
};

export default rolesConfig;