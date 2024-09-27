import React, { useEffect, useState } from 'react';
import { fetchEmployees } from '../../../../api/admin';
import { Card, CardContent, DataTable, Grid } from '@harshitpadha/themes';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import PieChartComponent from './PieChartComponent';
import LineChartComponent from './LineChartComponent';
import DefaultAvatar from '../../../../assets/default_avatar.png';

// Styled components


const ChartTitle = styled.h3`
  font-size: ${(props) => props.theme.typography.h3};
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
`;

const EmployeeCount = styled.span`
  font-size: ${(props) => props.theme.typography.h3};
  color: ${(props) => props.theme.colors.primary};
`;

const AvatarImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const EmployeeAvatar = ({ user }) => (
  <AvatarImage
    src={user?.profile_photo || DefaultAvatar} 
    alt={`${user?.first_name || 'User'} ${user?.last_name || ''}`}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = DefaultAvatar;
    }}
  />
);

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const LineChartCard = styled(Card)`
  flex: 1;
  height: 400px; // Ensure that the card height is fixed
  display: flex;
  flex-direction: column;
`;

const PieChartCard = styled(Card)`
  flex: 1;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const ChartContent = styled(CardContent)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const renderStars = (rating, theme) => {
  const maxRating = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div style={{ display: 'flex' }}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <FaStar key={`full-${i}`} color={theme.colors.primary} />
      ))}
      {halfStar && <FaStarHalfAlt color={theme.colors.primary} />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <FaRegStar key={`empty-${i}`} color={theme.colors.primary} />
      ))}
    </div>
  );
};

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        const response = await fetchEmployees();
        setEmployees(response.data);
        setFilteredEmployees(response.data);
        setEmployeeCount(response.data.length);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter((employee) => {
        return (
          (employee.user?.first_name?.toLowerCase().includes(query.toLowerCase()) ||
            employee.user?.last_name?.toLowerCase().includes(query.toLowerCase()) ||
            employee.company?.name?.toLowerCase().includes(query.toLowerCase())) ?? false
        );
      });
      setFilteredEmployees(filtered);
    }
  };

  const handleRowClick = (employee) => {
    navigate(`/employees/${employee.id}`);
  };

  const columns = [
    {
      key: 'user.profile_photo',
      label: 'Avatar',
      render: (value, employee) => <EmployeeAvatar user={employee.user} />,
    },
    {
      key: 'user.first_name',
      label: 'First Name',
    },
    {
      key: 'user.last_name',
      label: 'Last Name',
    },
    {
      key: 'company.name',
      label: 'Company',
    },
    { key: 'position', label: 'Position' },
    { key: 'date_of_joining', label: 'Date of Joining' },
    {
      key: 'performance_rating',
      label: 'Performance Rating',
      render: (value) => value ? renderStars(value, theme) : 'N/A',
    },
  ];

  return (
    <div>


      <Grid columns={4} gap="20px" padding="0">
        <PieChartCard style={{ gridColumn: 'span 1' }}>
          <ChartContent>
            <ChartHeader>
              <ChartTitle>Company Distribution</ChartTitle>
              <EmployeeCount>{employeeCount}</EmployeeCount>
            </ChartHeader>
            <PieChartComponent data={filteredEmployees} />
          </ChartContent>
        </PieChartCard>

        <LineChartCard style={{ gridColumn: 'span 3' }}>
          <ChartContent>
            <ChartHeader>
              <ChartTitle>Employee Performance Ratings</ChartTitle>
            </ChartHeader>
            <LineChartComponent data={filteredEmployees} />
          </ChartContent>
        </LineChartCard>
      </Grid>

      <div style={{ marginTop: '30px' }}>
        <h2>Employees</h2>
        <DataTable
          columns={columns}
          data={filteredEmployees}
          onSearch={handleSearch}
          loading={loading}
          onRowClick={handleRowClick}
          checkboxRow={false} 
        />
      </div>
    </div>
  );
};

export default Employees;
