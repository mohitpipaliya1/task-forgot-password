
const express = require("express")
require('./db.js')
const dotenv = require('dotenv');
dotenv.config();

const app = express()
app.use(express.json());

const router = require('./router/router')
var port = 3000

app.use(router)


app.listen(port,()=>{
    console.log('server is running at ',port)
})



// name : req.body.name,
//             email : req.body.email,
//             password :req.body.password,
//             contactNumber : req.body.contactNumber,
//             address : req.body.address