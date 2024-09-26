import React, { useEffect, useState } from 'react';
import { fetchEmployees } from '../../../../api/admin';
import { Card, CardContent, DataTable } from '@harshitpadha/themes';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import PieChartComponent from './PieChartComponent';
import LineChartComponent from './LineChartComponent';
import DefaultAvatar from '../../../../assets/default_avatar.png';

// Styled components
const Title = styled.h2`
  font-size: ${(props) => props.theme.typography.h2};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PieChartCard = styled(Card)`
  flex: 1;
  height: 400px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex: 1;
  }
`;

const LineChartCard = styled(Card)`
  flex: 3;
  height: 400px;
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

const AvatarImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const EmployeeAvatar = ({ user }) => (
  <AvatarImage
    src={user?.profile_photo || DefaultAvatar} // Fallback to default avatar
    alt={`${user?.first_name || 'User'} ${user?.last_name || ''}`} // Fallback to 'User' if names are not present
    onError={(e) => {
      e.target.onerror = null; // Prevents infinite loop if DefaultAvatar fails
      e.target.src = DefaultAvatar;
    }}
  />
);

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
      render: (value) => renderStars(value, theme),
    },
  ];

  return (
    <div>
      <Title>Employee Dashboard</Title>

      <ChartContainer>
        <PieChartCard>
          <CardContent>
            <ChartHeader>
              <ChartTitle>Company Distribution</ChartTitle>
              <EmployeeCount>{employeeCount}</EmployeeCount>
            </ChartHeader>
            <PieChartComponent data={filteredEmployees} />
          </CardContent>
        </PieChartCard>

        <LineChartCard>
          <CardContent>
            <ChartHeader>
              <ChartTitle>Employee Performance Ratings</ChartTitle>
            </ChartHeader>
            <LineChartComponent data={filteredEmployees} />
          </CardContent>
        </LineChartCard>
      </ChartContainer>

      <div style={{ marginTop: '30px' }}>
        <h2>Employees</h2>
        <DataTable
          columns={columns}
          data={filteredEmployees}
          onSearch={handleSearch}
          loading={loading}
          onRowClick={handleRowClick}
          checkboxRow={false} // Disable checkbox column
        />
      </div>
    </div>
  );
};

export default Employees;
