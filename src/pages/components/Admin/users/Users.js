import React, { useEffect, useState, useRef } from 'react';
import {
  fetchUsers,
  createUser,
  deleteUsers,
  fetchUsersSearch,
} from '../../../../api/admin';
import {
  Button,
  Card,
  CardContent,
  DataTable,
  Modal,
} from '@harshitpadha/themes';
import styled from 'styled-components';
import ChartComponent from './ChartComponent';
import AddUserForm from './AddUserForm';
import DefaultAvatar from '../../../../assets/default_avatar.png'; // Adjust the path accordingly

// Styled components
const Title = styled.h2`
  font-size: ${(props) => props.theme.typography.h2};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalContent = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.modal};
  max-width: 500px;
  margin: auto;
`;

const ChartCard = styled(Card)`
  max-width: 400px;
  margin-bottom: 20px;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChartTitle = styled.h3`
  font-size: ${(props) => props.theme.typography.h3};
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
`;

const UserCount = styled.span`
  font-size: ${(props) => props.theme.typography.h3};
  color: ${(props) => props.theme.colors.primary};
`;

const ChartContainer = styled.div`
  margin-top: 10px;
`;

const AvatarImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserAvatar = ({ user }) => (
  <AvatarImage
    src={user?.profile_photo || DefaultAvatar}
    alt={`${user?.first_name || 'User'} ${user?.last_name || ''}`}
    onError={(e) => {
      e.target.onerror = null; // Prevents infinite loop if DefaultAvatar fails
      e.target.src = DefaultAvatar;
    }}
  />
);

const Users = () => {
  const [users, setUsers] = useState([]); // Users data
  const [loading, setLoading] = useState(true); // For initial data fetch
  const [tableLoading, setTableLoading] = useState(false); // For table data loading when searching
  const [error, setError] = useState(null);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]); // Selected users for deletion
  const [userCount, setUserCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(''); // Search query

  const isInitialMount = useRef(true); // To track if it's the component's first render

  // Fetch data on component mount and when searchQuery changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isInitialMount.current) {
          setLoading(true);
        } else {
          setTableLoading(true);
        }

        let userResponse;
        if (searchQuery.trim() === '') {
          userResponse = await fetchUsers();
        } else {
          userResponse = await fetchUsersSearch(searchQuery);
        }

        if (userResponse.data) {
          const validUsers = userResponse.data.filter((user) => user != null);
          setUsers(validUsers);
          setUserCount(validUsers.length);
        }
      } catch (err) {
        setError('Failed to fetch users or data');
      } finally {
        if (isInitialMount.current) {
          setLoading(false);
          isInitialMount.current = false; // Set to false after the initial mount
        } else {
          setTableLoading(false);
        }
      }
    };

    fetchData();
  }, [searchQuery]);

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
        setUsers((prevUsers) => [...prevUsers, response.data]);
        setUserCount((prevCount) => prevCount + 1); // Update user count
        setOpenAddUserModal(false);
      }
    } catch (err) {
      setError('Failed to add user');
    }
  };

  // Updated delete function to reset checkboxes
  const handleDeleteUsers = async () => {
    if (selectedUserIds.length === 0) {
      alert('No users selected');
      return;
    }

    if (window.confirm('Are you sure you want to delete the selected users?')) {
      try {
        await deleteUsers(selectedUserIds);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => !selectedUserIds.includes(user.id))
        );
        setSelectedUserIds([]); // Reset the selectedUserIds to clear checkboxes
        setUserCount((prevCount) => prevCount - selectedUserIds.length); // Update user count
      } catch (err) {
        setError('Failed to delete users');
      }
    }
  };

  const handleSelectionChange = (selectedIds) => {
    setSelectedUserIds(selectedIds); // Update selected user IDs
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

  const columns = [
    {
      key: 'profile_photo',
      label: 'Avatar',
      render: (value, user) => <UserAvatar user={user} />,
    },
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];

  return (
    <div>
      <Title>Admin Dashboard - Users Overview</Title>

      {/* Chart Card */}
      <ChartCard>
        <CardContent>
          <ChartHeader>
            <ChartTitle>Users</ChartTitle>
            <UserCount>{userCount}</UserCount>
          </ChartHeader>
          <ChartContainer>
            <ChartComponent data={users} />
          </ChartContainer>
        </CardContent>
      </ChartCard>

      {/* User List Section */}
      <div style={{ marginTop: '30px' }}>
        <h2>Users</h2>
        <ActionButtonWrapper>
          <Button onClick={handleAddNewUser}>Add New</Button>
          {selectedUserIds.length > 0 && (
            <Button onClick={handleDeleteUsers} style={{ marginLeft: 'auto' }}>
              Delete Selected
            </Button>
          )}
        </ActionButtonWrapper>
        <DataTable
          columns={columns}
          data={users}
          onSelectionChange={handleSelectionChange}
          selectedRowIds={selectedUserIds} // Ensure DataTable accepts this prop
          onSearch={handleSearch}
          loading={tableLoading}
        />
      </div>

      {/* Add User Modal */}
      {openAddUserModal && (
        <Modal open={openAddUserModal} onClose={handleAddUserModalClose}>
          <ModalContent>
            <h2>Add New User</h2>
            <AddUserForm
              onAddUser={handleAddUser}
              onCancel={handleAddUserModalClose}
            />
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Users;
