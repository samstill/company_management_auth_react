import React, { useEffect } from 'react';
import { setDatasets } from './utils';

const ChartComponent = ({ data }) => {
  useEffect(() => {
    renderChart(data);
  }, [data]);

  const renderChart = (data: any) => {
    const validData = data || [];  // Ensure data is at least an empty array if undefined

    if (validData.length === 0) {
      console.warn('No data provided for chart.');
      return;
    }

    const datasets = setDatasets(validData);
    console.log('Chart datasets:', datasets);

    // Your chart rendering logic here
  };

  return (
    <div>
      {/* Render the chart */}
      <canvas id="chartCanvas"></canvas>
    </div>
  );
};

export default ChartComponent;
