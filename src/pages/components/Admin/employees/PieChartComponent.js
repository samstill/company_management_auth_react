// src/pages/components/Admin/PieChartComponent.js

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data }) => {
  // Calculate company distribution
  const companyCounts = data.reduce((acc, employee) => {
    const companyName = employee.company?.name || 'Unknown'; // Handle missing company data
    acc[companyName] = (acc[companyName] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(companyCounts), // Company labels
    datasets: [
      {
        label: '# of Employees',
        data: Object.values(companyCounts), // Values for each company
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChartComponent;

