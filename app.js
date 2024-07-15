const express = require('express')
const path = require('path')

const sequelize = require('./util/database')
const bodyParser = require('body-parser')

const mainRoute = require('./route/mainRoute')

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')))

app.use(mainRoute)

sequelize.sync()
.then(()=>{
    app.listen(4000)
})
.catch(err=>console.log(err))
