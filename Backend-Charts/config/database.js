const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('trabajo_clases','root','fabuloso25',{
    host:'localhost',
    dialect:'mysql'
})

module.exports=sequelize;