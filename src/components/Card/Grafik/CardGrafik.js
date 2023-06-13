import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import "./CardGrafik.css"

export default function CardGrafik({ data, title, xLabel, yLabel }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const labels = data.map(item => item.nama);
      const datasets = [{
        label: title,
        data: data.map(item => item.value), // Menggunakan properti 'value' yang umum
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }];

      const chartData = {
        labels: labels,
        datasets: datasets,
      };

      const chartOptions = {
        indexAxis: 'y',
        scales: {
          x: {
            title: {
              display: true,
              text: xLabel,
              color: 'rgba(75, 192, 192, 1)',
              font: {
                weight: 'bold',
              },
            },
          },
          y: {
            title: {
              display: true,
              text: yLabel,
              color: 'rgba(75, 192, 192, 1)',
              font: {
                weight: 'bold',
              },
            },
          },
        },
      };

      const newChartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });

      chartInstanceRef.current = newChartInstance;
    }
  }, [data, title, xLabel, yLabel]);

  return (
    <div className="card-cover">
      <div className="card-body">
        <div className="chart-container">
          <canvas ref={chartRef} height="400"></canvas>
        </div>
      </div>
    </div>
  );
  
}
