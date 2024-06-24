import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const ChartsTest = ({ salesData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Prepare the data
    const todaySalesData = salesData.filter((sale) => {
      const saleDate = new Date(sale.date);
      const today = new Date();
      return (
        saleDate.getFullYear() === today.getFullYear() &&
        saleDate.getMonth() === today.getMonth() &&
        saleDate.getDate() === today.getDate()
      );
    });

    const labels = todaySalesData.map((sale) => sale.time);
    const values = todaySalesData.map((sale) => sale.amount);

    // Create the chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total Sales',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [salesData]);

  return <canvas ref={chartRef} />;
};

export default ChartsTest;
