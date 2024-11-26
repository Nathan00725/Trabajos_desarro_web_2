'use client'

import { getAVG_categoryCode } from '@/service/Api';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export default function AVG_Contador() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Promedio de productos',
        data: [],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
        ],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    getAVG_categoryCode().then(data => {
      const categoryCodes = data.map((item: any) => item.categoryCode); // Códigos de categoría
      const Promedio_de_categoryCode = data.map((item: any) => item.Promedio_de_categoryCode); // Promedio_de_categoryCode

      console.log(categoryCodes, Promedio_de_categoryCode);

      setChartData({
        labels: categoryCodes, 
        datasets: [{
          label: 'Promedio de productos',
          data: Promedio_de_categoryCode, 
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
          ],
          hoverOffset: 4,
        }],
      });
    })
    .catch((error) => { console.log('Ocurrió un error', error) });
  }, []);

  return (
    <>
      <div>
        {
          chartData.labels.length > 0 ? ( // Asegúrate de que haya etiquetas antes de renderizar
            <div>
              <h3>Promedio de productos por categoría</h3>
              <Doughnut data={chartData} />
            </div>
          ) : (
            <div>Cargando...</div>
          )
        }
      </div>
    </>
  );
}
