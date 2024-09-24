// src/pages/components/Admin/Users.js

import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser, deleteUsers, fetchUsersSearch } from '../../../../api/admin';
import { Button, Card, CardContent, Grid, DataTable, Modal } from '@harshitpadha/themes';
import styled from 'styled-components';
import ChartComponent from '../ChartComponent';
import AddUserForm from './AddUserForm';

const Title = styled.h2`
  font-size: ${(props) => props.theme.typography.h2};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ModalContent = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.modal};
  max-width: 500px;
  margin: auto;
`;

const Users = () => {
  const [users, setUsers] = useState([]); // Users data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [userCount, setUserCount] = useState(0); 
  const [searchQuery, setSearchQuery] = useState(''); // Search query

  useEffect(() => {
    fetchUserData();
  }, [searchQuery]); // Re-fetch data when searchQuery changes

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userResponse = await fetchUsersSearch(searchQuery);
      if (userResponse.data) {
        setUsers(userResponse.data);
      }
    } catch (err) {
      setError('Failed to fetch users or data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewUser = () => {
    setOpenAddUserModal(true);
  };

  const handleAddUserModalClose = () => {
    setOpenAddUserModal(false);
  };

  const handleAddUser = async (newUser) => {
    try {
      const response = await createUser(newUser);
      if (response.data) {
        setUsers([...users, response.data]);
        setOpenAddUserModal(false);
      }
    } catch (err) {
      console.error('Failed to add user', err);
      setError('Failed to add user');
    }
  };

  const handleDeleteUsers = async () => {
    if (selectedUserIds.length === 0) {
      alert('No users selected');
      return;
    }
  
    console.log('User IDs to delete:', selectedUserIds); // Debugging line
  
    if (window.confirm('Are you sure you want to delete the selected users?')) {
      try {
        await deleteUsers(selectedUserIds); // Ensure selectedUserIds is an array of valid user IDs
        // Remove deleted users from the state
        setUsers(users.filter((user) => !selectedUserIds.includes(user.id)));
        setSelectedUserIds([]); // Reset selection
        setUserCount(userCount - selectedUserIds.length); // Update user count
      } catch (err) {
        console.error('Failed to delete users', err);
      }
    }
  };

  const handleSelectionChange = (selectedIds) => {
    setSelectedUserIds(selectedIds);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Define columns for DataTable
  const columns = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];

  return (
    <div>
      <Title>Admin Dashboard - Users Overview</Title>
      <Grid>
        {/* Pie Chart Section */}
        <Card>
          <CardContent>
            <h2>User Role Distribution</h2>
            <ChartComponent data={users} />
          </CardContent>
        </Card>
      </Grid>

      {/* User List Section */}
      <div style={{ marginTop: '30px' }}>
        <h2>Users</h2>
        <ActionButtonWrapper>
          <Button onClick={handleAddNewUser}>Add New</Button>
          {selectedUserIds.length > 0 && (
            <Button onClick={handleDeleteUsers}>Delete Selected</Button>
          )}
        </ActionButtonWrapper>
        <DataTable
          columns={columns}
          data={users}
          onSelectionChange={handleSelectionChange}
          onSearch={handleSearch} // Pass the handleSearch function
        />
      </div>

      {/* Add User Modal */}
      {openAddUserModal && (
        <Modal open={openAddUserModal} onClose={handleAddUserModalClose}>
          <ModalContent>
            <h2>Add New User</h2>
            <AddUserForm onAddUser={handleAddUser} onCancel={handleAddUserModalClose} />
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Users;
