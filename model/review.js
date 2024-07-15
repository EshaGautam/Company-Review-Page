const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Review = sequelize.define('review',{
    id:{
    type:Sequelize.INTEGER,
    allowedNull:false,
    primaryKey:true,
    autoIncrement:true
    },
    name:{
      type:Sequelize.STRING,
      allowedNull:false
    },

    pros:{
        type:Sequelize.TEXT,
        allowedNull:false
    },
    cons:{
        type:Sequelize.TEXT,
        allowedNull:false
    },
    rating:{
        type:Sequelize.INTEGER,
        allowedNull:false
    }
})


module.exports = Review