const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes');
require("dotenv").config()

const app = express()
// app.use(cors())
app.use(express.json());

app.use('/api', routes)

// console.log(mongoose)
mongoose.connect('mongodb+srv://mesezi:admin-mesezi@hotel-api.ddjdkpb.mongodb.net/?retryWrites=true&w=majority&appName=hotel-api').then(()=>{
    console.log('connected')
    app.listen(4000)
}).catch((err)=>console.log(err))




