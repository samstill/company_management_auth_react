import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaUser, FaBuilding, FaBars, FaTimes } from 'react-icons/fa';
import { MdSettings, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BsMoon, BsSun } from 'react-icons/bs';

const SidebarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  width: ${({ collapsed }) => (collapsed ? '80px' : '250px')};
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 10px;
  min-height: 100vh;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  font-size: 1.4em;
  color: ${({ theme }) => theme.colors.text};
`;

const SidebarToggle = styled.div`
  cursor: pointer;
  font-size: 1.6em;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'flex-start')};
  padding: 12px;
  margin: 5px 0;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 1em;
  transition: all 0.3s ease;
  border-radius: 12px;
  font-weight: 500;
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: white;
  }
  &.active {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
  svg {
    margin-right: ${({ collapsed }) => (collapsed ? '0' : '15px')};
    font-size: 1.3em;
    color: ${({ theme }) => theme.colors.icon};
  }
`;

const ThemeToggle = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'flex-start')};
  align-items: center;
  cursor: pointer;
  padding: 10px;
  font-size: 1.3em;
  color: ${({ theme }) => theme.colors.icon};
`;

const Sidebar = ({ collapsed, setCollapsed, themeMode, toggleTheme }) => {
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <SidebarHeader>
        {!collapsed && 'Admin Dashboard'}
        <SidebarToggle onClick={toggleSidebar}>
          {collapsed ? <FaBars /> : <FaTimes />}
        </SidebarToggle>
      </SidebarHeader>

      <SidebarLink to="/admin/users" collapsed={collapsed}>
        <AiOutlineUsergroupAdd />
        {!collapsed && 'Users'}
      </SidebarLink>

      <SidebarLink to="/admin/employees" collapsed={collapsed}>
        <FaUser />
        {!collapsed && 'Employees'}
      </SidebarLink>

      <SidebarLink to="/admin/companies" collapsed={collapsed}>
        <FaBuilding />
        {!collapsed && 'Companies'}
      </SidebarLink>

      <SidebarLink to="/admin/dashboard" collapsed={collapsed}>
        <MdOutlineAdminPanelSettings />
        {!collapsed && 'Admin Panel'}
      </SidebarLink>

      <SidebarLink to="/admin/settings" collapsed={collapsed}>
        <MdSettings />
        {!collapsed && 'Settings'}
      </SidebarLink>

      {/* Theme Toggle */}
      <ThemeToggle collapsed={collapsed} onClick={toggleTheme}>
        {themeMode === 'light' ? <BsMoon /> : <BsSun />}
        {!collapsed && (themeMode === 'light' ? 'Dark Mode' : 'Light Mode')}
      </ThemeToggle>
    </SidebarContainer>
  );
};

export default Sidebar;
