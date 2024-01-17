const express = require('express')
const morgan = require('morgan')
const userRoute = require('./routes/userRoute')
const app = express()

//middleware
app.use(express.static('public'));
app.use(express.json())
app.use(morgan("combined"))
app.use('/users', userRoute)

module.exports = app