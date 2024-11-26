import axios from 'axios'

export const getSumaSalario = async ()=>{

    const response = await axios.get('http://localhost:5000/suma-salario-departamento');
    return response.data

}

export const getCountDepartamento = async ()=>{

    const response = await axios.get('http://localhost:5000/count-deparment');
    return response.data

}



export const getSumarProductype = async ()=>{

    const response = await axios.get('http://localhost:5000/sumar_ProducType');
    return response.data

}

export const getMaximoProductype = async ()=>{

    const response = await axios.get('http://localhost:5000/maximo_ProducType');
    return response.data

}



export const getMinimoProductype = async ()=>{

    const response = await axios.get('http://localhost:5000/minimo_ProducType');
    return response.data

}



export const getCountProductype = async ()=>{

    const response = await axios.get('http://localhost:5000/count_ProducType');
    return response.data

}


export const getAVG_categoryCode = async ()=>{

    const response = await axios.get('http://localhost:5000/AVG_categoryCode');
    return response.data

}


export const getCount_Productos_Disponibles = async ()=>{

    const response = await axios.get('http://localhost:5000/count_productos_disponibles');
    return response.data

}