import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees');
        setEmployees(response.data);
        // Fake chart data for now
        setChartData([
          { label: 'January', value: 30 },
          { label: 'February', value: 40 },
          // Add more data here
        ]);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employees</h2>
      <ChartComponent data={chartData} />
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Employees;
