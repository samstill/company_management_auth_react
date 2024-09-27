import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetails } from '../../../../api/admin';
import { Button } from '@harshitpadha/themes';
import styled from 'styled-components';
import DefaultAvatar from '../../../../assets/default_avatar.png'; // Adjust the path accordingly
import { FiEdit } from 'react-icons/fi'; // Edit icon

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

const UserInfoSection = styled.section`
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
  padding: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.card};
  background-color: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: ${({ theme }) => theme.colors.cardBackgroundShade};
  position: relative; // For edit icon positioning
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const EditIcon = styled(FiEdit)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

const AvatarImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
`;

const NameTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.h2};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoText = styled.p`
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.text};
  margin: 8px 0;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const UserProfile = () => {
  const { id } = useParams(); // Get user ID from URL params
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserDetails(id);
      setUser(response.data);
      setLoading(false);
    };

    getUser();
  }, [id]);

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  return (
    <ProfileWrapper>
      <AvatarImage
        src={user?.profile_photo || DefaultAvatar}
        alt={`${user.first_name} ${user.last_name}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = DefaultAvatar;
        }}
      />
      <NameTitle>{`${user.first_name} ${user.last_name}`}</NameTitle>

      <UserInfoSection>
        <SectionHeader>
          <SectionTitle>Personal Information</SectionTitle>
          <EditIcon title="Edit Personal Information" />
        </SectionHeader>
        <InfoText><strong>Name:</strong> {user.first_name} {user.last_name}</InfoText>
        <InfoText><strong>Email:</strong> {user.email}</InfoText>
      </UserInfoSection>

      <UserInfoSection>
        <SectionHeader>
          <SectionTitle>Admin Section</SectionTitle>
          <EditIcon title="Edit Admin Section" />
        </SectionHeader>
        <InfoText><strong>Role:</strong> {user.role}</InfoText>
        <InfoText><strong>Description:</strong> {user.description}</InfoText>
      </UserInfoSection>

      <ButtonSection>
        <Button color="error" textButton>Deactivate Account</Button>
        <Button errorButton color="error">Delete User</Button>
      </ButtonSection>
    </ProfileWrapper>
  );
};

export default UserProfile;
