const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors')
require('dotenv').config()
require('./db').connect()
const ColumnsData = require('./columnsDataModal')

const app = express();
app.use(express.json())
app.use(cors())
app.get('/', (req , res) => {
    console.log(req.url)
    res.json({name : "[sdsdsdsdd"})
})

app.get('/columns' , async (req , res) => {
   try{
    const getCollData = await ColumnsData.find({})
    res.json(getCollData)
   }catch(err){
    res.json(JSON.stringify(err))
   }
})

app.post('/columns' , async (req , res) => {
   try{
    console.log(req.body , "HHHHHHHHHHHHHHHHHHHHHH")
    const ColDataPost = await ColumnsData.create({
       ...req.body,
       bgColor : Math.floor(Math.random()*16777215).toString(16)
    })
    res.json(ColDataPost)
   }catch(err){
    res.json(JSON.stringify(err))
   }
})

app.delete('/columns:id' , async (req , res) => {
   try{
    const deleteData = await ColumnsData.deleteOne({_id : req.params.id })
    await res.json(deleteData)
   }catch(err){
    res.json(JSON.stringify(err))
   }
})


app.listen(process.env.PORT , console.log(process.env.PORT , "ddddddd"))