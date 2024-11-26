'use client'

import { getCount_Productos_Disponibles } from '@/service/Api';
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function Productos_disponibles() {

  const [chartData, setChartData] = useState({
    labels:[],
    datasets:[
        {
            label:'',
            data:[],
            backgroundColor:[] as string[]
        }
    ]
  })

  useEffect(()=>{
    getCount_Productos_Disponibles().then(data=>{
        const  status = data.map((item:any) => item.status);
        const Contador_de_cantidad_disponibles_en_status= data.map((item:any) => item.Contador_de_cantidad_disponibles_en_status);
        console.log(status)
        setChartData({
            labels:Contador_de_cantidad_disponibles_en_status,
            datasets:[{
                label: 'Suma de salario por departamento',
                data:status,
                backgroundColor:['rgb(255, 99, 132)','rgb(254, 93, 132)' ]
            }
            ]
        })

    })
    .catch((error)=>{console.log('ocurrio un error',error)})
  },[]);

  return (
    <>

    <div>
        {
            chartData ? (
                <div>
                    <h3>Contador de productos disponibles</h3>

                    <Bar data={chartData}></Bar>
                </div>
            ) :(
                <div> loading..</div>
            )
        }
    </div>
        
    </>
  )
}