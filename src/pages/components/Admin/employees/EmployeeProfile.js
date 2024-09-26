// src/pages/components/Admin/EmployeeProfile.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEmployee } from '../../../../api/admin'; // API call to fetch employee details
import styled from 'styled-components';

const ProfileContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  color: ${({ theme }) => theme.colors.text};
`;

const EmployeeProfile = () => {
//   const { employeeId } = useParams(); // Get employee ID from route params
//   const [employee, setEmployee] = useState(null);
//   const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       const response = await fetchEmployeeDetails(employeeId);
  //       setEmployee(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Failed to fetch employee profile:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfileData();
  // }, [employeeId]);

  // if (loading) {
  //   return <div>Loading profile...</div>;
  // }

  // if (!employee) {
  //   return <div>No employee data available</div>;
  // }

  return (
    <>
    apple
    </>
  );
}

export default EmployeeProfile;
