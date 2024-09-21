// src/components/AdminDashboard.js
import React from 'react';
import { useState } from 'react';
import { Navbar } from '@harshitpadha/themes';






const AdminDashboard = () => {

      const customUtilityIcons = [
       
    
       
      ];

      const customLogo = { content: 'Admin Dashboard', href: '/' };

return (
    <div>
        <Navbar
        logo={customLogo}
        utilityIcons={customUtilityIcons}

      />
    <h2>Admin Dashboard</h2>
    <p>Welcome, Customer!</p>
</div>
) 
};

export default AdminDashboard;
