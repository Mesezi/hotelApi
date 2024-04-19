const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes');
require("dotenv").config()
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json());

app.use('/api', routes)

// console.log(mongoose)
mongoose.connect(process.env.MONGO_LINK).then(()=>{
    console.log('connected')
    app.listen(4000)
}).catch((err)=>console.log(err))




