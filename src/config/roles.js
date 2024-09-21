const rolesConfig = {
    admin: {
      allowedRoutes: ['/admin', '/employee', '/customer'],
      dashboardComponent: 'AdminDashboard', // Subfolder example
    },
    employee: {
      allowedRoutes: ['/employee', '/customer'],
      dashboardComponent: 'EmployeeDashboard', // Subfolder example
    },
    customer: {
      allowedRoutes: ['/customer'],
      dashboardComponent: 'CustomerDashboard', // Subfolder example
    },

  };
  
  export default rolesConfig;
  