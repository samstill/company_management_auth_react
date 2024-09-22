// src/components/Admin/DashboardOverview.js

import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
} from 'recharts';
import { axiosInstance } from '@harshitpadha/auth';
import styled from 'styled-components';

const OverviewContainer = styled.div`
  margin-top: 40px;
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardOverview = () => {
  const [roleData, setRoleData] = useState([]);

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const response = await axiosInstance.get('accounts/users/');
        const data = processRoleData(response.data);
        setRoleData(data);
      } catch (error) {
        console.error('Error fetching role data', error);
      }
    };
    fetchRoleData();
  }, []);

  const processRoleData = (users) => {
    const roleCounts = {};
    users.forEach(user => {
      roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
    });

    return Object.keys(roleCounts).map(role => ({
      name: role.charAt(0).toUpperCase() + role.slice(1),
      value: roleCounts[role],
    }));
  };

  return (
    <OverviewContainer>
      <h2>User Roles Distribution</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={roleData}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {roleData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </OverviewContainer>
  );
};

export default DashboardOverview;
