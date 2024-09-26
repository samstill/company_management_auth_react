import React, { useEffect, useState } from 'react';
import { fetchEmployeePerformance } from '../../../../api/admin';
import { Card, CardContent, Grid } from '@harshitpadha/themes';
import PieChartComponent from './PieChartComponent';
import styled from 'styled-components';

const Title = styled.h2`
  font-size: ${(props) => props.theme.typography.h2};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const EmployeePerformanceDashboard = ({ employeeId }) => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const performanceResponse = await fetchEmployeePerformance(employeeId);

        if (performanceResponse.data) {
          setPerformanceData(performanceResponse.data);
        }
      } catch (err) {
        setError('Failed to load employee performance data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeId]);

  if (loading) {
    return <div>Loading Employee Performance Dashboard...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const chartData = {
    labels: performanceData.map(perf => perf.month),
    values: performanceData.map(perf => perf.rating),
  };

  return (
    <div>
      <Title>Employee Performance Dashboard</Title>
      <Grid>
        <Card>
          <CardContent>
            <h3>Employee Performance Overview</h3>
            <PieChartComponent data={chartData} />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default EmployeePerformanceDashboard;
