import React, { useState, useEffect } from 'react';
import { Sidebar, Navbar } from '@harshitpadha/themes'; // Import Sidebar and Navbar components
import { FaHome, FaUser, FaBuilding, FaChartLine } from 'react-icons/fa'; // Import icons
import { FiLogOut, FiEdit } from 'react-icons/fi'; // Icons for logout and edit
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; // To render child components and navigate
import styled from 'styled-components';
import { useTheme } from '@harshitpadha/themes'; // Import useTheme hook
import DefaultAvatar from '../../../assets/default_avatar.png'; // Fallback avatar image
import { fetchLoggedInUser } from '../../../api/admin'; // Import the API call to get current user info

// Styled components for layout
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const FixedSidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: ${({ isCollapsed }) => (isCollapsed ? '80px' : '250px')};
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.background};
  transition: width 0.4s ease-in-out;
`;

const Content = styled.div`
  flex: 1;
  margin-left: ${({ isCollapsed }) => (isCollapsed ? '80px' : '250px')};
  transition: margin-left 0.4s ease-in-out;
  overflow-y: auto; /* Ensure content can still scroll */
  height: 100vh;
  position: relative;

  /* Hide scrollbar for WebKit-based browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    display: none; /* Hide the scrollbar */
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none; /* Hide the scrollbar */
`;

const ContentWrapper = styled.div`
  padding: 50px 20px 20px 20px; /* padding: top, right, bottom, left */
`;

const AdminDashboard = () => {
  const { themeMode, toggleTheme } = useTheme(); // Access theme and toggleTheme function
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebar-collapsed');
    return savedState === 'true'; // Convert string to boolean
  });
  const [user, setUser] = useState(null); // State to store the logged-in user data
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Get current route

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', isCollapsed); // Save collapsed state to localStorage
  }, [isCollapsed]);

  useEffect(() => {
    // Fetch the logged-in user data
    const fetchUserData = async () => {
      try {
        const response = await fetchLoggedInUser(); // Fetch the user data from API
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Implement logout logic here
    localStorage.removeItem('token');
    navigate('/login');
  };

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
  ];

  // Determine the active link based on the current path
  const activeLink = links.find((link) => location.pathname.startsWith(link.path));
  const logoText = activeLink ? activeLink.label : 'Admin';

  const dropdownOptions = [
    { label: 'Edit Profile', icon: <FiEdit />, onClick: () => navigate('/admin/profile') },
    { label: 'Logout', icon: <FiLogOut />, onClick: handleLogout },
  ];

  return (
    <DashboardContainer>
      {/* Sidebar component with links, icons, and theme toggle */}
      <FixedSidebar isCollapsed={isCollapsed}>
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
        {/* Navbar component */}
        <Navbar
          logoText={logoText}
          avatarSrc={user?.profile_photo || DefaultAvatar} // Use user profile photo or fallback
          defaultAvatar={DefaultAvatar} // Fallback avatar
          dropdownOptions={dropdownOptions} // Dropdown options (Edit Profile, Logout)
          transparent={true}
          fixed={true} // Set to true to fix navbar at top
          contentMarginLeft={isCollapsed ? '80px' : '250px'} // Pass marginLeft to align navbar correctly
          navbarWidth={`calc(100% - ${isCollapsed ? '80px' : '250px'})`} // Set navbar width to exclude sidebar
          height="50px" // Reduce the height
        />
        <ContentWrapper>
          <Outlet /> {/* This will render child routes like Users, Employees, etc. */}
        </ContentWrapper>
      </Content>
    </DashboardContainer>
  );
};

export default AdminDashboard;
