const express = require('express')
const sequelize= require('./config/database')
const Empleado = require('./model/Empleado')
const Producto = require('./model/Producto')
const cors = require ('cors')


const app= express();
app.use(express.json())
var port = 5000;

app.use(cors())

//SELECT SUM(SALARY),DEPARTMENT_ID FROM EMPLEADO group by DEPARTMENT_ID;

app.get('/suma-salario-departamento', async(req,resp) =>{

    try {
        
        const result = await Empleado.findAll({
            attributes:[
                'DEPARTMENT_ID',
                [sequelize.fn('SUM', sequelize.col('SALARY')), 'Salario_Total']
            ],
            group: ["DEPARTMENT_ID"]
        });

        resp.json(result)

    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }

});


//select MAX(SALARY),DEPARTMENT_ID from empleado where DEPARTMENT_ID=50 group by DEPARTMENT_ID;

app.get('/maximo-salario-departamento/:idDeparment', async(req,resp) =>{

    const {idDeparment} = req.params;


    try {
        
        const result = await Empleado.findAll({
            attributes:[
                'DEPARTMENT_ID',
                [sequelize.fn('MAX', sequelize.col('SALARY')), 'Salario_Total']
            ],
            where: {DEPARTMENT_ID:idDeparment },
            group: ["DEPARTMENT_ID"]
        });

        resp.json(result)

    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }

});


app.get('/sumar_ProducType',async (req,resp) =>{

    try {
        const result = await Producto.findAll({
            attributes:[
                'productType',
                [sequelize.fn('SUM', sequelize.col('value')), 'Valor_de_ProducType']
            ],
            group: ["productType"]
        });

        resp.json(result)
    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }
});


app.get('/maximo_ProducType',async (req,resp) =>{

    try {
        const result = await Producto.findAll({
            attributes: [
                'productType',
                [sequelize.fn('MAX', sequelize.col('value')), 'Valor_Maximo_de_ProducType']
            ],
            group: ["productType"]
        });

        resp.json(result)
    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }
});

app.get('/minimo_ProducType',async (req,resp) =>{

    try {
        const result = await Producto.findAll({
            attributes: [
                'productType',
                [sequelize.fn('MIN', sequelize.col('value')), 'Valor_minimo_de_ProducType']
            ],
            group: ["productType"]
        });

        resp.json(result)
    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }
});

app.get('/ValoresMaxMin_ProducType',async (req,resp) =>{

    try {
        const result = await Producto.findAll({
            attributes: [
                'productType',
                [sequelize.fn('MIN', sequelize.col('value')), 'Valor minimo de ProducType'],
                [sequelize.fn('MAX', sequelize.col('value')), 'Valor Maximo de ProducType']
            ],
            group: ["productType"]
        });

        resp.json(result)
    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }
});


app.get('/count_ProducType',async (req,resp) =>{

    try {
        const result = await Producto.findAll({
            attributes: [
                'productType',
                [sequelize.fn('COUNT', sequelize.col('value')), 'Contador_de_ProducType']
                
            ],
            group: ["productType"]
        });

        resp.json(result)
    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }
});

app.get('/AVG_categoryCode',async (req,resp) =>{

    try {
        const result = await Producto.findAll({
            attributes: [
                'categoryCode',
                [sequelize.fn('AVG', sequelize.col('value')), 'Promedio_de_categoryCode ']
                
            ],
            group: ["categoryCode"]
        });

        resp.json(result)
    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }
});


app.get('/count_productos_disponibles', async (req, resp) => {
    try {
        const result = await Producto.findAll({
            attributes: [
                'status',
                [sequelize.fn('COUNT', sequelize.col('partNumber')), 'Contador_de_cantidad_disponibles_en_status']
            ],
            where: {
                status: 'ACTIVE' 
            },
            group: ['status']
        });

        resp.json(result);
    } catch (error) {
        resp.status(500).json({ error: 'Ocurrió un error: ' + error });
    }
});


app.get('/count_productos_disponibles_inactivos', async (req, resp) => { /*esta vercion no encapsula solo a los Activo*/ 
    try {
        const result = await Producto.findAll({
            attributes: [
                'status',
                [sequelize.fn('COUNT', sequelize.col('partNumber')), 'Contador_de_cantidad_disponibles_en_status']
            ],
            
            group: ['status']
        });

        resp.json(result);
    } catch (error) {
        resp.status(500).json({ error: 'Ocurrió un error: ' + error });
    }
});




app.listen(port, ()=>{
    console.log('aplicacion ejecutando en puerto:' , port)
})