'use client'

import { getMinimoProductype } from '@/service/Api';
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function MinimoProductype() {

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
    getMinimoProductype().then(data=>{
        const  productType = data.map((item:any) => item.productType);
        const Valor_minimo_de_ProducType= data.map((item:any) =>parseFloat(item.Valor_minimo_de_ProducType));
        console.log(productType)
        setChartData({
            labels:Valor_minimo_de_ProducType,
            datasets:[{
                label: 'Suma de salario por departamento',
                data:productType,
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
                    <h3>Minimo en productos</h3>

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