import React, { useState, useEffect } from 'react';
import { Sidebar } from '@harshitpadha/themes'; // Import the Sidebar component
import { FaHome, FaUser, FaBuilding, FaChartLine } from 'react-icons/fa'; // Import icons
import { MdSettings } from 'react-icons/md'; // Import Material Design settings icon
import { Outlet } from 'react-router-dom'; // To render child components
import styled from 'styled-components';
import { useTheme } from '@harshitpadha/themes'; // Import useTheme hook

// Styled components for layout
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  overflow: hidden; /* Prevent overflow */
`;

const FixedSidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 1000;
  overflow: hidden; /* Prevent sidebar from scrolling */
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: ${({ isCollapsed }) => (isCollapsed ? '80px' : '250px')}; /* Dynamic margin to prevent hiding */
  transition: margin-left 0.4s ease-in-out; /* Smooth transition for margin change */
  overflow-y: auto; /* Enable scrolling for the content area */
  height: 100vh;
`;

const AdminDashboard = () => {
  const { themeMode, toggleTheme } = useTheme(); // Access theme and toggleTheme function
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebar-collapsed');
    return savedState === 'true'; // Convert string to boolean
  });

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', isCollapsed); // Save collapsed state to localStorage
  }, [isCollapsed]);

  const links = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/users', label: 'Users' },
    { path: '/admin/employees', label: 'Employees' },
    { path: '/admin/companies', label: 'Companies' },
    { path: '/admin/settings', label: 'Settings' },
  ];

  const icons = [
    <FaHome key="home" />,
    <FaUser key="user" />,
    <FaBuilding key="building" />,
    <FaChartLine key="chart" />,
    <MdSettings key="settings" />,
  ];

  return (
    <DashboardContainer>
      {/* Sidebar component with links, icons, and theme toggle */}
      <FixedSidebar>
        <Sidebar
          links={links}
          icons={icons}
          isCollapsedProp={isCollapsed}
          setCollapsed={setIsCollapsed}
          headerTitle="Admin" // Pass custom header title
          themeMode={themeMode} // Use themeMode from useTheme
          toggleTheme={toggleTheme} // Use toggleTheme from useTheme
        />
      </FixedSidebar>
      <Content isCollapsed={isCollapsed}>
        <Outlet /> {/* This will render child routes like Users, Employees, etc. */}
      </Content>
    </DashboardContainer>
  );
};

export default AdminDashboard;
