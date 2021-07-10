const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

dotenv.config({path: 'config.env'});
require('./db/conn');

app.use(require('./router/auth'));
const DB = process.env.DATABASE;
const PORT = process.env.PORT;
const User = require('./models/userSchema');



const middleware = (req,res,next) => {
    console.log('hello middleware');
    next();
} 



app.get('/', (req , res) =>{
    res.send('hello world!');
    
})

app.get('/about', middleware,  (req , res) =>{
    res.send('about');
    
})

app.get('/contact', (req , res) =>{
    res.send('contact');
    
})

app.get('/whatever', (req , res) =>{
    res.send('whatever');
    
})

app.listen(PORT, ()=>{
    console.log('server is running at port no ${PORT}');
})