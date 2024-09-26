// src/pages/components/Admin/LineChartComponent.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartComponent = ({ data }) => {
  const companyPerformance = data.reduce((acc, employee) => {
    const companyName = employee.company?.name || 'Unknown';
    if (!acc[companyName]) {
      acc[companyName] = { totalRating: 0, count: 0 };
    }
    acc[companyName].totalRating += employee.performance_rating;
    acc[companyName].count += 1;
    return acc;
  }, {});

  const labels = Object.keys(companyPerformance);
  const performanceData = labels.map((company) => (
    companyPerformance[company].totalRating / companyPerformance[company].count
  ));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Average Performance Rating',
        data: performanceData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4, // Add smoothness to the line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // To make sure it fits inside the card
    scales: {
      y: {
        beginAtZero: true,
        max: 5, // Performance rating out of 5
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChartComponent;
