import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiEdit, FiLock, FiBell, FiUser, FiKey, FiShield } from 'react-icons/fi'; // Icons for each section
import DefaultAvatar from '../../../../assets/default_avatar.png'; // Placeholder image
import { fetchLoggedInUser } from '../../../../api/admin'; // Import the API call to get logged-in user
import { axiosInstance } from '@harshitpadha/auth'; // Import axios instance for handling file uploads

// Styled components
const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;


const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
  position: relative;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s;
`;

const EditIcon = styled(FiEdit)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  padding: 5px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const ProfileImageWrapperHover = styled(ProfileImageWrapper)`
  &:hover ${EditIcon} {
    opacity: 1;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UserDetails = styled.div`
  text-align: left;
`;

const UserName = styled.h2`
  font-size: ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const UserEmail = styled.p`
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.text};
  margin: 5px 0;
`;

const UserRole = styled.p`
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const SectionWrapper = styled.section`
  width: 100%;
  max-width: 700px;
  margin: 20px 0;
  padding: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.card};
  background-color: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: ${({ theme }) => theme.colors.cardBackgroundShade};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const SectionDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SectionIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const SectionDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);

  useEffect(() => {
    // Fetch the currently logged-in user's data
    const fetchUserData = async () => {
      try {
        const response = await fetchLoggedInUser();
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    setNewProfilePhoto(file);

    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append('profile_photo', file);

    try {
      const response = await axiosInstance.put('accounts/user/update/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(response.data); // Update the user data with the new profile photo
    } catch (error) {
      console.error('Error updating profile photo:', error.response?.data || error.message);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <SettingsWrapper>


      <ProfileSection>
        <ProfileImageWrapperHover>
          <ProfileImage src={user.profile_photo || DefaultAvatar} alt="User Avatar" />
          <EditIcon title="Edit Profile Picture" onClick={() => document.getElementById('file-input').click()} />
          <FileInput
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </ProfileImageWrapperHover>

        <UserDetails>
          <UserName>{user.first_name} {user.last_name}</UserName>
          <UserEmail>{user.email}</UserEmail>
          <UserRole>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</UserRole>
        </UserDetails>
      </ProfileSection>

      <SectionWrapper>
        <SectionDetails>
          <SectionIcon><FiUser /></SectionIcon>
          <div>
            <SectionTitle>Account Settings</SectionTitle>
            <SectionDescription>Manage your personal information and email</SectionDescription>
          </div>
        </SectionDetails>
      </SectionWrapper>

      <SectionWrapper>
        <SectionDetails>
          <SectionIcon><FiLock /></SectionIcon>
          <div>
            <SectionTitle>Password & Security</SectionTitle>
            <SectionDescription>Change your password and security settings</SectionDescription>
          </div>
        </SectionDetails>
      </SectionWrapper>

      <SectionWrapper>
        <SectionDetails>
          <SectionIcon><FiBell /></SectionIcon>
          <div>
            <SectionTitle>Notifications</SectionTitle>
            <SectionDescription>Customize your notification preferences</SectionDescription>
          </div>
        </SectionDetails>
      </SectionWrapper>

      <SectionWrapper>
        <SectionDetails>
          <SectionIcon><FiShield /></SectionIcon>
          <div>
            <SectionTitle>Privacy Settings</SectionTitle>
            <SectionDescription>Control your privacy preferences</SectionDescription>
          </div>
        </SectionDetails>
      </SectionWrapper>

      <SectionWrapper>
        <SectionDetails>
          <SectionIcon><FiKey /></SectionIcon>
          <div>
            <SectionTitle>API Keys</SectionTitle>
            <SectionDescription>Manage your API keys and access tokens</SectionDescription>
          </div>
        </SectionDetails>
      </SectionWrapper>
    </SettingsWrapper>
  );
};

export default SettingsPage;
