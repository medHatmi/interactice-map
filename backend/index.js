const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const propertyRoute = require('./routes/property')
const Cors = require('cors')

const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
       useUnifiedTopology: true,
    },
    () => {
        console.log('connected to mongoDB');
    }
)

app.use(Cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/property', propertyRoute)

app.listen(8800, () => {
    console.log('backend server is running!');
})

module.exports = app;
