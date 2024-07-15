const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete','root','isha@db@sql@70605',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize