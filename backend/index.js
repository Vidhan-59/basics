import express from 'express'
// require('dotenv').config();
import dotenv from 'dotenv';
// import cors from 'cors'
dotenv.config();
const app= express()
// app.use(cors)


app.get('/' , (req, res)=>{
    res.send("<h1>Vidhan Here</h1>")
})
const port  = process.env.PORT;
app.listen(port , ()=>console.log('Server started'))