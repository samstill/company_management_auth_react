
// src/pages/components/Admin/Employees.js

import React, { useEffect, useState } from 'react';
import { fetchEmployees } from '../../../../api/admin';
import { Button, Card, CardContent, Grid, DataTable } from '@harshitpadha/themes';
import styled from 'styled-components';
import ChartComponent from '../ChartComponent';

// Styled components
const Title = styled.h2`
  font-size: ${(props) => props.theme.typography.h2};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
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

const EmployeeCount = styled.span`
  font-size: ${(props) => props.theme.typography.h3};
  color: ${(props) => props.theme.colors.primary};
`;

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        const response = await fetchEmployees();
        setEmployees(response.data);
        setEmployeeCount(response.data.length);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const columns = [
    { key: 'user.first_name', label: 'First Name' },
    { key: 'user.last_name', label: 'Last Name' },
    { key: 'company.name', label: 'Company' },
    { key: 'position', label: 'Position' },
    { key: 'date_of_joining', label: 'Date of Joining' },
    { key: 'performance_rating', label: 'Performance Rating' },
  ];

  return (
    <div>
      <Title>Employee Dashboard</Title>
      <ChartCard>
        <CardContent>
          <ChartHeader>
            <ChartTitle>Employees</ChartTitle>
            <EmployeeCount>{employeeCount}</EmployeeCount>
          </ChartHeader>
          <ChartComponent data={employees} />
        </CardContent>
      </ChartCard>
      <DataTable
        columns={columns}
        data={employees}
        onSelectionChange={setSelectedEmployeeIds}
        loading={loading}
      />
    </div>
  );
};

export default Employees;
