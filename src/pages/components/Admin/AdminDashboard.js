import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, lightTheme, darkTheme } from '@harshitpadha/themes'; // Import the themes and global styles
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [themeMode, setThemeMode] = useState('light'); // State to manage theme

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles /> {/* Apply global styles based on theme */}
      <DashboardContainer>
        <Sidebar 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          themeMode={themeMode} 
          toggleTheme={toggleTheme} // Pass theme toggle function
        />
        <Content>
          <Outlet />
        </Content>
      </DashboardContainer>
    </ThemeProvider>
  );
};

export default AdminDashboard;
