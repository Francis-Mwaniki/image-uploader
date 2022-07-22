const express=require('express')
const path=require('path')
const apiRouter=require('./server/router/router')
const cors=require('cors')
const app=express();
//middlewares
app.use(express.json())
app.use(cors())
//connect to db
require('./server/database/database')();
//routes
app.use('/api/user',apiRouter);
app.listen(3000,(req,res)=>{
    console.log(`http://localhost:3000`);
})
